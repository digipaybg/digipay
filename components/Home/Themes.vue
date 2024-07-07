<script lang="ts" setup>
  const themes = [
    { theme: "instantPayments", icon: "mdi:credit-card-fast" },
    { theme: "paymentScam", icon: "mdi:credit-card-fast" },
    { theme: "cloudInnovationsForFinance", icon: "mdi:credit-card-fast" },
    { theme: "antiMoneyLaunderingMeasures", icon: "mdi:credit-card-fast" },
    { theme: "userPaymentAI", icon: "mdi:credit-card-fast" },
    { theme: "foreignQuotaEntry", icon: "mdi:credit-card-fast" },
  ];
  import { scroll } from "motion";

  onMounted(() => {
    const items = document.querySelectorAll(".cell")!;
    const target = document.querySelector(".card")!;

    scroll(
      timeline(
        [
          [
            ".card",
            {
              scale: [0.7, 1],
              opacity: [0, 1],
              y: [100, 0],
            },
            {},
          ],
          [
            ".cell",
            {
              y: [100, 0],
              opacity: [0, 1],
              scale: [0.7, 1],
            },
            {
              delay: stagger(0.1, {
                from: "first",
              }),
              easing: spring({
                stiffness: 100,
                damping: 15,
              }),
            },
          ],
        ],
        {},
      ),
      {
        target: target,
        axis: "y",
        smooth: 0.5,
        offset: ["center end", "center 300px"],
      },
    );
  });
</script>

<template>
  <div class="flex h-[75vh] flex-col items-center justify-center" id="themes">
    <h1 class="font-sans text-4xl font-bold">Топ темите 2024</h1>
    <div
      :initial="{
        scale: 0.7,
        opacity: 0,
      }"
      :in-view="{
        scale: 1,
        opacity: 1,
      }"
      class="card my-20 flex h-fit w-2/3 items-center justify-center rounded-xl bg-card/25 p-8"
    >
      <div class="inline-grid grid-cols-3 grid-rows-2">
        <div
          class="cell flex h-full flex-col items-start justify-center border border-gray-300 p-4"
          v-for="(theme, index) in themes"
          :class="{
            'border-t-0': index < 3 || index >= 3,
            'border-b-0': index >= 3,
            'border-l-0': index === 0 || index === 3,
            'border-r-0': true,
          }"
          :key="index"
        >
          <Icon :name="theme.icon" class="h-10 w-10" />
          <h1 class="text-md">{{ $t(theme.theme) }}</h1>
        </div>
      </div>
    </div>
    <h2>400+ Участника</h2>
  </div>
</template>

<style lang="scss">
  border {
  }
</style>
