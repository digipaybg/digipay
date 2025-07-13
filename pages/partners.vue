<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

interface Partner {
  name: string;
  category: "Silver" | "Gold" | "Platinum";
  logo: string; // Path relative to public folder
  url: string;
}

const { t } = useI18n();

useHead({
  title: t("PartnersPage.title", "Our Partners"),
});

const partnerTypes = [
  {
    type: "gold",
    partners: [
      {
        name: "borica",
        image: "/partners/borica.png",
        link: "https://www.borica.bg/products-and-services/b-trust",
      },
      {
        name: "IBS Bulgaria",
        image: "/partners/ibs.png",
        link: "https://ibs.bg/wps/portal/ibs/home",
      },
      {
        name: "Bakertilly",
        image: "/partners/bakertilly.png",
        link: "https://www.bakertilly.com",
      },
    ],
  },
  {
    type: "silver",
    partners: [
      {
        name: "dais",
        image: "/partners/dais.png",
        link: "https://dais-software.com/",
      },
      {
        name: "Sirma",
        image: "/partners/sirma.png",
        link: "https://www.sirma.bg/",
      },
    ],
  },
  {
    type: "bronze",
    partners: [
      {
        name: "Paysera",
        image: "/partners/paysera.png",
        link: "https://paysera.bg/",
      },
    ],
  },
  {
    type: "partners",
    partners: [
      {
        name: "Association of Certified Fraud Examiners",
        image: "/partners/acfe.png",
        link: "https://www.acfe.bg/",
      },
      {
        name: "fintech bulgaria",
        image: "/partners/fintech.png",
        link: "https://fintechbulgaria.org/bg/",
      },
      {
        name: "basscom",
        image: "/partners/basscom.png",
        link: "https://www.basscom.org/",
      },
      {
        name: "Bulgarian E-commerce Association",
        image: "/partners/bea.png",
        link: "https://beabg.com/",
      },
      {
        name: "isaca",
        image: "/partners/isaca.png",
        link: "https://engage.isaca.org/sofiachapter/home",
      },
      {
        name: "European Digital Finance Association",
        image: "/partners/edfa.png",
        link: "https://europeandigitalfinance.eu/",
      },
      {
        name: "bbcc",
        image: "/partners/bbcc.png",
        link: "https://bbcc.bg/",
      },
      {
        name: "acss",
        image: "/partners/acss.png",
        link: "https://sanctionsassociation.org/",
      },
      {
        name: "fram creative solutions",
        image: "/partners/fram.png",
        link: "https://framcreativesolutions.com/",
      },
    ],
  },
];
useSeoMeta({
  title: t("PartnersPage.title", "Our Partners"),
  ogDescription:
    "DIGIPAY 2025 is a conference in Bulgaria that brings together the best experts in the field of digital payments.",
  twitterDescription:
    "DIGIPAY 2025 is a conference in Bulgaria that brings together the best experts in the field of digital payments.",
  twitterTitle: "DIGIPAY 2025",
  ogImage: {
    url: "/1600x624.png",
    alt: "DIGIPAY 2025",
    height: 624,
    width: 1600,
  },
  twitterImage: {
    url: "/1600x624.png",
    alt: "DIGIPAY 2025",
    height: 624,
    width: 1600,
  },
  twitterCard: "summary_large_image",
  twitterSite: "@digipay2025",
  ogSiteName: "DIGIPAY 2025",
  ogType: "website",
  ogUrl: "https://digipay.bg",
});
</script>

<template>
  <div
    class="partners-container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 font-sans min-h-screen"
  >
    <h1 class="text-4xl md:text-5xl font-bold mb-12 lg:mb-16">
      {{ $t("PartnersPage.title", "Our Partners") }}
    </h1>
    <div class="divide-y divide-accent">
      <div
        v-for="(category, index) in partnerTypes"
        :key="index"
        class="py-10 lg:py-16"
      >
        <h2 class="text-2xl lg:text-3xl font-semibold capitalize mb-8">
          {{ $t(`PartnersPage.${category.type}`, category.type) }}
        </h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-8"
        >
          <NuxtLink
            v-for="(partner, pIndex) in category.partners"
            :key="pIndex"
            class="group flex flex-col items-center justify-center p-4 bg-foreground/75 rounded-lg transition-all duration-300 hover:bg-foreground shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            :href="partner.link"
            rel="noopener noreferrer"
            target="_blank"
            :aria-label="`Visit ${partner.name}`"
          >
            <NuxtImg
              format="webp"
              quality="75"
              class="h-20 lg:h-24 w-auto object-contain transition-all ease-out duration-300 group-hover:scale-105 filter grayscale-[0.5] group-hover:grayscale-0"
              :alt="`${partner.name} logo`"
              :src="partner.image"
              loading="lazy"
              densities="1x 2x"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Styles removed, using Tailwind CSS */
</style>
