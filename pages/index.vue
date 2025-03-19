<script setup lang="ts">
definePageMeta({
  scrollToTop: true,
  keepalive: false,
});

useHead({
  title: null,
  meta: [
    {
      name: "description",
      content:
        "Digipay is a payment gateway that allows you to accept payments online, in-store, or on the go.",
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
