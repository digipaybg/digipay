<script setup lang="ts">
const timelineItems = [
  {
    key: "digital_payments",
    icon: "tabler:device-mobile",
  },
  {
    key: "banking",
    icon: "tabler:building-bank",
  },
  {
    key: "regulation",
    icon: "tabler:key-filled",
  },
  {
    key: "innovation",
    icon: "tabler:brain",
  },
];

const { $anime } = useNuxtApp();
let animation: anime.AnimeInstance;
const containerRef = ref<HTMLElement | null>(null);
const isDescriptionVisible = useElementVisibility(containerRef, {
  threshold: 0.75,
});

watch(isDescriptionVisible, (value) => {
  if (value && !animation.began) {
    animation.play();
  }
});

onMounted(() => {
  animation = $anime({
    targets: ".timeline-item",
    filter: ["blur(10px)", "blur(0px)"],
    opacity: [0, 1],
    left: ["-100px", "0px"],
    easing: "easeOutExpo",
    autoplay: false,
    delay: $anime.stagger(100),
  });
});
</script>

<template>
  <div
    class="flex flex-col justify-evenly space-y-6 sm:space-y-10 mx-auto mt-32"
  >
    <LetterPullup
      text-class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold z-20 mt-32 mb-10"
      :words="$t('WhoIsItAbout.title')"
      :initial-delay="0"
    />
    <div class="relative" ref="containerRef">
      <div
        v-for="(item, index) in timelineItems"
        :key="index"
        class="relative flex items-center min-h-40 sm:min-h-52 pb-20 sm:pb-32 md:pb-44 pl-8 sm:pl-12 timeline-item"
      >
        <div
          v-if="index !== timelineItems.length - 1"
          class="absolute left-6 sm:left-8 top-0 h-full w-px bg-primary/50"
        />
        <div class="ml-8 sm:ml-12 w-full">
          <div
            class="w-12 h-12 sm:w-16 sm:h-16 bg-secondary border-primary border rounded-full flex items-center justify-center absolute -left-0 top-0"
          >
            <div class="text-secondary-foreground w-5 h-5 sm:w-8 sm:h-8">
              <Icon :name="item.icon" size="32" />
            </div>
          </div>
          <div
            class="mt-2 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0"
          >
            <h3
              class="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
            >
              {{ $t(`WhoIsItAbout.items.${item.key}.title`) }}
            </h3>
            <p
              class="text-foreground/60 text-base sm:text-lg md:text-xl w-full md:w-1/3 md:text-right"
            >
              {{ $t(`WhoIsItAbout.items.${item.key}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
