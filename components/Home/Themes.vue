<script lang="ts" setup>
  import { scroll } from "motion";
  const themes = [
    { theme: "instantPayments", icon: "mdi:credit-card-fast" },
    { theme: "paymentScam", icon: "mdi:credit-card-fast" },
    { theme: "cloudInnovationsForFinance", icon: "mdi:credit-card-fast" },
    { theme: "antiMoneyLaunderingMeasures", icon: "mdi:credit-card-fast" },
    { theme: "userPaymentAI", icon: "mdi:credit-card-fast" },
    { theme: "foreignQuotaEntry", icon: "mdi:credit-card-fast" },
  ];

  onMounted(() => {
    const target = document.querySelector(".card")!;
    const container = document.querySelector("#themes")!;

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
        offset: ["end end", "500px 0px"],
      },
    );
  });
</script>

<template>
  <div id="themes" class="flex h-[75vh] flex-col items-center justify-center">
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
          v-for="(theme, index) in themes"
          :key="index"
          class="cell flex h-full flex-col items-start justify-center border border-gray-300 p-4"
          :class="{
            'border-t-0': index < 3 || index >= 3,
            'border-b-0': index >= 3,
            'border-l-0': index === 0 || index === 3,
            'border-r-0': true,
          }"
        >
          <Icon :name="theme.icon" class="h-10 w-10" />
          <h1 class="text-md">{{ $t(theme.theme) }}</h1>
        </div>
      </div>
    </div>
    <h2>400+ Участника</h2>
  </div>
</template>
