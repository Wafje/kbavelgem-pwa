// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Jeugdbasket Scaldis Zwevegem',
      charset: 'utf-16',
    },
  },
  modules: [
    '@nuxtjs/device'
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
