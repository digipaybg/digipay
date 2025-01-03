<script lang="ts" setup>
defineProps<{
  class: string;
}>();
</script>

<template>
  <NuxtImg src="/logo.svg" alt="DIGIPAY LOGO" :class="class" />
</template>

<style lang="scss"></style>
