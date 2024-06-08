// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "nuxt-icon",
    "shadcn-nuxt",
  ],

  routeRules: {
    "/": { prerender: true },
    "/blog/*": { isr: 3600 },
  },

  i18n: {
    locales: [
      { code: "bg", file: "lang/bg.ts", name: "Български" },
      { code: "en", file: "lang/en.ts", name: "English" },
    ],
    defaultLocale: "bg",
    strategy: "prefix_except_default",
  },
  colorMode: {
    classPrefix: "",
    classSuffix: "",
    preference: "system",
    dataValue: "system",
  },
  googleFonts: {
    families: {
      Inter: [400, 700, 800, 900],
    },
  },
  image: {
    dir: "public/",
  },
});
