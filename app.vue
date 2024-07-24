<script setup lang="ts">
  useSeoMeta({
    titleTemplate: "%s | DigiPay",
    description:
      "DigiPay is a conference for fintech companies and solutions for the future of paying. We bring together the best speakers and companies to discuss the future of payments. ",
  });

  const { locale } = useI18n();

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
    colorMode.value = "dark";
  });
</script>

<template>
  <div>
    <lenis
      :options="{
        lerp: 0.2,
      }"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </lenis>
  </div>
</template>
