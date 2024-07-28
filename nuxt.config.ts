// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },modules: ['@primevue/nuxt-module', "@nuxt/image",],
primevue: {
  options: {
      theme: {
          preset: Aura
      }
  }
},

plugins: [
  '~/plugins/primevue.js',
  
],
css: [
  
  'primeicons/primeicons.css' // Icons CSS
],

})