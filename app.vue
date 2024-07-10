<script setup lang="ts">
  useSeoMeta({
    titleTemplate: "%s | DigiPay",
    description:
      "DigiPay is a conference for fintech companies and solutions for the future of paying. We bring together the best speakers and companies to discuss the future of payments. ",
  });

  const { locale } = useI18n();

  watch(locale, () => {
    useHead({
      htmlAttrs: {
        lang: locale.value,
      },
    });
  });

  useHead({
    htmlAttrs: {
      lang: locale.value,
    },
    meta: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
    ],
  });

  const colorMode = useColorMode();

  onMounted(() => {
    if (!window.matchMedia("(prefers-color-scheme: dark)").matches) {
      useFavicon("/logo-dark.png");
    } else {
      useFavicon("/logo.png");
    }
    colorMode.value = "dark";
  });
</script>

<template>
  <div>
    <lenis
      :options="{
        lerp: 0.1,
      }"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </lenis>
  </div>
</template>
