<script setup lang="ts">
import type { Transition } from "@vueuse/motion";
import { ref } from "vue";

const props = defineProps<{
  link: string;
  alt: string;
  width: number;
  height: number;
  bentoSpan: string;
}>();

const imageRef = ref(null);
const isInView = useElementVisibility(imageRef, { threshold: 0.75 });

const transition: Transition = {
  type: "spring",
  bounce: 0.2,
};

const variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    filter: "blur(20px) saturate(0)",
    transition: transition,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px) saturate(0.8)",
    transition: transition,
  },
};

const hoverAnimation = {
  scale: 1.02,
  filter: "blur(0px) saturate(1.2)",
};
</script>

<template>
  <div
    ref="imageRef"
    :class="['relative w-full h-full rounded-2xl overflow-hidden', bentoSpan]"
    v-motion
    :initial="variants.hidden"
    :visible-once="variants.visible"
    :hovered="hoverAnimation"
  >
    <NuxtImg
      :src="link"
      :alt="alt"
      :width="width"
      :height="height"
      class="w-full h-full object-cover"
    />
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-700/30 via-green-500/30 to-purple-400/30"
    />
  </div>
</template>
