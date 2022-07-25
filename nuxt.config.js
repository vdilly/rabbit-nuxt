export default {
  // Environment variables (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-env)
  env: {
    CMSUrl: process.env.CMS_URL,
    isProd: process.env.NODE_ENV == "production",
    siteName: "Rabbit"
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
    title: 'Rabbit',
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
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/scss/global.scss",
    'aos/dist/aos.css'
  ],
  // Global var SCSS
  styleResources: {
    scss: [
      '~/assets/scss/_settings.scss',
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/notify/notify.client', mode: 'client' },
    { src: '~plugins/notify/notify.server', mode: 'server' },
    { src: '~plugins/debug' },
    { src: '~plugins/global' },
    { src: '~plugins/ui-feedback/ui-feedback.js', mode: 'client' },
    { src: '~plugins/confirm-dialog/confirm-dialog', mode: 'client' },
    { src: '~plugins/v-intersect', mode: 'client' },
    { src: '@/plugins/aos.js', mode: 'client' },
  ],
  // serverMiddleware: ['~/api/index.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: process.env.CMS_URL, // Used as fallback if no runtime config is provided
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
