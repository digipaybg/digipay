<script lang="ts" setup>
  import { formatDate } from "@vueuse/core";

  const countToDate = new Date("2024-10-08T09:00:00+03:00");

  const currentTime = ref(new Date());

  onMounted(() => {
    setInterval(() => {
      currentTime.value = new Date();
    }, 1000);
  });
</script>

<template>
  <h1 class="header-text hero-text font-['Bebas Neue'] h-40 text-[70px] text-primary lg:text-[70px] xl:text-[130px]">
    {{ formatDate(new Date(countToDate.getTime() - currentTime.getTime()), "DD:mm:ss") }}
  </h1>
</template>

<style lang="scss"></style>
