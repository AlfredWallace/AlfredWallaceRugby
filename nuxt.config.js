export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Alfred Wallace Rugby - Rugby union ranking calculator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Alfred Wallace Rugby is a tool designed to help you predict the ranking of national rugby union teams, by simulating fixtures. It is based on the official rankings and formula.'
      }
    ],
    link: [
      { rel: 'shortcut icon', href: '/awr.svg' },
      { rel: 'icon', href: '/awr.svg' },
      { rel: 'apple-touch-icon', href: '/awr.svg' },
      { rel: 'apple-touch-icon-precomposed', href: '/awr.svg' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss']
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
