<script setup lang="ts">
definePageMeta({
  scrollToTop: true,
  keepalive: false,
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
