<script lang="ts" setup>
useFavicon("/logo.svg");

useHead({
  titleTemplate: (title) =>
    title ? `${title} | DIGIPAY 2025` : "DIGIPAY 2025",
});

useSeoMeta({
  ogImage: "/1600x624.svg",
});
</script>

<template>
  <div>
    <Navigation />
    <slot />
    <Footer />
  </div>
</template>

<style lang="scss"></style>
