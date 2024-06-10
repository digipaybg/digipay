<script setup lang="ts">
  useSeoMeta({
    titleTemplate: "%s | DigiPay",
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

  useFavicon("/logo.jpg");
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
