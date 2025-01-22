<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";

const years = [
  {
    year: 2024,
    subtitle: "DIGIPAY, Inter Expo Center",
    participants: 500,
    speakers: 20,
    partners: 22,
  },
  {
    year: 2023,
    subtitle: "DIGIPAY, Inter Expo Center",
    participants: 420,
    speakers: 26,
    partners: 18,
  },
  {
    year: 2022,
    subtitle: "DIGIPAY, Inter Expo Center",
    participants: 320,
    speakers: 16,
    partners: 15,
  },
  {
    year: 2021,
    subtitle: "DIGIPAY, Inter Expo Center",
    participants: 230,
    speakers: 23,
    partners: 15,
  },
  {
    year: 2020,
    subtitle: "DIGIPAY, Inter Expo Center",
    participants: 170,
    speakers: 12,
    partners: 4,
  },
  {
    year: 2019,
    subtitle: "Security of digital payments, Inter Expo Center",
    participants: 100,
    speakers: 15,
    partners: 10,
  },
];

const yearBoxes = ref<HTMLElement | null>(null);
const visible = useElementVisibility(yearBoxes, {
  threshold: 0.75,
});
let animation: anime.AnimeInstance;
const { $anime } = useNuxtApp();
const { y: scrollY } = useWindowScroll();

watch(visible, (value) => {
  if (value && !animation.began) {
    animation.play();
  }
});

const isMobile = useBreakpoints(breakpointsTailwind).isSmallerOrEqual("md");

onMounted(() => {
  animation = $anime({
    targets: ".year-container",
    translateY: [isMobile ? 45 : 75, 0],
    opacity: [0, 1],
    scale: [0.9, 1],
    filter: ["blur(8px)", "blur(0px)"], // Reduced blur for better mobile performance
    delay: $anime.stagger(isMobile ? 50 : 100, {
      from: isMobile ? "first" : "center",
    }),
    easing: "easeOutExpo",
    duration: isMobile ? 400 : 500,
    autoplay: false,
  });
});
</script>

<template>
  <div class="space-y-4 mt-16 sm:mt-32 px-4 sm:px-6 md:px-8">
    <LetterPullup
      text-class="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold z-20 mt-16 sm:mt-32 mb-6 sm:mb-10"
      :words="$t('OtherYears.title')"
      :initial-delay="0"
      container-class="justify-center"
      key="other-years"
    />
    <div
      class="flex flex-col md:flex-row overflow-x-auto pb-4 gap-3 sm:gap-4 hide-scrollbar snap-x snap-mandatory"
      ref="yearBoxes"
    >
      <OtherYearsBox
        v-for="year in years"
        :year="year"
        :key="year.year"
        bentoSpan="min-w-[280px] sm:min-w-0 sm:flex-1 snap-center"
      />
    </div>
  </div>
</template>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

@media (max-width: 640px) {
  .year-container {
    transform: translateZ(0);
    backface-visibility: hidden;
  }
}
</style>
