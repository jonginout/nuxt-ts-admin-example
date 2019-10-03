export default {
  head: {
    title: 'nuxt-element-admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'nuxt-element-admin',
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [
    {
      src: '~/plugins/axios.ts',
      ssr: true
    },
    {
      src: '~/plugins/element-ui.ts',
      ssr: true
    },
    {
      src: '~/plugins/utils.ts',
      ssr: true
    }
  ],
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module'
  ],
  axios: {
    debug: false,
    timeout: 3000,
    retry: { retries: 3 }
  },
  modules: [
    '@nuxtjs/axios',
    'nuxt-material-design-icons'
  ],
  build: {
    // extend(config, ctx) {}
  }
}
