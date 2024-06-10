<script lang="ts" setup>
  const partners = [
    {
      name: "IBS",
      logo: "/partners/ibs.png",
      url: "https://ibs.bg/wps/portal/ibs/home",
    },
    {
      name: "Borica",
      logo: "/partners/borica.webp",
      url: "https://www.borica.bg/products-and-services/b-trust",
    },
  ];
</script>

<template>
  <!-- <div class="space-y-5 py-5">
    <h1 class="text-center text-5xl">{{ $t("partners") }}</h1>
    <div class="flex justify-center gap-2">
      <a
        v-for="partner in partners"
        :key="partner.name"
        :href="partner.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group m-5 flex items-center justify-center p-2 brightness-0 grayscale-[0.5] invert transition-all duration-300 hover:scale-[1.03]"
      >
        <NuxtImg :src="partner.logo" format="webp" quality="50" class="h-20" />
      </a>
    </div>
  </div> -->
</template>

<style lang="scss"></style>
