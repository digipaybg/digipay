<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{
  words: string;
  initialDelay?: number;
  containerClass?: string;
  textClass?: string;
}>();

const { $anime } = useNuxtApp();

onMounted(() => {
  $anime({
    targets: ".letter",
    opacity: [0, 1],
    filter: ["blur(15px)", "blur(0px)"],
    translateY: [50, 0],
    easing: "easeOutExpo",
    duration: 600,
    delay: $anime.stagger(25, {
      start: props.initialDelay || 0,
    }),
  });
});
</script>

<template>
  <div
    :class="
      cn('flex gap-[0.25em] flex-wrap px-4 items-center', props.containerClass)
    "
  >
    <span
      v-for="(letter, index) in words.split('')"
      :key="index"
      :class="
        cn(
          'font-display text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-4xl md:leading-[5rem] letter',
          props.textClass,
        )
      "
    >
      {{ letter === " " ? "\u00A0" : letter }}
    </span>
  </div>
</template>
