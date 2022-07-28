
const { mapKeys, isPlainObject, trimEnd, trimStart } = require('lodash')
const axiosRetry = require('axios-retry');
const pMap = require('p-map')
import parseWpUrl from '@/utils/parseWpUrl';


export default class WordPressSource {
  constructor(axios, options = {}) {
    const defaultOptions = {
      perPage: 100,
      concurrent: 10,
    }
    this.options = {
      ...defaultOptions,
      ...options
    }

    if (options.perPage > 100 || options.perPage < 1) {
      throw new Error(`WP source: perPage cannot be more than 100 or less than 1.`)
    }

    this.client = axios;
    axiosRetry(this.client, {
      retries: 3,
      retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 500; // time interval between retries
      },
      retryCondition: (error) => {
        // if retry condition is not specified, by default idempotent requests are retried
        return true;
      },
    });
    this.client.defaults.timeout = 10000;
  }

  getEntries = async (path) => {
    let entries = await this.fetchPaged(path)
    entries = entries.map(page => {
      return this.formatWpEntity(page);
    })
    return entries;
  }
  fetchPaged = async (path) => {
    const { perPage, concurrent } = this.options

    return new Promise(async (resolve, reject) => {
      let res

      try {
        res = await this.fetch(path, { per_page: perPage })
      } catch (err) {
        return reject(err)
      }

      const totalItems = parseInt(res.headers['x-wp-total'], 10)
      const totalPages = parseInt(res.headers['x-wp-totalpages'], 10)

      try {
        res.data = ensureArrayData(path, res.data)
      } catch (err) {
        return reject(err)
      }

      if (!totalItems || totalPages <= 1) {
        return resolve(res.data)
      }

      const queue = []

      for (let page = 2; page <= totalPages; page++) {
        queue.push({ per_page: perPage, page })
      }

      await pMap(queue, async params => {
        try {
          const { data } = await this.fetch(path, params)
          res.data.push(...ensureArrayData(path, data))
        } catch (err) {
          console.log(err.message)
        }
      }, { concurrency: concurrent })

      resolve(res.data)
    })
  }
  fetch = async (url, params = {}, fallbackData = []) => {
    let res

    try {
      console.log('try  ' + url);
      res = await this.client.request({ url, params })
    } catch ({ response, code, config }) {
      if (!response && code) {
        console.log(response);
        throw new Error(`${code} - ${config.url}`)
      }
      if ([401, 403].includes(response.status)) {
        console.warn(`Error: Status ${response.status} - ${config.url}`)
        return { ...response, data: fallbackData }
      } else {
        console.log(response);
        throw new Error(`${response.status} - ${config.url}`)
      }
    }
    console.log('ok succeed ' + url)
    return res
  }
  formatWpEntity = (entry) => {
    if (!entry) return null;
    let page = JSON.parse(JSON.stringify(entry));

    // Unused datas
    ['_links', 'blocks', 'guid', 'link', 'comment_status', 'ping_status', 'post_status', 'status', 'to_ping', 'pinged', 'modified_gmt', 'post_modified_gmt', 'post_content_filtered', 'post_mime_type', 'comment_count', 'filter', 'post_password', 'post_date_gmt', 'date_gmt', 'modified_gmt'].forEach(el => {
      if (!el) return;
      delete page[el];
    })

    page = this.normalizeFields(page);


    return page;
  }
  normalizeFields = (entry) => {
    const res = {}

    for (const key in entry) {
      if (key.startsWith('_')) continue // skip links and embeds etc
      const newKey = key.replace('post_', '')
      res[newKey] = this.normalizeFieldValue(entry[key])
    }

    return res

  }
  normalizeFieldValue = (value) => {
    if (value === null) return null
    if (value === undefined) return null

    if (Array.isArray(value)) {
      return value.map(v => this.normalizeFieldValue(v))
    }

    if (isPlainObject(value)) {
      if (value.post_type && (value.ID || value.id)) { // Relation à une autre entry
        return this.formatWpEntity(value);
      } else if (value.filename && (value.ID || value.id)) { // Image
        let image = {
          mime_type: value.mime_type,
          type: value.type,
          alt: value.alt,
          caption: value.caption
        };
        ['mobile', 'full', 'logo', 'lazy'].forEach(size => {
          if (value.sizes[size]) {
            image[size] = {
              src: value.sizes[size],
              width: value.sizes[size + '-width'],
              height: value.sizes[size + '-height']
            }
          }
        })
        return image;
      } else if (value.hasOwnProperty('rendered')) { // Value nested under "rendered"
        return value.rendered
      } else if (value.hasOwnProperty('target') && value.hasOwnProperty('url') && value.hasOwnProperty('title') && !value.hasOwnProperty('id')) { // Liens
        value.url = parseWpUrl(value.url)
        return value;
      }

      return this.normalizeFields(value)
    }

    return value
  }
}


function ensureArrayData(url, data) {
  if (!Array.isArray(data)) {
    try {
      data = JSON.parse(data)
    } catch (err) {
      throw new Error(
        `Failed to fetch ${url}\n` +
        `Expected JSON response but received:\n` +
        `${data.trim().substring(0, 150)}...\n`
      )
    }
  }
  return data
}

