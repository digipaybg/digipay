// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  vite: {},

  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: ["/", "/blog", "/speakers"],
    },
  },
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
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
    // "@zadigetvoltaire/nuxt-gtm",
    "nuxt-delay-hydration",
    "@nuxt/fonts",
    "nuxt-gtag",
    "@nuxt/scripts",
  ],
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },

    head: {
      meta: [
        {
          name: "description",
          value:
            "DIGIPAY е конференцията за сигурни и достъпни дигитални плащания в    България.Всяка година B2B конференцията привлича все повече партньори ипосетители като на последното шесто издание достигнаха над 330 душипрофесионалисти на живо и 150 онлайн.Конференцията се фокусира върху темите за отворено банкиране, незабавниплaщания, нови решения в сферата на плащанията, защита на данните,мониторинг и предотвратяване на измами, мерки срещу пране на пари ивсички теми, свързани със сигурните и достъпни дигитални плащания вБългария. Акцент на конференцията са новите цифрови решения исигурността на плащанията във всички сфери на икономиката, в коитоцентър е клиента.",
        },
      ],
    },
  },
  routeRules: {
    "/": { prerender: true, ssr: true, static: false, sitemap: { priority: 1 } },
    "/blog/**": { static: true, sitemap: { priority: 0.9 } },
    "/speakers/**": { static: true, prerender: true, sitemap: { priority: 0.7 } },
  },
  plugins: [],

  sitemap: {
    strictNuxtContentPaths: true,
    discoverImages: true,
    discoverVideos: true,
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

  // googleFonts: {
  //   preload: true,
  //   prefetch: true,
  //   inject: true,
  //   families: {
  //     Inter: [400, 700, 800, 900],
  //     "Bebas Neue": [400, 700, 800, 900],
  //     "IBM Plex Mono": [400, 700, 800, 900],
  //   },
  // },

  // gtm: {
  //   enableRouterSync: true,
  // },
  gtag: {
    id: "UA-174673900-1",
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
    mode: false,
  },
  site: {
    url: "https://digipay.bg",
    name: "DIGIPAY",
    description:
      "DIGIPAY е конференцията за сигурни и достъпни дигитални плащания в    България.Всяка година B2B конференцията привлича все повече партньори ипосетители като на последното шесто издание достигнаха над 330 душипрофесионалисти на живо и 150 онлайн.Конференцията се фокусира върху темите за отворено банкиране, незабавниплaщания, нови решения в сферата на плащанията, защита на данните,мониторинг и предотвратяване на измами, мерки срещу пране на пари ивсички теми, свързани със сигурните и достъпни дигитални плащания вБългария. Акцент на конференцията са новите цифрови решения исигурността на плащанията във всички сфери на икономиката, в коитоцентър е клиента.",
    indexable: true,
    _priority: 0.8,
  },
  fonts: {
    families: [
      // only resolve this font with the `google` provider
      { name: "Inter", provider: "google", preload: true, weights: [400, 700, 800, 900] },
      { name: "Bebas Neue", provider: "google", preload: true, weights: [400, 700, 800, 900] },
      { name: "IBM Plex Sans", provider: "google" },
      { name: "Jetbrains Mono", provider: "google", weights: [400, 700, 800, 900] },
    ],
  },
  seo: {
    redirectToCanonicalSiteUrl: true,
    fallbackTitle: true,
  },
  scripts: {
    registry: {
      // googleTagManager: {
      //   id: "UA-174673900-1",
      // },
      googleTagManager: {
        id: "GTM-P4HL4QC2",
      },
      googleAnalytics: {
        id: "UA-174673900-1",
      },
      metaPixel: {
        id: "1394237280749251",
      },
    },
  },
});
