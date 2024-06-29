// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "nuxt-icon",
    "shadcn-nuxt",
    "@oku-ui/motion-nuxt",
    "@nuxt/content",
    "@nuxthq/studio",
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
});
