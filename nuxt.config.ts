// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "shadcn-nuxt",
    "@oku-ui/motion-nuxt",
    "@nuxthq/studio",
    "@nuxt/content",
    "@nuxt/icon",
    "nuxt-lenis",
    "@nuxt/eslint",
    "@hypernym/nuxt-gsap",
    "nuxt-swiper",
    "@nuxtjs/seo",
    "nuxt-delay-hydration",
  ],
  routeRules: {
    "/": { prerender: true, ssr: true, static: false },
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
    preload: true,
    prefetch: true,
    inject: true,
    families: {
      Inter: [400, 700, 800, 900],
      "Bebas Neue": [400, 700, 800, 900],
      "IBM Plex Mono": [400, 700, 800, 900],
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
    markdown: {
      remarkPlugins: ["remark-reading-time"],
    },
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  compatibilityDate: "2024-07-05",
  icon: {
    fallbackToApi: true,
    provider: "iconify",
  },
  ogImage: {
    componentDirs: ["/components/OgImage"],
  },
  delayHydration: {
    mode: "mount",
  },
  site: {
    url: "https://digipay-seven.vercel.app",
  },
});
