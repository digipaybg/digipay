<script lang="ts" setup></script>

<template>
  <div>
    <Header :y="y" />

    <div class="py-10">
      <slot />
    </div>

    <Footer />
  </div>
</template>

<style lang="scss"></style>
