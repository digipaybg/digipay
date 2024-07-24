<script lang="ts" setup>
  const reasons = [
    "specializedEvent",
    "platformDiscussion",
    "digitalPaymentsPlatform",
    "enhancedAwareness",
    "paymentPlatform",
  ];
</script>

<template>
  <div id="different" class="relative">
    <h1 class="py-10 text-center text-4xl">{{ $t("different") }}</h1>
    <div class="flex flex-col items-center justify-around md:flex-row">
      <div class="flex w-full flex-col gap-3 md:flex-[0.5]">
        <div
          v-for="(reason, index) in reasons"
          :key="index"
          class="flex items-center gap-2 rounded-lg border border-[#68CBDE]/50 bg-[#68CBDE]/15 p-3 shadow-md shadow-[#68CBDE]/50 backdrop-blur-lg"
        >
          <div
            class="flex aspect-square flex-[0.1] items-center justify-center rounded-full bg-cyan-800 md:flex-[0.05]"
          >
            <div class="m-1 aspect-square w-full rounded-full bg-cyan-600 bg-gradient-to-t p-1 text-center">
              {{ index + 1 }}
            </div>
          </div>
          <h1 class="flex-[0.9] text-sm md:text-base">{{ $t(reason) }}</h1>
        </div>
      </div>

      <NuxtImg src="/lockimage.png" alt="lock" format="webp" class="mt-5 w-1/2 md:mt-0 md:flex-[0.2]" />
    </div>
    <circle
      class="absolute left-[25%] top-[90%] aspect-square w-1/2 rounded-full bg-[#68CBDE]/25 blur-[200px] lg:left-[70%] lg:top-[10%]"
    />
  </div>
</template>

<style lang="scss">
  #different {
    scroll-margin-top: 125px;
  }

  // @media (max-width: 768px) {
  //   #different h1 {
  //     font-size: 2rem;
  //   }

  //   #different .circle {
  //     left: 50%;
  //     top: 20%;
  //     width: 75%;
  //   }
  // }
</style>
