<script setup lang="ts">
const images = [
  {
    link: "/gallery/3.jpg",
    alt: "Picture of the author",
    bentoSpan: "col-span-2 row-span-2",
  },
  {
    link: "/gallery/1.jpg",
    alt: "Picture of the author",
    bentoSpan: "col-span-1 row-span-2",
  },
  {
    link: "/gallery/2.jpg",
    alt: "Picture of the author",
    bentoSpan: "col-span-1 row-span-1",
  },
  {
    link: "/gallery/8.jpg",
    alt: "Picture of the author",
    bentoSpan: "col-span-1 row-span-1",
  },
  {
    link: "/gallery/4.jpg",
    alt: "Picture of the author",
    bentoSpan: "col-span-2 row-span-2",
  },
  {
    link: "/gallery/7.jpg",
    alt: "Picture of the author",
    bentoSpan: "col-span-1 row-span-2",
  },
  {
    link: "/gallery/5.jpg",
    alt: "Picture of the author",
    bentoSpan: "col-span-1 row-span-2",
  },
];

const { $anime } = useNuxtApp();
const scroll = useWindowScroll();
let animation: anime.AnimeInstance;
const descriptionRef = ref<HTMLElement | null>(null);
const isDescriptionVisible = useElementVisibility(descriptionRef, {
  threshold: 0.75,
});

watch(scroll.y, () => {
  if (isDescriptionVisible.value && !animation.began) {
    animation.play();
  }
});

onMounted(() => {
  animation = $anime({
    targets: ".description-text span",
    filter: ["blur(10px)", "blur(0px)"],
    opacity: [0.2, 1],
    marginLeft: ["-30px", "0px"],
    easing: "easeOutExpo",
    duration: 1000,
    autoplay: false,
    delay: $anime.stagger(100),
  });
});
</script>

<template>
  <div class="space-y-4 sm:space-y-8">
    <h1
      ref="descriptionRef"
      class="text-lg sm:text-xl md:text-4xl lg:text-6xl text-foreground/70 description-text my-8 sm:my-20 leading-relaxed sm:leading-normal"
    >
      <span class="text-accent font-bold">DIGIPAY</span>

      {{ $t("AboutPage.is_largest_event") }}

      <span class="text-foreground font-bold">
        {{ $t("AboutPage.bulgaria") }}
      </span>

      {{ $t("AboutPage.about_future_of") }}

      <span class="text-foreground font-bold">
        {{ $t("AboutPage.payments") }}
      </span>

      , {{ $t("AboutPage.for_preventing") }}

      <span class="text-foreground font-bold">
        {{ $t("AboutPage.fraud") }}
      </span>

      ,

      <span class="text-foreground font-bold">
        {{ $t("AboutPage.money_laundering") }}
      </span>

      , {{ $t("AboutPage.for") }}

      <span class="text-foreground font-bold">
        {{ $t("AboutPage.innovations") }}
      </span>

      {{ $t("AboutPage.transform_ecosystem_with") }}

      <span class="text-foreground font-bold">
        {{ $t("AboutPage.mission") }}
      </span>

      {{ $t("AboutPage.for_secure_payments") }}.

      <!-- <span
        class="font-bold text-blue-300 text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {{ $t("AboutPage.join_us") }}
      </span> -->
    </h1>

    <div
      class="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8"
    >
      <AboutImageCard
        v-for="(image, index) in images"
        :key="index"
        v-bind="image"
      />
    </div>

    <div class="space-y-4 sm:space-y-6">
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-10">
        <AboutStatistics :label="$t('AboutPage.participants')" :value="500" />
        <AboutStatistics :label="$t('AboutPage.speakers')" :value="20" />
        <AboutStatistics :label="$t('AboutPage.partners')" :value="22" />
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-10">
        <AboutStatistics
          :label="$t('AboutPage.statistics.satisfaction')"
          :value="62.2"
          :trailing="' %'"
        />
        <AboutStatistics
          :label="$t('AboutPage.statistics.return')"
          :value="92.3"
          :trailing="' %'"
        />
        <AboutStatistics
          :label="$t('AboutPage.statistics.previous')"
          :value="66.7"
          :trailing="' %'"
        />
        <AboutStatistics
          :label="$t('AboutPage.statistics.recommend')"
          :value="93.2"
          :trailing="' %'"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.description span {
  @apply opacity-0;
}

@media (max-width: 640px) {
  .description-text {
    word-wrap: break-word;
    hyphens: auto;
  }
}
</style>
