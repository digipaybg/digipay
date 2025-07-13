<script lang="ts" setup>
useHead({
  link: [{ rel: "icon", href: "/logo.svg" }],
});

const { locale } = useI18n();
useSeoMeta({
  ogLocale: locale.value,
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
