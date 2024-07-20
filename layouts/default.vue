<script lang="ts" setup>
  const { y } = useWindowScroll();
</script>

<template>
  <div class="">
    <Header :y="y" />

    <slot />

    <Footer />
  </div>
</template>

<style lang="scss"></style>
