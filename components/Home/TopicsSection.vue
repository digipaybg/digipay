<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { breakpointsTailwind } from "@vueuse/core";

const containerStyles =
  "flex flex-col h-full w-full bg-secondary rounded-2xl p-4 sm:p-6 shadow-[0px_0px_0px_0px] shadow-border hover:shadow-[0px_5px_10px_0px] hover:shadow-border hover:-translate-y-[5px] transition-all duration-300 ease-out containerStyle";

const topicTitleStyle = "text-xl sm:text-2xl lg:text-3xl font-semibold";
const topicDescriptionStyle = "text-base sm:text-lg text-foreground/70";

const { $anime } = useNuxtApp() as any;

let animation: anime.AnimeInstance;
const isMobile = useBreakpoints(breakpointsTailwind).smallerOrEqual("md");

const containerRef = ref<HTMLElement | null>(null);
const isContainerVisible = useElementVisibility(containerRef, {
  threshold: isMobile ? 0.2 : 0.75,
});

watch(isContainerVisible, (isVisible) => {
  if (isVisible && !animation.began) {
    animation.play();
  }
});

onMounted(() => {
  animation = $anime({
    targets: ".containerStyle",
    translateY: [50, 0], // Reduced translation for mobile
    opacity: [0, 1],
    filter: ["blur(5px)", "blur(0px)"], // Reduced blur for better mobile performance
    duration: 500,
    easing: "easeOutExpo",
    autoplay: false,

    delay: $anime.stagger(50, {
      from: isMobile ? "first" : "center",
    }),
  });
});
</script>

<template>
  <div class="px-2 sm:px-4">
    <LetterPullup
      text-class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold mt-16 sm:mt-32 mb-6 sm:mb-10 text-center"
      container-class="mx-auto text-center justify-center"
      :words="$t('Topics.title')"
      :initial-delay="0"
      key="topics"
    />
    <div
      ref="containerRef"
      class="grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-4 md:grid-rows-4 min-h-[400px] sm:min-h-[600px]"
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

<style lang="scss">
@media (max-width: 640px) {
  .containerStyle {
    min-height: 200px;
  }
}
</style>
