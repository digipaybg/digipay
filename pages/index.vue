<script lang="ts" setup>
  definePageMeta({
    layout: "default",
  });

  useSeoMeta({
    title: "Home",
  });

  const scrollContainer = useState<HTMLElement | null>("scrollContainer", () => null);
</script>

<template>
  <div class="flex flex-col gap-3 overflow-x-hidden overflow-y-hidden" ref="scrollContainer">
    <HomeHero />

    <HomeAbout />

    <HomeDifferent />
  </div>
</template>

<style lang="scss"></style>
