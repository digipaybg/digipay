<script setup lang="ts">
import type { Transition } from "@vueuse/motion";
import { ref } from "vue";

const props = defineProps<{
  link: string;
  alt: string;
  bentoSpan: string;
}>();

const imageRef = ref<HTMLElement | null>(null);
const isInView = useElementVisibility(imageRef, { threshold: 0.75 });

const transition: Transition = {
  type: "spring",
  bounce: 0.2,
};

const hoverAnimation = {
  scale: 1.02,
  filter: "blur(0px) saturate(1.2)",
};

const { $anime } = useNuxtApp();

onMounted(() => {
  const animation = $anime({
    targets: imageRef.value,
    opacity: [0, 1],
    filter: ["blur(20px) saturate(0)", "blur(0px) saturate(0.8)"],
    scale: [0.8, 1],
    easing: "easeOutExpo",
    autoplay: false,
    begin: () => {
      $anime.set(imageRef.value, { opacity: 0 });
    },
  });

  window.addEventListener("scroll", () => {
    if (isInView.value && !animation.began) {
      animation.play();
    }
  });

  if (imageRef.value) {
    imageRef.value.addEventListener("mouseenter", () => {
      $anime({
        targets: imageRef.value,
        scale: hoverAnimation.scale,
        filter: hoverAnimation.filter,
        easing: "easeOutExpo",
      });
    });

    imageRef.value.addEventListener("mouseleave", () => {
      $anime({
        targets: imageRef.value,
        scale: 1,
        filter: "blur(0px) saturate(0.8)",
        easing: "easeOutExpo",
      });
    });
  }

  return () => {
    window.removeEventListener("scroll", () => {
      if (isInView.value && !animation.began) {
        animation.play();
      }
    });
  };
});
</script>

<template>
  <div
    ref="imageRef"
    :class="[
      'hover:saturate-100 hover:scale-[1.02] ease-out duration-300',
      'relative w-full h-full rounded-2xl overflow-hidden',
      bentoSpan,
    ]"
  >
    <NuxtImg
      :src="link"
      :alt="alt"
      class="w-full h-full object-cover"
      sizes="100vw sm:50vw md:600px"
    />
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-700/30 via-green-500/30 to-purple-400/30"
    />
  </div>
</template>
