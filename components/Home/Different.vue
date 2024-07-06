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
  <div class="relative">
    <h1 class="pb-5 text-center text-4xl">Защо DigiPay се отличава?</h1>
    <div class="flex items-center justify-around">
      <div class="flex flex-[0.5] flex-col gap-3">
        <div
          v-for="(reason, index) in reasons"
          class="flex items-center gap-2 rounded-lg border border-[#68CBDE]/50 bg-[#68CBDE]/15 p-3 shadow-md shadow-[#68CBDE]/50 backdrop-blur-lg"
        >
          <!-- <Icon name="mdi:check" class="flex-[0.05] text-green-400" size="30" /> -->
          <div class="flex aspect-square flex-[0.05] items-center justify-center rounded-full bg-cyan-800">
            <div class="m-1 aspect-square w-full rounded-full bg-cyan-600 bg-gradient-to-t p-1 text-center">
              {{ index + 1 }}
            </div>
          </div>
          <h1 class="flex-[0.9]">{{ $t(reason) }}</h1>
        </div>
      </div>

      <NuxtImg src="/lockimage.png" alt="lock" format="webp" class="flex-[0.2]" />
    </div>
    <circle class="absolute left-[70%] top-[10%] aspect-square w-1/2 rounded-full bg-[#68CBDE]/25 blur-[200px]" />
  </div>
</template>

<style lang="scss"></style>
