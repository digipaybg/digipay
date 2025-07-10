import { defineOrganization } from "nuxt-schema-org/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

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
    "@nuxtjs/seo",
    "@nuxtjs/robots",
    "@nuxt/scripts",
    "nuxt-marquee",
    "nuxt-og-image",
  ],
  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
      subsets: ["cyrillic-ext", "cyrillic"],
    },
  },
  notion: {},
  colorMode: {
    preference: "dark",
    storage: "localStorage",
    classSuffix: "",
  },
  i18n: {
    bundle: {
      optimizeTranslationDirective: true,
    },
    locales: [
      { code: "en", language: "en", file: "en.json" },
      { code: "bg", language: "bg", file: "bg.json" },
    ],
    defaultLocale: "bg",
    strategy: "prefix_except_default",
  },

  // i18n: {
  //   bundle: {
  //     optimizeTranslationDirective: false,
  //   },
  //   locales: [
  //     { code: "en", language: "en", file: "en.json" },
  //     { code: "bg", language: "bg", file: "bg.json" },
  //   ],
  //   defaultLocale: "bg",
  //   strategy: "prefix_except_default",
  //   detectBrowserLanguage: {
  //     useCookie: true,
  //     cookieKey: "i18n_redirected",
  //     redirectOn: "root",
  //     alwaysRedirect: true,
  //     fallbackLocale: "bg",
  //   },
  // },
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
      notionToken: process.env.NUXT_PUBLIC_NOTION_TOKEN,
      databaseId: process.env.NUXT_PUBLIC_NOTION_DATABASE_ID,
      notionSpeakersDbId: process.env.NUXT_PUBLIC_NOTION_SPEAKERS_DB_ID,
      contactsDatabaseId: process.env.NUXT_PUBLIC_NOTION_CONTACTS_DATABASE_ID,
      newsletterDatabaseId:
        process.env.NUXT_PUBLIC_NOTION_NEWSLETTER_DATABASE_ID,
    },
  },
  robots: {
    allow: ["/"],
    sitemap: [
      "/sitemap_index.xml",
      "/__sitemap__/en.xml",
      "/__sitemap__/bg.xml",
    ],
  },
  schemaOrg: {
    identity: defineOrganization({
      name: "Digipay",
      url: "https://digipay.bg",
      logo: "https://digipay.bg/logo.svg",

      email: "raya.lecheva@digipay.bg",
      telephone: "+359 878 160 610",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-650-555-0124",
        email: "support@techcorp.com",
      },

      sameAs: [
        "https://www.linkedin.com/company/digi-pay-event/",
        "https://www.facebook.com/digipaybg/",
        "https://www.youtube.com/@digipay8873",
        "https://invite.viber.com/?g2=AQA8PRiCxpGN3k9NPjr%2FA9GJShhAqN23Vhj4KcU3ZLFJ8RQCJEzK5lnMLp93A0GJ",
      ],
    }),
  },
  build: {
    transpile: ["vue3-notion"],
  },
  seo: {
    redirectToCanonicalSiteUrl: false,
    fallbackTitle: true,
    meta: {
      description: "DIGIPAY is the best fintech conference in Bulgaria",
      twitterCreator: "@kaloyanes",
      twitterSite: "@mysite",
      colorScheme: "dark",
      applicationName: "DIGIPAY",
      ogSiteName: "DIGIPAY",
      ogLocale: "en_US",
      ogType: "website",
      ogUrl: "https://digipay.bg",
      ogTitle: "DIGIPAY",
      ogImage: {
        url: "https://digipay.bg/1600x624.png",
        width: 1600,
        height: 624,
        type: "image/png",
      },
      robots: "index, follow",
    },
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },

    head: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
        { rel: "icon", type: "image/png", href: "/logo.svg" },
        { rel: "apple-touch-icon", href: "/logo.svg" },
      ],
      meta: [
        {
          name: "description",
          content:
            "DIGIPAY е конференцията за сигурни и достъпни дигитални плащания в    България.Всяка година B2B конференцията привлича все повече партньори ипосетители като на последното шесто издание достигнаха над 330 душипрофесионалисти на живо и 150 онлайн.Конференцията се фокусира върху темите за отворено банкиране, незабавниплaщания, нови решения в сферата на плащанията, защита на данните,мониторинг и предотвратяване на измами, мерки срещу пране на пари ивсички теми, свързани със сигурните и достъпни дигитални плащания вБългария. Акцент на конференцията са новите цифрови решения исигурността на плащанията във всички сфери на икономиката, в коитоцентър е клиента.",
        },
      ],
    },
  },

  routeRules: {
    "/": {
      prerender: true,
      static: true,
      sitemap: { priority: 1 },
      isr: 60 * 60 * 24,
    },
  },
  sitemap: {
    discoverImages: true,
    discoverVideos: true,
  },
  site: {
    url: "https://digipay.bg",
    name: "DIGIPAY",
    description:
      "DIGIPAY е конференцията за сигурни и достъпни дигитални плащания в    България.Всяка година B2B конференцията привлича все повече партньори ипосетители като на последното шесто издание достигнаха над 330 душипрофесионалисти на живо и 150 онлайн.Конференцията се фокусира върху темите за отворено банкиране, незабавниплaщания, нови решения в сферата на плащанията, защита на данните,мониторинг и предотвратяване на измами, мерки срещу пране на пари ивсички теми, свързани със сигурните и достъпни дигитални плащания вБългария. Акцент на конференцията са новите цифрови решения исигурността на плащанията във всички сфери на икономиката, в коитоцентър е клиента.",
    indexable: true,
    _priority: 0.8,
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
