<script lang="ts" setup>
useFavicon("/logo.svg");

useSeoMeta({
  ogImage: "/1600x624.svg",
  ogImageAlt: "DIGIPAY 2025",
  ogTitle: "DIGIPAY 2025",
  ogDescription: "DIGIPAY 2025",
  twitterTitle: "DIGIPAY 2025",
  title: "DIGIPAY 2025",

  titleTemplate: (title) =>
    title ? `${title} | DIGIPAY 2025` : "DIGIPAY 2025",
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
