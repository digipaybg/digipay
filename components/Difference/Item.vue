<script lang="ts" setup>
import { cn } from "@/lib/utils";

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
    duration: 750,
    autoplay: false,
    delay: 120,
  });

  const targetSelector = `.diff-${props.index}`;

  animation.add({
    targets: `${targetSelector} .diff-image`,
    opacity: [0, 1],
    scale: [0.6, 1],
    filter: ["blur(15px)", "blur(0px)"],
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
</script>

<template>
  <div
    :class="
      cn(
        'flex diff-' + index,
        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse',
      )
    "
    ref="itemRef"
  >
    <div
      :class="
        cn(
          'flex-[2] flex items-center justify-center relative rounded-[50px] overflow-hidden diff-image',
          index % 2 === 0 ? 'rounded-r-none' : 'rounded-l-none',
        )
      "
    >
      <NuxtImg
        :src="`/differences/difference-${index + 1}.jpg`"
        :alt="$t(diff)"
        class="w-full aspect-video object-cover"
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
          'flex-[1] rounded-[50px] aspect-video flex flex-col justify-between p-16 overflow-hidden diff-text',
          index % 2 === 0
            ? 'bg-secondary rounded-l-none'
            : 'bg-muted rounded-r-none',
        )
      "
    >
      <h3 class="text-5xl font-bold diff-text-content">
        {{ index + 1 }}
      </h3>
      <p
        class="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold diff-text-content"
      >
        {{ $t(diff) }}
      </p>
    </div>
  </div>
</template>
