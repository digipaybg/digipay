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
  {
    key: "fraud_prevention",
    icon: "tabler:shield-lock",
  },
  {
    key: "aml",
    icon: "tabler:creative-commons-nc",
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
    filter: ["blur(5px)", "blur(0px)"], // Reduced blur for better mobile performance
    opacity: [0, 1],
    left: ["-50px", "0px"], // Reduced movement for mobile
    easing: "easeOutExpo",
    autoplay: false,
    delay: $anime.stagger(50), // Faster stagger for mobile
  });
});
</script>

<template>
  <div
    class="flex flex-col justify-evenly space-y-2 sm:space-y-6 mx-auto mt-8 sm:mt-32"
  >
    <LetterPullup
      text-class="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold z-20 mt-8 sm:mt-32 mb-4 sm:mb-10"
      :words="$t('WhoIsItAbout.title')"
      :initial-delay="0"
      container-class="justify-center"
      key="about"
    />
    <div class="relative" ref="containerRef">
      <div
        v-for="(item, index) in timelineItems"
        :key="index"
        class="relative flex items-start sm:items-center min-h-[100px] sm:min-h-40 pb-8 sm:pb-20 md:pb-44 pl-4 sm:pl-8 md:pl-12 timeline-item"
      >
        <div
          v-if="index !== timelineItems.length - 1"
          class="absolute left-3 sm:left-6 md:left-8 top-0 h-full w-px bg-primary/50"
        />
        <div class="ml-4 sm:ml-8 md:ml-12 w-full">
          <div
            class="w-6 h-6 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-secondary border-primary border rounded-full flex items-center justify-center absolute -left-0 top-0"
          >
            <div class="text-secondary-foreground size-6">
              <Icon :name="item.icon" class="w-full h-full" />
            </div>
          </div>
          <div
            class="mt-1 sm:mt-2 flex flex-col md:flex-row md:justify-between gap-2 sm:gap-4 md:gap-0"
          >
            <h3
              class="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
            >
              {{ $t(`WhoIsItAbout.items.${item.key}.title`) }}
            </h3>
            <p
              class="text-xs sm:text-base md:text-xl text-foreground/60 w-full md:w-1/3 md:text-right"
            >
              {{ $t(`WhoIsItAbout.items.${item.key}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .timeline-item {
    overflow-x: hidden;
  }
}
</style>
