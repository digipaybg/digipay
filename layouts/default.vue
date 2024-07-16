<script lang="ts" setup></script>

<template>
  <div class="relative flex flex-col">
    <div class="sticky top-0 z-[10]">
      <Header />
    </div>

    <slot />

    <div class="relative bottom-0 mt-24 h-full">
      <Footer />
    </div>
  </div>
</template>

<style lang="scss"></style>
