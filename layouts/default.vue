<script lang="ts" setup>
useHead({
  link: [{ rel: "icon", href: "/favicon.svg" }],
});

useSeoMeta({
  ogTitle: "DIGIPAY 2025",
  ogDescription: "DIGIPAY 2025",
  twitterTitle: "DIGIPAY 2025",
  title: "DIGIPAY 2025",
  ogImage: {
    url: "/1600x624.png",
    alt: "DIGIPAY 2025",
    height: 624,
    width: 1600,
  },
  twitterImage: {
    url: "/1600x624.png",
    alt: "DIGIPAY 2025",
    height: 624,
    width: 1600,
  },
  twitterDescription: "DIGIPAY 2025",
  twitterCard: "summary_large_image",
  twitterSite: "@digipay2025",
  twitterCreator: "@digipay2025",
  ogSiteName: "DIGIPAY 2025",
  ogType: "website",
  ogUrl: "https://digipay.bg",

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
