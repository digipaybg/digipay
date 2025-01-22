<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{
  words: string;
  initialDelay?: number;
  containerClass?: string;
  textClass?: string;
  animateDirectly?: boolean;
}>();

const { y: scrollY } = useWindowScroll();
const { $anime } = useNuxtApp();
const letterPullup = ref<HTMLElement | null>(null);
const isLetterPullupVisible = useElementVisibility(letterPullup);

let animation: anime.AnimeInstance;

watch(scrollY, () => {
  if (isLetterPullupVisible.value && !animation.began) {
    animation.play();
  }
});

onMounted(() => {
  // Set initial state immediately
  const letters = document.querySelectorAll<HTMLElement>(".letter");
  for (const letter of letters) {
    letter.style.opacity = "0";
    letter.style.transform = "translateY(50px)";
  }

  animation = $anime({
    targets: letters,
    opacity: [0, 1],
    filter: ["blur(15px)", "blur(0px)"],
    translateY: [50, 0],
    easing: "easeOutExpo",
    duration: 300,
    autoplay: false,
    delay: $anime.stagger(25, {
      start: props.initialDelay ?? 0,
    }),
  });

  if (props.animateDirectly) {
    animation.play();
  }
});
</script>

<template>
  <div
    ref="letterPullup"
    :class="
      cn('flex gap-[0.25em] flex-wrap px-4 items-center', props.containerClass)
    "
  >
    <span
      v-for="(letter, index) in words.split('')"
      :key="index"
      :class="
        cn(
          'font-display text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-4xl md:leading-[5rem] letter opacity-0',
          props.textClass,
        )
      "
    >
      {{ letter === " " ? "\u00A0" : letter }}
    </span>
  </div>
</template>
