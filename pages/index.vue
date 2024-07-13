<script lang="ts" setup>
  definePageMeta({
    layout: "default",
  });

  useSeoMeta({
    title: "Home",
    twitterTitle: "Home | DigiPay",
    twitterCard: "summary_large_image",
    ogSiteName: "DigiPay",
  });

  const scrollContainer = useState<HTMLElement | null>("scrollContainer", () => null);
</script>

<template>
  <div ref="scrollContainer" class="flex flex-col gap-20 overflow-x-hidden overflow-y-hidden">
    <HomeHero />

    <HomeThemes />

    <LazyHomeAbout />

    <LazyHomeDifferent />

    <LazyHomeInvest />

    <LazyHomeSpeakers />

    <!-- <LazyHomeAgenda /> -->
  </div>
</template>

<style lang="scss"></style>
