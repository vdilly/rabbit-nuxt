
const { mapKeys, isPlainObject, trimEnd, trimStart } = require('lodash')
const axiosRetry = require('axios-retry');
const pMap = require('p-map')
import parseWpUrl from '../utils/parseWpUrl';
import { formatDate } from "../utils/date";
const { htmlToText } = require('html-to-text');


export default class WordPressSource {
  constructor(axios, options = {}) {
    const defaultOptions = {
      perPage: 100,
      concurrent: 10,
      route: '/wp/v2',
      routeOptions: '/acf/v3',
      globalDatas: null,
      quietErrors: []
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
    console.log('Base url :' + this.client.defaults.baseURL)
  }

  getEntries = async (path) => {
    let entries = await this.fetchPaged(path)
    entries = entries.map(page => {
      return this.formatWpEntity(page);
    })
    return entries;
  }
  getGlobalDatas = async (path) => {
    let datas = await this.fetch({ url: '/options/option', baseURL: process.env.WP_API_URL + this.options.routeOptions })
    let globalDatas = this.formatWpEntity(datas.data);
    this.options.globalDatas = globalDatas;
    return globalDatas;
  }
  fetchPaged = async (path) => {
    const { perPage, concurrent } = this.options

    return new Promise(async (resolve, reject) => {
      let res

      try {
        res = await this.fetch({ url: path, params: { per_page: perPage } })
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
  fetch = async (config, fallbackData = []) => {
    let res

    try {
      if (!config.url) config = { url: config }
      config.useCache = true;
      res = await this.client.request(config)
    } catch ({ message, response, code, config }) {
      if (!response && code) {
        throw new Error(`${code} - ${config.url}`)
      }
      if ([401, 403].includes(response.status)) {
        console.warn(`Error: Status ${response.status} - ${config.url}`)
        return { ...response, data: fallbackData }
      } else {
        throw new Error(`${response.status} - ${config.url}`)
      }
    }
    console.log('✔️  ' + config.url)
    return res
  }
  formatWpEntity = (entry) => {
    if (!entry) return null;
    let page = JSON.parse(JSON.stringify(entry));



    // Unused datas
    ['_links', 'blocks', 'guid', 'comment_status', 'ping_status', 'post_status', 'status', 'to_ping', 'pinged', 'modified_gmt', 'post_modified_gmt', 'post_content_filtered', 'post_mime_type', 'comment_count', 'filter', 'post_password', 'post_date_gmt', 'date_gmt', 'modified_gmt'].forEach(el => {
      if (!el) return;
      delete page[el];
    })



    page = this.normalizeFields(page);

    // Format article
    if (page.type == 'post') {
      page = this.formatWpPost(page)
    }


    // SEO
    page = this.formatSeo(page)

    return page;
  }
  formatWpPost(post) {
    post.date = formatDate(post.date);

    // Exerpt
    let excerpt = post.excerpt || htmlToText(post.content, {
      wordwrap: null,
      tags: {
        a: { format: "skip" },
        img: { format: "skip" },
      },
    });
    const charLimit = 100;
    post.excerpt = excerpt.length > charLimit ? excerpt.substring(0, charLimit) + '[...]' : excerpt;
    post.link = "/blog/" + post.slug + "/";
    return post
  }
  /**
   * // Get seo title, image, url, type, description en fonction du type d'entry et build des fallbacks si absent
   * @param {*} entry 
   * @returns {title, url, description, image, type}
   */
  getSeoData(entry) {
    let options = this.options
    // Get global seo datas first
    if (!options.globalDatas) {
      console.log(entry)
      throw new Error('Global datas not init')
    }
    let global_image = options.globalDatas.acf.seo_default_image;
    let sitename = options.globalDatas.acf.seo_sitename;
    let title, url, description, image, type = 'website';

    // Dispatch en fonction du type d'entry
    // CPT
    if ('type' in entry) {
      // Titre URL
      title = entry.acf.seo_meta_title || entry.title || null;
      url = entry.link || null; // Link is already parseWp ici

      //  description : seo || excerpt || made up excerpt
      description = entry.acf.seo_meta_description || entry.excerpt || entry.content ? htmlToText(entry.content, {
        wordwrap: null,
        tags: {
          a: { format: "skip" },
          img: { format: "skip" }
        },
      }).substring(0, 600) + "..." : null;

      // Type
      type = entry.type == 'post' ? 'article' : type;

      // Image : spe page || image mis en avant si article || global seo data image
      image = entry.acf.seo_image?.mobile?.src || entry.acf?.featured_image?.mobile.src || global_image?.mobile?.src || null;

      // Taxonomy
    } else if ("taxonomy" in entry) { // Pas de diff entre category et post_tag so far, pour l'instant on assume que c'est le blog
      // Titre URL
      title = entry.name + ' - Blog' || null;
      url = entry.link || null; // Link is already parseWp ici

      //  description : description || Articles liés au tag/catégorie [Title]
      let taxonomy_type = entry.taxonomy == 'post_tag' ? 'au tag' : entry.taxonomy == 'category' ? 'à la catégorie' : null
      description = entry.description || taxonomy_type && title ? `Articles liés ${taxonomy_type} ${title}` : null;

      // Image : default blog thumbnail || global seo data image
      image = options?.globalDatas?.default_thumbnail?.mobile.src || global_image?.mobile?.src || null;
    }

    if (title) title = title;
    // Url prepend base site
    url = url.indexOf('http') == -1 ? process.env.SITE_URL + url : url;
    return { title, url, description, image, type }
  }
  /**
   * Build l'objet head final passé à Nuxt. Aucun formatage d'infos, juste de la structure
   * @param {*} param0 
   */
  buildSeoHeadObject({ title, description, url, type, image, dataStructured }) {

    // Build l'objet seo final
    let seo = {
      title: '',
      link: [],
      meta: []
    };
    seo.title = title;
    seo.link.push({ rel: "canonical", href: url })
    seo.meta.push(
      { hid: "description", name: "description", content: description },
      {
        hid: "robots",
        name: "robots",
        content:
          "follow,index,max-snippet:-1,max-video-preview:-1,max-image-preview:large",
      },

      // OG
      {
        hid: "og_type",
        name: "og:type",
        content: type,
      },
      {
        hid: "og_title",
        name: "og:title",
        content: title,
      },
      {
        hid: "og_description",
        name: "og:description",
        content: description,
      },
      {
        hid: "og_url",
        name: "og:url",
        content: url,
      },
      {
        hid: "og_image",
        name: "og:image",
        content: image,
      },

      // Twitter
      {
        hid: "twitter_title",
        name: "twitter:title",
        content: title,
      },
      {
        hid: "twitter_description",
        name: "twitter:description",
        content: description,
      },
      {
        hid: "twitter_image",
        name: "twitter:image",
        content: image,
      },
    )
    return seo
  }
  /**
   * Formatage auto d'un objet seo valide pour le head de nuxt à partir d'une entry WP (CPT ou taxonomy)
   * @param {*} entry 
   * @returns entry
   */
  formatSeo(entry) {
    if (entry.acf && 'seo_sitename' in entry.acf) return entry // Global datas
    if (entry.acf && entry.acf.nom_a_afficher && entry.acf.avatar) return entry // User
    let options = this.options

    let { title, url, image, description, type } = this.getSeoData(entry);

    // Safety belt
    function seoError(type) {
      options.quietErrors.push(`${entry.title || entry.name} (${entry.id}) : ${type} not found`)
    }
    if (!title) seoError('title')
    if (!url) seoError('url')
    if (!description) seoError('description')
    if (!image) seoError('image')

    let seo = this.buildSeoHeadObject({ title, url, image, description, type })

    // Assigne l'objet SEO à l'entry
    entry.seo = seo;
    // Remove les anciennes keys seo si c'est un CPT (les tax n'ont pas de SEO)
    let seoKeys = entry.acf ? Object.keys(entry.acf).filter(key => key.startsWith("seo_")) : null;
    if (seoKeys && seoKeys.length > 0) {
      seoKeys.forEach(key => {
        delete entry.acf[key];
      });
    }
    return entry;


    // Si y'a pas de key malgré les précédentes validation c'est chelou
    // if (!seoKeys || seoKeys.length == 0) {
    //   seoError('seo_[keys]')
    //   return entry;
    // }
  }
  normalizeFields = (entry) => {
    const res = {}

    for (const key in entry) {
      if (key.startsWith('_')) continue // skip links and embeds etc
      const newKey = key.replace('post_', '')

      // Exception
      if (newKey == 'link') {
        res[newKey] = parseWpUrl(entry[key])
        // Cas général
      } else {
        res[newKey] = this.normalizeFieldValue(entry[key])

      }
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
  logQuietErrors() {
    if (this.options.quietErrors.length) {
      console.log("%c❌ SEO Errors:", "font-size: large; color: red; font-weight: bold; ");
      console.table(this.options.quietErrors);
    } else {
      console.log("%c✔️ SEO Clear", "font-size: large; color: green; font-weight: bold; ");
    }
  }
}


function ensureArrayData(url, data) {
  if (!Array.isArray(data)) {
    try {
      data = JSON.parse(JSON.stringify(data))
    } catch (err) {
      console.log(err);
      console.log(data);
      throw new Error(
        `Failed to fetch ${url}\n` +
        `Expected JSON response but received:\n` +
        `${data.trim().substring(0, 150)}...\n`
      )
    }
  }
  return data
}

