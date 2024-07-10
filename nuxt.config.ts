// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "nuxt-icon",
    "shadcn-nuxt",
    "@oku-ui/motion-nuxt",
    "@nuxthq/studio",
    "@nuxt/content",
    "@nuxt/icon",
    "nuxt-lenis",
    "@nuxt/eslint",
    "@hypernym/nuxt-gsap",
  ],
  routeRules: {
    "/": { prerender: true, static: true },
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
    preference: "dark",
    dataValue: "dark",
  },
  googleFonts: {
    download: true,
    families: {
      Inter: [400, 700, 800, 900],
      "Bebas Neue": [400, 700, 800, 900],
    },
  },
  image: {
    dir: "public/",
  },
  motion: {
    autoImportComponents: true,
    autoImportMotion: true,
  },
  content: {
    defaultLocale: "bg",
    locales: ["bg", "en"],
    markdown: {},
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  compatibilityDate: "2024-07-05",
  icon: {
    dynamic: true,
  },
});
