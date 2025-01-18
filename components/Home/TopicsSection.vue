<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { useNuxt } from "nuxt/kit";

const containerStyles =
  "flex flex-col h-full w-full bg-secondary rounded-2xl p-6 shadow-[0px_0px_0px_0px] shadow-border hover:shadow-[0px_5px_10px_0px] hover:shadow-border hover:-translate-y-[5px] transition-all duration-300 ease-out containerStyle";

const topicTitleStyle = "text-3xl font-semibold";
const topicDescriptionStyle = "text-lg text-foreground/70";

const { $anime } = useNuxtApp();

let animation: anime.AnimeInstance;

const containerRef = ref<HTMLElement | null>(null);
const isContainerVisible = useElementVisibility(containerRef, {
  threshold: 0.75,
});

watch(isContainerVisible, (isVisible) => {
  if (isVisible && !animation.began) {
    animation.play();
  }
});

onMounted(() => {
  animation = $anime({
    targets: ".containerStyle",
    translateY: [150, 0],
    opacity: [0, 1],
    filter: ["blur(10px)", "blur(0px)"],
    duration: 600,
    easing: "easeOutExpo",
    autoplay: false,

    delay: $anime.stagger(100, {
      from: "center",
    }),
  });
});
</script>

<template>
  <div>
    <LetterPullup
      text-class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mt-32 mb-10"
      :words="$t('Topics.title')"
      :initial-delay="0"
    />
    <div
      ref="containerRef"
      class="grid grid-cols-1 grid-rows-1 md:grid-cols-4 md:grid-rows-4 gap-2 min-h-[600px]"
    >
      <!-- Instant Payments -->
      <div :class="cn(containerStyles, 'md:row-span-3')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">
            {{ $t("Topics.items.instant_payments.topic") }}
          </h1>
          <p :class="topicDescriptionStyle">
            {{ $t("Topics.items.instant_payments.description") }}
          </p>
        </div>
      </div>

      <!-- Payments at the Eurozone border -->
      <div :class="cn(containerStyles, 'md:row-span-1 md:col-span-2')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">
            {{ $t("Topics.items.eurozone.topic") }}
          </h1>
          <p :class="topicDescriptionStyle">
            {{ $t("Topics.items.eurozone.description") }}
          </p>
        </div>
      </div>

      <!-- Secure Identification -->
      <div :class="cn(containerStyles, 'md:row-span-1 md:col-span-1')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">
            {{ $t("Topics.items.identification.topic") }}
          </h1>
          <p :class="topicDescriptionStyle">
            {{ $t("Topics.items.identification.description") }}
          </p>
        </div>
      </div>

      <!-- Fraud Prevention -->
      <div :class="cn(containerStyles, 'md:row-span-2 md:col-span-1')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">
            {{ $t("Topics.items.fraud.topic") }}
          </h1>
          <p :class="topicDescriptionStyle">
            {{ $t("Topics.items.fraud.description") }}
          </p>
        </div>
      </div>

      <!-- Cloud technologies -->
      <div :class="cn(containerStyles, 'md:row-span-2 md:col-span-2')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">
            {{ $t("Topics.items.cloud.topic") }}
          </h1>
          <p :class="topicDescriptionStyle">
            {{ $t("Topics.items.cloud.description") }}
          </p>
        </div>
      </div>

      <!-- Anti-money laundering -->
      <div :class="cn(containerStyles, 'md:row-span-1 md:col-span-2')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">
            {{ $t("Topics.items.aml.topic") }}
          </h1>
          <p :class="topicDescriptionStyle">
            {{ $t("Topics.items.aml.description") }}
          </p>
        </div>
      </div>

      <!-- AI and User Experience -->
      <div :class="cn(containerStyles, 'md:row-span-1 md:col-span-2')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">
            {{ $t("Topics.items.ai.topic") }}
          </h1>
          <p :class="topicDescriptionStyle">
            {{ $t("Topics.items.ai.description") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
