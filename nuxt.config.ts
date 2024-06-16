// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Koninklijke Basket Avelgem',
      charset: 'utf-16',
      link: [
        { rel: 'icon', sizes: '16x16', href: '/public/favicon-16x16.png' },
        { rel: 'icon', sizes: '32x32', href: '/public/favicon-32x32.png' },
        { rel: 'apple-touch-icon-precomposed', href: '/public/apple-touch-icon.png' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Anton&display=swap'},
      ],
      meta: [
        { name: 'theme-color', content: '#EBCD35' }
      ],
    },
  },
  pwa: {
    manifest: {
      name: 'Koninklijke Basket Avelgem',
      description: 'App to display ranking and matches',
      background_color: '#EBCD35',
      short_name: 'KB Avelgem',
    },
    icon: {
      maskablePadding: 0,
    },
  },
  modules: [
    '@nuxtjs/device',
    '@kevinmarrec/nuxt-pwa'

  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  experimental: {
    watcher: 'parcel',
  },
  ssr: false,
  devtools: {
    enabled: true,
  },
})
