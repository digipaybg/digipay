import { defineOrganization } from "nuxt-schema-org/schema";

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
    "@nuxtjs/seo",
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
      contactsDatabaseId: process.env.NUXT_PUBLIC_NOTION_CONTACTS_DATABASE_ID,
    },
  },
  robots: {
    groups: [
      {
        userAgent: ["AdsBot-Google-Mobile", "AdsBot-Google-Mobile-Apps"],
        disallow: ["/admin"],
        allow: ["/admin/login"],
      },
    ],
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
  seo: {
    meta: {
      description: "DIGIPAY is the best fintech conference in Bulgaria",

      twitterCreator: "@kaloyanes",
      twitterSite: "@mysite",
      colorScheme: "dark",
      applicationName: "DIGIPAY",

      // Nuxt SEO Utils already sets the below tags for you
      ogSiteName: "DIGIPAY",
      ogLocale: "en_US",
      ogType: "website",
      ogUrl: "https://digipay.bg",
      ogTitle: "DIGIPAY",

      ogImage: "https://2025.digipay.bg/og-image.jpeg",

      robots: "index, follow",
    },
  },
});
