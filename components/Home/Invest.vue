<script lang="ts" setup>
  const reasons = [
    {
      icon: "i-ph-handshake-bold",
      text: "showBetterClientSolutions",
    },
    {
      icon: "i-simple-icons-convertio",
      text: "convertToAdvantage",
    },
    {
      icon: "i-material-symbols-groups-outline-sharp",
      text: "customerTrainingMission",
    },
    {
      icon: "i-iconoir-credit-cards",
      text: "eventSpecializedSecurePayments",
    },
    {
      icon: "i-majesticons-creditcard-hand-line",
      text: "bankingAndFinTechSectorNameGenerator",
    },
  ];

  const firstRow = computed(() => {
    return reasons.slice(0, 3);
  });

  const secondRow = computed(() => {
    return reasons.slice(3);
  });
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center">
    <h1 class="py-10 text-center text-4xl">Защо да инвестирате в DIGI PAY?</h1>

    <div class="flex w-[75%] flex-col flex-wrap lg:gap-5">
      <div class="flex flex-col justify-center gap-5 lg:flex-row">
        <div v-for="(item, index) in firstRow" :key="index" class="cell">
          <LazyIconCSS :name="item.icon" size="50" class="text-green-500" />
          <h1 class="">
            {{ $t(item.text) }}
          </h1>
        </div>
      </div>
      <div class="flex flex-col justify-center gap-5 lg:flex-row">
        <div class="flex-[0.5]"></div>
        <div v-for="(item, index) in secondRow" :key="index" class="cell mx-auto">
          <LazyIconCSS :name="item.icon" size="50" class="text-green-500" />
          <h1 class="w-full">
            {{ $t(item.text) }}
          </h1>
        </div>
        <div class="flex-[0.5]"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .cell {
    // box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    @apply flex w-full flex-1 flex-col items-start gap-2 rounded-xl border border-green-500/50 bg-green-500/15 p-6 shadow-[0_0px_13px_0px_rgba(0,0,0,0.3)] shadow-green-500/50 backdrop-blur-lg;
  }
</style>
