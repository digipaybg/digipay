<script lang="ts" setup>
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

onMounted(() => {
  animation = $anime({
    targets: ".year-container",
    translateY: [75, 0],
    opacity: [0, 1],
    scale: [0.8, 1],
    filter: ["blur(10px)", "blur(0px)"],
    delay: $anime.stagger(100, {
      from: "center",
      start: 800,
    }),
    easing: "easeOutExpo",
    duration: 500,
    autoplay: false,
  });
});
</script>

<template>
  <div class="space-y-4 mt-32">
    <LetterPullup
      text-class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold z-20 mt-32 mb-10"
      :words="$t('OtherYears.title')"
      :initial-delay="0"
    />
    <div
      class="grid grid-cols-1 md:grid-rows-3 md:grid-cols-4 gap-4 py-4"
      ref="yearBoxes"
    >
      <OtherYearsBox
        v-for="year in [years[5], years[4]]"
        :year="year"
        bentoSpan="md:col-span-2"
      />

      <!-- Middle Row - Side Boxes (2021 and 2022) -->
      <OtherYearsBox
        v-for="year in [years[3], years[0]]"
        :key="year.year"
        :year="year"
        bentoSpan="md:col-span-1 md:row-span-2"
      />

      <!-- Middle Row - Center Box -->
      <div
        class="md:col-start-2 md:col-span-2 md:row-start-2 bg-accent/20 rounded-xl p-6 text-center flex flex-col justify-center year-container"
      >
        <h2 class="text-4xl font-bold text-primary">2025</h2>
      </div>

      <!-- Bottom Row - 2023 -->
      <OtherYearsBox
        v-for="year in [years[2], years[1]]"
        :year="year"
        bentoSpan="md:col-span-1 md:row-span-1"
      />
    </div>
  </div>
</template>
