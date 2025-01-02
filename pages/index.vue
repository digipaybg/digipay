<script setup lang="ts">
import NumberFlow from "@number-flow/vue";
import { ref, onMounted } from "vue";

const count = ref(0);
</script>

<template>
  <div>
    <HomeHero />
    <HomeAboutSection />
  </div>
</template>
