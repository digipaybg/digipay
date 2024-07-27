<script lang="ts" setup></script>

<template>
  <div>
    <Header />

    <div class="min-h-screen pb-24 transition-all duration-300 lg:pb-10">
      <slot />
    </div>

    <Footer />
  </div>
</template>

<style lang="scss"></style>
