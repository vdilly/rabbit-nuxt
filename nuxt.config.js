// Utilisé pour check le flag de la commande, on contourne le fait que .env fonctionne pas ici
const args = require('minimist')(process.argv.slice(2))

export default {
  // Environment variables (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-env)
  env: {
    apiUrl: process.env.WP_API_URL,
    wpUrl: process.env.WP_URL,
    siteUrl: process.env.SITE_URL,
    isProd: process.env.NODE_ENV == "prod",
    devTools: process.env.DEV_TOOLS == 'true',
    forceSSR: args.dev, // Si true on force le reload des data à chaque f5
    siteName: process.env.SITE_NAME
  },
  vue: {
    config: {
      productionTip: true,
      devtools: true
    }
  },
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.SITE_NAME,
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: ""
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Source+Sans+Pro:wght@400;500;600;700&display=swap",
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/scss/global.scss"
  ],
  // Global var SCSS
  styleResources: {
    scss: ['~/assets/scss/_settings.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~plugins/notify/notify.client', mode: 'client' },
    // { src: '~plugins/notify/notify.server', mode: 'server' },
    { src: '~plugins/debug' },
    { src: '~plugins/global' },
    { src: '~plugins/ui-feedback/ui-feedback.js', mode: 'client' },
    // { src: '~plugins/confirm-dialog/confirm-dialog', mode: 'client' },
    { src: '~plugins/v-intersect', mode: 'client' },
  ],
  // serverMiddleware: ['~/api/index.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // .env ne marche pas ici, on check la commande
  buildModules: args.dev ? ['~modules/sitemap', '@nuxtjs/style-resources'] : ['~modules/source-wp', '~modules/sitemap', '@nuxtjs/style-resources'],


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    'vue-social-sharing/nuxt',
    '@nuxtjs/robots'
  ],
  robots: {
    UserAgent: '*',
    Disallow: '/',
    Host: process.env.SITE_URL,
    Sitemap: process.env.SITE_URL + '/sitemap.xml'
  },
  // Sitemap généré par netlify

  axios: {
    baseURL: process.env.WP_API_URL + '/wp/v2' // Used as fallback if no runtime config is provided
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'axios',
      '@nuxtjs/axios'
    ],
  }
}
