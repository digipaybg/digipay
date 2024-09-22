<script lang="ts" setup>
  import SplitType from "split-type";

  import { scroll } from "#imports";

  const partnerTypes = [
    {
      type: "general",
      partners: [
        {
          name: "borica",
          image: "/partners/borica.webp",
          link: "https://www.borica.bg/products-and-services/b-trust",
        },
        {
          name: "IBS Bulgaria",
          image: "/partners/ibs.png",
          link: "https://ibs.bg/wps/portal/ibs/home",
        },
        {
          name: "infopulse",
          image: "/partners/infopulse.png",
          link: "https://www.infopulse.com/",
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
          name: "DAIS",
          image: "/partners/dais.png",
          link: "https://dais-software.com/",
        },
        {
          name: "KOIOS",
          image: "/partners/koios.png",
          link: "https://koios.hr/",
        },
      ],
    },
    {
      type: "partners",
      partners: [
        {
          name: "evrotrust",
          image: "/partners/evrotrust.png",
          link: "https://evrotrust.com/",
        },
        {
          name: "sirma",
          image: "/partners/sirma.png",
          link: "https://www.sirma.com/",
        },
        {
          name: "Amatas",
          image: "/partners/amatas.png",
          link: "https://amatas.com/",
        },
        {
          name: "Omnio",
          image: "/partners/omnio.png",
          link: "https://omniocompliance.com/",
        },
        {
          name: "paysera",
          image: "/partners/paysera.png",
          link: "https://www.paysera.bg/",
        },
        {
          name: "devin",
          image: "/partners/devin.png",
          link: "https://devin-bg.com/",
        },
        {
          name: "Black Sea Golds",
          image: "/partners/blackseagold.webp",
          link: "https://bsgold.bg/",
        },
      ],
    },
    {
      type: "organizational",
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
          name: "safenet",
          image: "/partners/safenet.png",
          link: "https://www.safenet.bg/",
        },
        {
          name: "fram creative solutions",
          image: "/partners/fram.png",
          link: "https://framcreativesolutions.com/",
        },
      ],
    },

    {
      type: "media",
      partners: [
        {
          name: "3eNews",
          image: "/partners/3enews.png",
          link: "https://3enews.bg/",
        },
        {
          name: "Lider.bg",
          image: "/partners/lider.png",
          link: "https://lider.bg/",
        },
        {
          name: "zone4tech",
          image: "/partners/zone4tech.png",
          link: "https://zone4tech.bg/",
        },
      ],
    },
  ];

  onMounted(() => {
    const target = document.querySelector("#partners")!;

    const targets = document.querySelectorAll(".group")!;

    scroll(
      timeline([
        [
          targets,
          {
            y: [20, 0],
            opacity: [0, 1],
            scale: [0.7, 1],
            filter: ["blur(10px)", "blur(0px)"],
          },
          {
            delay: stagger(0.25, {
              from: "first",
            }),
            easing: spring({
              stiffness: 100,
              damping: 10,
              mass: 0.5,
            }),
          },
        ],
      ]),
      {
        target,
        smooth: 1,
        axis: "y",
        offset: ["start end", "end 750px"],
      },
    );
  });
</script>

<template>
  <div id="partners" class="relative px-4 py-8 lg:px-24 lg:py-16">
    <!-- <h1 id="partnersTitle" class="mb-6 py-10 text-center text-2xl sm:text-3xl md:text-4xl">
      {{ $t("partners") }}
    </h1> -->
    <div class="mt-8 divide-y divide-gray-200 dark:divide-green-500">
      <div v-for="(type, index) in partnerTypes" :key="index" class="relative grid gap-8 py-12 lg:grid-cols-5 lg:py-24">
        <div
          class="flex items-center justify-between lg:sticky lg:top-5 lg:-mt-24 lg:flex-col lg:items-start lg:self-start lg:pt-24"
        >
          <h2 class="text-xl font-bold capitalize text-gray-900 dark:text-white lg:text-2xl">{{ $t(type.type) }}</h2>
        </div>
        <div class="lg:col-span-4">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <NuxtLink
              v-for="(partner, jIndex) in type.partners"
              :key="jIndex"
              class="focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 group inline-flex flex-1 flex-shrink-0 flex-col items-center justify-center gap-x-2.5 rounded-xl bg-transparent p-3.5 text-base font-medium text-gray-900 transition-all duration-300 hover:bg-white focus:outline-none focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-75 dark:text-white dark:hover:bg-blue-950"
              :href="partner.link"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span class="relative inline-flex flex-shrink-0 items-center justify-center rounded-full text-2xl">
                <NuxtImg
                  format="webp"
                  quality="60"
                  class="-z-10 aspect-video h-24 rounded-2xl bg-white object-scale-down p-5 text-2xl transition-all duration-300 group-hover:bg-white/85 lg:h-40 lg:w-full"
                  :alt="partner.name"
                  :src="partner.image"
                  loading="lazy"
                />
              </span>
              <!-- <h3
                class="mb-2 mt-6 h-12 text-center font-semibold capitalize leading-7 tracking-tight text-gray-900 dark:text-white lg:h-20"
              >
                {{ partner.name }}
              </h3> -->
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <circle class="absolute right-[2%] top-[0%] -z-10 aspect-square w-1/2 rounded-full bg-[#27E076]/30 blur-[200px]" />
  </div>
</template>

<style lang="scss">
  #partners {
    scroll-margin-top: 125px;
  }
</style>
