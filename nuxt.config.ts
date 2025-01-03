// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    // "@vueuse/motion/nuxt",
    "@nuxtjs/tailwindcss",
    ["vue3-notion/nuxt", { css: true }],
    "@nuxt/image",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/fonts",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@hypernym/nuxt-anime",
  ],
  notion: {
    token: process.env.NOTION_TOKEN,
  },
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
    domains: ["www.notion.so"],
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
    },
  },
});
