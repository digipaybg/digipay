<script lang="ts" setup></script>

<template>
  <div class="absolute flex w-[99vw] justify-around py-3 transition-all duration-300">
    <NuxtImg alt="DigiPay Logo" preload class="h-[50px] rounded-full" src="/logo.jpg" format="webp" quality="50" />
    <div class="space-x-2">
      <HeaderLanugageSelector />
      <HeaderDarkModeToogle />
    </div>
    <div class="absolute inset-0 -z-10 h-32 backdrop-blur-xl"></div>
  </div>
</template>

<style lang="scss">
  div.absolute.inset-0.-z-10 {
    mask-image: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }
</style>
