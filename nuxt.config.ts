// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Scaldis',
      charset: 'utf-16',
    },
  },
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
    enabled: false,
  },
})
