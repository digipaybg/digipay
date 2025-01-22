<script lang="ts" setup>
// No additional setup needed as translations will be handled by Vue i18n
const containerRef = ref<HTMLElement | null>(null);
const isVideoVisible = useElementVisibility(containerRef, {
  threshold: 0.75,
});

let animation: anime.AnimeInstance;
const { $anime } = useNuxtApp();

watch(isVideoVisible, (value) => {
  if (value && !animation.began) {
    animation.play();
  }
});

onMounted(() => {
  const isMobile = window.innerWidth < 640;
  animation = $anime({
    targets: [containerRef.value, ".video-container"],
    opacity: [0, 1],
    filter: ["blur(8px)", "blur(0px)"], // Less blur for mobile
    translateY: [isMobile ? 45 : 75, 0], // Smaller movement on mobile
    easing: "easeOutExpo",
    duration: isMobile ? 450 : 600, // Faster animation on mobile
    delay: isMobile ? 200 : 300,
    autoplay: false,
  });
});
</script>

<template>
  <div
    class="space-y-4 sm:space-y-8 md:space-y-10 mt-16 sm:mt-32 px-4 sm:px-6 md:px-8"
  >
    <LetterPullup
      :words="$t('Video2024.title')"
      text-class="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold mt-16 sm:mt-32 mb-6 sm:mb-10"
      :initial-delay="0"
      container-class="justify-center"
      key="video"
    />
    <div class="w-full max-w-screen-2xl mx-auto" ref="containerRef">
      <iframe
        src="https://www.youtube.com/embed/1F0RMUus_Ek?si=RpqSFEvF9kViHUCX"
        :title="$t('Video2024.videoTitle')"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        class="w-full aspect-video rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg video-container"
      />
    </div>
  </div>
</template>

<style scoped>
.video-container {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

@media (max-width: 640px) {
  .video-container {
    width: 100% !important;
    height: auto !important;
  }
}
</style>
