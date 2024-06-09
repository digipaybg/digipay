<script lang="ts" setup>
  const scrollInfo = ref(0);

  onMounted(() => {
    window.onscroll = () => {
      scrollInfo.value = window.scrollY;
    };
  });
</script>

<template>
  <div
    class="absolute flex w-screen justify-around py-3 transition-all duration-300"
    :class="{
      'backdrop-blur-lg': scrollInfo >= 400,
    }"
  >
    <NuxtImg preload class="rounded-full" src="/logo.jpg" format="webp" quality="50" :height="50" />
    <div class="space-x-2">
      <HeaderLanugageSelector />
      <HeaderDarkModeToogle />
    </div>
  </div>
</template>

<style lang="scss"></style>
