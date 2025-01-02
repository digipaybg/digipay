<script setup lang="ts">
const images = [
  {
    link: "/gallery/3.jpg",
    alt: "Picture of the author",
    width: 1200,
    height: 1200,
    bentoSpan: "col-span-2 row-span-2",
  },
  {
    link: "/gallery/1.jpg",
    alt: "Picture of the author",
    width: 1200,
    height: 1200,
    bentoSpan: "col-span-1 row-span-2",
  },
  {
    link: "/gallery/2.jpg",
    alt: "Picture of the author",
    width: 1200,
    height: 1200,
    bentoSpan: "col-span-1 row-span-1",
  },
  {
    link: "/gallery/8.jpg",
    alt: "Picture of the author",
    width: 1200,
    height: 1200,
    bentoSpan: "col-span-1 row-span-1",
  },
  {
    link: "/gallery/4.jpg",
    alt: "Picture of the author",
    width: 1200,
    height: 1200,
    bentoSpan: "col-span-2 row-span-2",
  },
  {
    link: "/gallery/7.jpg",
    alt: "Picture of the author",
    width: 1200,
    height: 1200,
    bentoSpan: "col-span-1 row-span-2",
  },
  {
    link: "/gallery/5.jpg",
    alt: "Picture of the author",
    width: 1200,
    height: 1200,
    bentoSpan: "col-span-1 row-span-2",
  },
];
</script>

<template>
  <div class="space-y-8 sm:space-y-10">
    <div
      class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
    >
      <AboutImageCard
        v-for="(image, index) in images"
        :key="index"
        v-bind="image"
      />
    </div>

    <MotionGroup
      is="h1"
      class="text-xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground/70"
      v-motion
      :initial="{
        opacity: 0,
        y: -100,
        filter: 'blur(10px)',
      }"
      :enter="{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          type: 'spring',
          bounce: 0.2,
          mass: 0.2,
        },
      }"
    >
      <span class="text-accent font-bold">DIGIPAY</span>
      {{ $t("AboutPage.is_largest_event") }}
      <span class="text-primary-foreground font-bold">
        {{ $t("AboutPage.bulgaria") }}
      </span>
      {{ $t("AboutPage.about_future_of") }}
      <span class="text-primary-foreground font-bold">
        {{ $t("AboutPage.payments") }}
      </span>
      , {{ $t("AboutPage.for_preventing") }}
      <span class="text-primary-foreground font-bold">
        {{ $t("AboutPage.fraud") }}
      </span>
      ,
      <span class="text-primary-foreground font-bold">
        {{ $t("AboutPage.money_laundering") }}
      </span>
      , {{ $t("AboutPage.for") }}
      <span class="text-primary-foreground font-bold">
        {{ $t("AboutPage.innovations") }}
      </span>
      {{ $t("AboutPage.transform_ecosystem_with") }}
      <span class="text-primary-foreground font-bold">
        {{ $t("AboutPage.mission") }}
      </span>
      {{ $t("AboutPage.for_secure_payments") }}
      <span
        class="font-bold text-blue-300 text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {{ $t("AboutPage.join_us") }}
      </span>
    </MotionGroup>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      <AboutStatistics :label="$t('AboutPage.participants')" :value="500" />
      <AboutStatistics :label="$t('AboutPage.speakers')" :value="20" />
      <AboutStatistics :label="$t('AboutPage.partners')" :value="22" />
    </div>
  </div>
</template>
