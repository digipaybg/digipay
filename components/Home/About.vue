<script lang="ts" setup>
  import { scroll } from "#imports";

  const firstCol = [
    {
      icon: "i-material-symbols-lock",
      text: "secureDigitalPayments",
    },
    {
      icon: "i-ph-briefcase-fill",
      text: "newBusinessModelsInPayments",
    },
    {
      icon: "i-material-symbols-id-card-outline",
      text: "identityManagement",
    },
    {
      icon: "i-ph-device-mobile-bold",
      text: "electronicSignatureSolutions",
    },
    {
      icon: "i-material-symbols-cloud",
      text: "cloudTechnologies",
    },
  ];

  const secondCol = [
    {
      icon: "i-fluent-payment-wireless-16-filled",
      text: "paymentMobileApps",
    },
    {
      icon: "i-mdi-bank-outline",
      text: "openBankingAndRealTimePayments",
    },
    {
      icon: "i-material-symbols-euro",
      text: "europeanRegulations",
    },
    {
      icon: "i-material-symbols-credit-card-outline",
      text: "paymentInfrastructureModernization",
    },
    {
      icon: "i-hugeicons-ai-brain-04",
      text: "machineLearning",
    },
    {
      icon: "i-material-symbols-rocket-launch",
      text: "newTechnologyTrends",
    },
  ];

  const thirdCol = [
    {
      icon: "i-mdi-scale-balance",
      text: "fraudDetection",
    },
    {
      icon: "i-ph-hand-coins",
      text: "antiMoneyLaunderingSolutions",
    },
    {
      icon: "i-material-symbols-fingerprint",
      text: "dataSecurity",
    },
    {
      icon: "i-simple-icons-hive-blockchain",
      text: "blockchain",
    },
  ];

  onMounted(() => {
    let el = document.querySelector("#scrollContainer") as HTMLElement;

    scroll(
      animate(
        ".row",
        {
          y: [100, 0],
          opacity: [0, 1],
        },
        {},
      ),
      {
        container: el,
        offset: ["start center", "center end"],
      },
    );
  });
</script>

<template>
  <div class="relative flex h-screen flex-col items-center justify-center gap-24 overflow-visible py-20">
    <h1 class="py-10 text-center text-4xl">Защо DigiPay се отличава?</h1>

    <!-- <div class="circle-background overflow-visible" /> -->
    <circle class="absolute left-[-15%] top-[33%] aspect-square w-1/2 rounded-full bg-[#27E076]/25 blur-[200px]" />
    <!-- Radial gradient -->

    <div class="flex w-[80%] items-center justify-evenly" id="scrollContainer">
      <div
        class="flex flex-1 flex-col"
        :class="{ 'scale-105 px-5': index == 1 }"
        v-for="(col, index) in [firstCol, secondCol, thirdCol]"
      >
        <div class="row relative pb-10" v-for="topic in col">
          <div class="absolute left-0 h-full w-[2px] bg-green-500/25" />
          <div class="absolute left-0 h-[30px] w-[2px] rounded-xl bg-green-500" />

          <Icon :name="topic.icon" size="50" class="relative left-0 h-1/2 border-l-[0px] border-green-500 pl-5" />
          <h4 class="h-full w-[90%] border-l-[0px] border-green-500/50 pl-5">{{ $t(topic.text) }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .circle-background {
    background: radial-gradient(circle, #27e076 0%, #27e076 50%, #27e076 100%);
    width: 50%;
    aspect-ratio: 0.8;
    position: absolute;
    top: 25%;
    left: -10%;
    z-index: -1;
    border-radius: 50%;
    filter: blur(200px);
    opacity: 25%;
    // absolute top-1/4 left-[-10%] w-1/2 aspect-[0.8] bg-radial-gradient-to-br from-[#27e076] via-[#27e076] to-[#27e076] blur-[200px] opacity-25
  }
</style>
