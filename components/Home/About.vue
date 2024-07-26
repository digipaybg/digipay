<script lang="ts" setup>
  import { scroll } from "#imports";
  import { breakpointsTailwind } from "@vueuse/core";
  import SplitType from "split-type";

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
    const el = document.querySelector("#scrollContainer") as HTMLElement;

    const targets = [] as HTMLElement[];

    for (let j = 0; j < 6; j++) {
      const targetElements = document.querySelectorAll(`.row-${j}`);

      targetElements.forEach((target) => {
        targets.push(target as HTMLElement);
      });
    }

    const splitTitle = new SplitType("#aboutTitle");

    scroll(
      timeline(
        [
          [
            splitTitle.chars!,
            {
              y: [10, 0],
              opacity: [0, 1],
              scale: [0.7, 1],
            },
            {
              delay: stagger(0.05),
              easing: spring({
                stiffness: 100,
                damping: 10,
                mass: 0.7,
              }),
            },
          ],
          [
            targets,
            {
              y: [20, 0],
              opacity: [0, 1],
              scale: [0.7, 1],
              filter: ["blur(10px)", "blur(0px)"],
            },
            {
              delay: stagger(0.05, {
                from: "first",
              }),
              easing: spring({
                stiffness: 100,
                damping: 10,
                mass: 0.7,
              }),
              at: "0.2",
            },
          ],
        ],
        {},
      ),
      {
        target: el,
        axis: "y",
        smooth: 0.5,
        offset: ["start end", "-100px 0px"],
      },
    );
  });

  const breakpoints = useBreakpoints(breakpointsTailwind);
</script>

<template>
  <div id="" class="relative flex min-h-screen flex-col items-center justify-center gap-24 overflow-visible py-20">
    <h1 id="aboutTitle" class="mb-6 py-10 text-center text-2xl sm:text-3xl md:text-4xl">{{ $t("eventAbout") }}</h1>

    <!-- <div class="circle-background overflow-visible" /> -->
    <circle class="absolute left-[-15%] top-[45%] aspect-square w-1/2 rounded-full bg-[#27E076]/25 blur-[200px]" />

    <div id="scrollContainer" class="grid h-full w-full translate-x-24 grid-cols-1 lg:grid-cols-3 lg:gap-20">
      <div
        v-for="(col, index) in [firstCol, secondCol, thirdCol]"
        :key="index"
        class="flex flex-col justify-center"
        :class="{
          'scale-105': index === 1 && breakpoints.greaterOrEqual('lg').value,
        }"
      >
        <div v-for="(topic, jdex) in col" :key="jdex" class="relative pb-10" :class="`row-${jdex}`">
          <div class="absolute left-0 h-full w-[2px] bg-green-500/25" />
          <div class="absolute left-0 h-[30px] w-[2px] rounded-xl bg-green-500" />

          <Icon
            :name="topic.icon"
            mode="svg"
            size="50"
            class="relative left-0 h-1/2 border-l-[0px] border-green-500 pl-5"
          />
          <h4 class="topic-text h-full w-[65%] border-l-[0px] border-green-500/50 pl-5">{{ $t(topic.text) }}</h4>
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
