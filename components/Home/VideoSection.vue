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
  animation = $anime({
    targets: [containerRef.value, ".video-container"],
    opacity: [0, 1],
    filter: ["blur(15px)", "blur(0px)"],
    translateY: [75, 0],
    easing: "easeOutExpo",
    duration: 600,
    delay: 300,
    autoplay: false,
  });
});
</script>

<template>
  <div class="space-y-6 sm:space-y-8 md:space-y-10 mt-32">
    <LetterPullup
      :words="$t('Video2024.title')"
      text-class="text-4xl mt-32 mb-10 sm:text-5xl md:text-6xl lg:text-7xl font-semibold"
      :initial-delay="0"
    />
    <div class="w-full max-w-screen-2xl mx-auto" ref="containerRef">
      <iframe
        src="https://www.youtube.com/embed/1F0RMUus_Ek?si=RpqSFEvF9kViHUCX"
        :title="$t('Video2024.videoTitle')"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        class="w-full aspect-video rounded-xl sm:rounded-2xl shadow-lg video-container"
      />
    </div>
  </div>
</template>

<style lang="scss"></style>
