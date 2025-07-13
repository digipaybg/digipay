<script setup lang="ts">
definePageMeta({
  scrollToTop: true,
  keepalive: false,
});

const locale = useI18n().locale;
useSeoMeta({
  ogDescription:
    "DIGIPAY 2025 is a conference in Bulgaria that brings together the best experts in the field of digital payments.",
  twitterDescription:
    "DIGIPAY 2025 is a conference in Bulgaria that brings together the best experts in the field of digital payments.",
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
  twitterCard: "summary_large_image",
  twitterSite: "@digipay2025",
  ogSiteName: "DIGIPAY 2025",
  ogType: "website",
  ogUrl: "https://digipay.bg",
  ogLocale: locale.value,
});
</script>

<template>
  <div class="max-w-screen-2xl mx-auto *:font-sans">
    <HomeHeroSection />
    <div className="px-4 sm:px-6 2xl:px-0">
      <LazyHomeAboutSection />
      <LazyHomeTopicsSection />
      <LazyHomeWhoIsItAboutSection />
      <LazyHomeDigipayDifferenceSection />
      <LazyHomeTestimonialsSection />
      <LazyHomeVideoSection />
      <LazyHomeWhatHappenedInOtherYearsSection />
      <LazyHomeNewsletterSection />
    </div>
  </div>
</template>

<style lang="scss">
body {
  font-family: "Manrope", sans-serif;
}
</style>
