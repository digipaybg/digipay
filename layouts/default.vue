<script lang="ts" setup>
useHead({
  link: [{ rel: "icon", href: "/favicon.svg" }],
});

const { locale } = useI18n();

useSeoMeta({
  title: "DIGIPAY 2025",
  ogTitle: "DIGIPAY 2025",
  ogDescription: "DIGIPAY 2025",
  twitterTitle: "DIGIPAY 2025",
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
  ogSiteName: "DIGIPAY 2025",
  ogType: "website",
  ogUrl: "https://digipay.bg",
  ogLocale: locale.value,
  titleTemplate: (title) =>
    title ? `${title} | DIGIPAY 2025` : "DIGIPAY 2025",
});

useHead({
  meta: [
    {
      name: "description",
      content:
        "DIGIPAY 2025 is a conference in Bulgaria that brings together the best experts in the field of digital payments.",
    },
    {
      name: "image",
      property: "og:image",
      content: "/1600x624.png",
    },
  ],
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
