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
  <div class="flex flex-col overflow-x-hidden" ref="scrollContainer">
    <HomeHero />

    <div v-for="i in 20" :key="i" class="h-96"></div>
    <div id="about"></div>
  </div>
</template>

<style lang="scss"></style>
