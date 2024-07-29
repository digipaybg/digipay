<script lang="ts" setup></script>

<template>
  <div>
    <Header />

    <main class="min-h-screen pb-24 transition-all duration-300 lg:pb-10">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style lang="scss"></style>
