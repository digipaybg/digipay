<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { breakpointsTailwind } from "@vueuse/core";

const props = defineProps<{
  index: number;
  diff: string;
}>();

let animation: anime.AnimeTimelineInstance;
const { $anime } = useNuxtApp();

const itemRef = ref<HTMLElement | null>(null);
const isItemVisible = useElementVisibility(itemRef, {
  threshold: 0.75,
});

watch(isItemVisible, (isVisible) => {
  if (isVisible && !animation.began) {
    animation.play();
  }
});

onMounted(() => {
  animation = $anime.timeline({
    easing: "easeOutExpo",
    duration: window.innerWidth < 640 ? 500 : 750, // Faster animation on mobile
    autoplay: false,
    delay: window.innerWidth < 640 ? 80 : 120, // Shorter delay on mobile
  });

  const targetSelector = `.diff-${props.index}`;

  animation.add({
    targets: `${targetSelector} .diff-image`,
    opacity: [0, 1],
    scale: [0.8, 1], // Less dramatic scale on mobile
    filter: ["blur(10px)", "blur(0px)"], // Reduced blur for better performance
  });

  animation.add(
    {
      targets: `${targetSelector} .diff-text`,
      opacity: [0, 1],
      filter: ["blur(15px)", "blur(0px)"],
      scale: [0.6, 1],
    },
    "-=600",
  );

  animation.add(
    {
      targets: `${targetSelector} .diff-text-content`,
      filter: ["blur(15px)", "blur(0px)"],
      translateY: [-475, 0],
      scale: [0.8, 1],
      delay: $anime.stagger(100, {
        from: "last",
      }),
    },
    "-=600",
  );
});

const { t } = useI18n();

const isMobile = useBreakpoints(breakpointsTailwind).isSmallerOrEqual("lg");
const isEven = props.index % 2 === 0 || isMobile;
</script>

<template>
  <div
    :class="
      cn(
        'flex gap-4 max-h-[500px] sm:gap-0 diff-' + index,
        'flex-col sm:flex-row rounded-[50px] overflow-hidden',
        props.index % 2 === 0 ? '!flex-row' : '!flex-row-reverse',
      )
    "
    ref="itemRef"
  >
    <div
      :class="
        cn(
          'flex-[2] flex items-center justify-center relative overflow-hidden diff-image',
          'min-h-[200px] sm:min-h-0',
        )
      "
    >
      <NuxtImg
        :src="`/differences/difference-${index + 1}.jpg`"
        :alt="$t(diff)"
        class="w-full h-full object-cover"
        format="webp"
        preload
        placeholder
      />
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-700/30 via-green-500/30 to-purple-400/30"
      />
    </div>
    <div
      :class="
        cn(
          'flex-[2] md:flex-[1] flex flex-col justify-end p-4 sm:p-8 md:p-16 overflow-hidden diff-text',
          'min-h-[150px] sm:min-h-0',

          'rounded-l-none',
          isEven
            ? 'bg-secondary sm:rounded-l-none'
            : 'bg-muted sm:rounded-r-none',
        )
      "
    >
      <p class="diff-text-content">
        <span
          v-for="(word, wordIndex) in t(diff).split(' ')"
          :key="`${word}-${wordIndex}`"
          :class="[
            'inline-block text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed sm:leading-normal',
            word.endsWith(';')
              ? 'text-primary font-bold'
              : 'text-primary/70 font-semibold',
          ]"
        >
          {{ word.replace(";", "") }}&nbsp;
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.diff-text {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

@media (min-width: 640px) {
  .diff-text {
    box-shadow: none;
  }
}
</style>
