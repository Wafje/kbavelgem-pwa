// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Jeugdbasket Scaldis Zwevegem',
      charset: 'utf-16',
      link: [
        { rel: 'icon', sizes: '16x16 32x32', href: '/public/favicon.ico' },
        { rel: 'apple-touch-icon-precomposed', href: '/public/favicon-152.png' }
      ],
      meta: [
        { name: 'theme-color', content: '#22c55e' }
      ],
    },
  },
  pwa: {
    manifest: {
      name: 'Jeugdbasket Scaldis Zwevegem',
      description: 'App to display ranking and matches',
      background_color: '#22c55e',
      short_name: 'Scaldis',
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
