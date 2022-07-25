
const { mapKeys, isPlainObject, trimEnd, trimStart } = require('lodash')
const axiosRetry = require('axios-retry');
const pMap = require('p-map')

export const normalizeFieldValue = (value) => {
  if (value === null) return null
  if (value === undefined) return null

  if (Array.isArray(value)) {
    return value.map(v => normalizeFieldValue(v))
  }

  if (isPlainObject(value)) {
    if (value.post_type && (value.ID || value.id)) { // Relation à une autre entry


      // return this.store.createReference(typeName, id)
      return formatWpEntity(value);
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
    }

    return normalizeFields(value)
  }

  return value
}

export const normalizeFields = (entry) => {
  const res = {}

  for (const key in entry) {
    if (key.startsWith('_')) continue // skip links and embeds etc
    const newKey = key.replace('post_', '')
    res[newKey] = normalizeFieldValue(entry[key])
  }

  return res

}
export const formatWpEntity = (entry) => {
  if (!entry) return null;
  let page = JSON.parse(JSON.stringify(entry));

  // Unused datas
  ['_links', 'blocks', 'guid', 'link', 'comment_status', 'ping_status', 'post_status', 'status', 'to_ping', 'pinged', 'modified_gmt', 'post_modified_gmt', 'post_content_filtered', 'post_mime_type', 'comment_count', 'filter', 'post_password', 'post_date_gmt', 'date_gmt', 'modified_gmt'].forEach(el => {
    if (!el) return;
    delete page[el];
  })

  page = normalizeFields(page);


  return page;
}

export const getEntries = async (axios, path) => {

  let pages = await fetchPaged(axios, path)
  pages = pages.map(page => {
    return formatWpEntity(page);
  })
  return pages;
}

export const fetch = async (axios, url, params = {}, fallbackData = []) => {
  let res

  try {
    console.log('try  ' + url);
    res = await axios.request({ url, params })
    // res = await axios.get('https://vdillyprod.tech/osezlavideo/admin/wp-json/' + url)
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

export const fetchPaged = async (axios, path) => {
  const { perPage, concurrent } = { perPage: 100, concurrent: 10 }

  axiosRetry(axios, {
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
  axios.defaults.timeout = 10000;

  return new Promise(async (resolve, reject) => {
    let res

    try {
      res = await fetch(axios, path, { per_page: perPage })
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
        const { data } = await fetch(axios, path, params)
        res.data.push(...ensureArrayData(path, data))
      } catch (err) {
        console.log(err.message)
      }
    }, { concurrency: concurrent })

    resolve(res.data)
  })

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