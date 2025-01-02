<script setup lang="ts">
defineProps<{
  words: string;
}>();
</script>

<template>
  <div class="flex gap-[0.5em] flex-wrap justify-center px-4">
    <span
      v-for="(letter, index) in words.split('')"
      :key="index"
      :style="{ animationDelay: `${index * 0.1}s` }"
      v-motion
      :initial="{
        y: 100,
        opacity: 0,
        filter: 'blur(10px)',
      }"
      :enter="{
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.1 },
      }"
    >
      {{ letter === " " ? "\u00A0" : letter }}
    </span>
  </div>
</template>

<style scoped>
.animate-pullup {
  animation: pullup 0.5s ease forwards;
}

@keyframes pullup {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
