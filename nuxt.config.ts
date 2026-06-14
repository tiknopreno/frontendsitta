// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig:{
    baseUrl : process.env['BASE_URL'],
    backendApi : process.env['BACKEND_API']
  }
})
