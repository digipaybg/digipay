<script lang="ts" setup>
  const partnerTypes = [
    {
      type: "general",
      partners: [
        {
          name: "borica",
          image: "/partners/borica.webp",
          link: "https://www.borica.bg/products-and-services/b-trust",
        },
      ],
    },
    {
      type: "content",
      partners: [
        {
          name: "baker tilly",
          image: "/partners/bakertilly.png",
          link: "https://www.bakertilly.com/",
        },
        {
          name: "IBS Bulgaria",
          image: "/partners/ibs.png",
          link: "https://ibs.bg/wps/portal/ibs/home",
        },
      ],
    },
    {
      type: "organizational",
      partners: [
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
          name: "safenet",
          image: "/partners/safenet.png",
          link: "https://www.safenet.bg/",
        },
        {
          name: "Association of Certified Fraud Examiners",
          image: "/partners/acfe.png",
          link: "https://www.acfe.bg/",
        },
        {
          name: "Bulgarian E-commerce Association",
          image: "/partners/bea.png",
          link: "https://beabg.com/",
        },
      ],
    },
  ];
</script>

<template>
  <div class="">
    <h1 class="text-center text-4xl font-bold text-gray-900 dark:text-white">{{ $t("ourPartners") }}</h1>
    <div class="mt-8 divide-y divide-gray-200 px-24 dark:divide-green-500">
      <div v-for="(type, index) in partnerTypes" :key="index" class="relative grid gap-8 py-24 lg:grid-cols-5">
        <div
          class="flex items-center justify-between lg:sticky lg:top-0 lg:-mt-24 lg:flex-col lg:items-start lg:self-start lg:pt-24"
        >
          <h2 class="text-2xl font-bold capitalize text-gray-900 dark:text-white">{{ $t(type.type) }}</h2>
        </div>
        <div class="lg:col-span-4">
          <div class="-mt-4 grid grid-cols-2 gap-8 gap-x-4 sm:grid-cols-3 md:grid-cols-4">
            <a
              v-for="(partner, jIndex) in type.partners"
              :key="jIndex"
              class="focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 group inline-flex flex-1 flex-shrink-0 flex-col items-center justify-center gap-x-2.5 rounded-xl px-3.5 py-2.5 text-base font-medium text-gray-900 transition-all duration-300 hover:bg-white focus:outline-none focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-75 dark:text-white dark:hover:bg-blue-950"
              :href="partner.link"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span
                class="relative mx-auto mt-4 inline-flex flex-shrink-0 items-center justify-center rounded-full text-2xl"
              >
                <NuxtImg
                  format="webp"
                  quality="60"
                  class="h-40 w-full rounded-2xl bg-white object-scale-down p-5 text-2xl transition-all duration-300 group-hover:bg-white/75"
                  :alt="partner.name"
                  :src="partner.image"
                  loading="lazy"
                />
              </span>
              <h3
                class="mb-2 mt-6 h-20 text-center font-semibold capitalize leading-7 tracking-tight text-gray-900 dark:text-white"
              >
                {{ partner.name }}
              </h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
