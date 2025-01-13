// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  nitro: {
    experimental: {},
  },
  experimental: {
    payloadExtraction: true,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "vue3-notion/nuxt",
      { css: true, token: process.env.NUXT_PUBLIC_NOTION_TOKEN },
    ],
    "@nuxt/image",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/fonts",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@hypernym/nuxt-anime",
    "@nuxt/icon",
  ],
  notion: {},
  colorMode: {
    preference: "dark",
    storage: "localStorage",
    classSuffix: "",
  },
  i18n: {
    locales: [
      { code: "en", language: "en", file: "en.json" },
      { code: "bg", language: "bg", file: "bg.json" },
    ],
    defaultLocaleRouteNameSuffix: "bg",
    defaultLocale: "bg",
    baseUrl: "https://digipay.bg",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      fallbackLocale: "en",
    },
  },
  image: {
    domains: ["prod-files-secure.s3.us-west-2.amazonaws.com"],
  },
  runtimeConfig: {
    public: {
      motion: {
        directives: {
          "scale-up": {
            initial: {
              scale: 0.7,
              opacity: 0,
              filter: "blur(10px)",
            },
            visibleOnce: {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
            },
          },
        },
      },
      token: process.env.NUXT_PUBLIC_NOTION_TOKEN,
      databaseId: process.env.NUXT_PUBLIC_NOTION_DATABASE_ID,
    },
  },
});
