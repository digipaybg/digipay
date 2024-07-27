<script lang="ts" setup>
  import SplitType from "split-type";

  const reasons = [
    "specializedEvent",
    "platformDiscussion",
    "digitalPaymentsPlatform",
    "enhancedAwareness",
    "paymentPlatform",
  ];

  onMounted(() => {
    const splitTitle = new SplitType("#differentTitle");
    const wrapper = document.querySelector("#differentWrapper")!;
    inView(wrapper, (entry) => {
      if (entry.isIntersecting) {
        timeline([
          [
            splitTitle.chars!,
            {
              y: [10, 0],
              opacity: [0, 1],
              scale: [0.7, 1],
            },
            {
              delay: stagger(0.035),
              easing: spring({
                stiffness: 100,
                damping: 10,
                mass: 0.5,
              }),
            },
          ],
          [
            ".different-row",
            {
              y: [20, 0],
              opacity: [0, 1],
              scale: [0.7, 1],
              filter: ["blur(10px)", "blur(0px)"],
            },
            {
              delay: stagger(0.1, {
                from: "first",
              }),
              easing: spring({
                stiffness: 100,
                damping: 10,
                mass: 0.5,
              }),
            },
          ],
          [
            "#imgLock",
            {
              opacity: [0, 1],
              scale: [0.7, 1],
              filter: ["blur(10px)", "blur(0px)"],
            },
            {
              duration: 2,
              easing: spring({
                stiffness: 100,
                damping: 10,
                mass: 0.5,
              }),
              at: "<",
            },
          ],
        ]);
      }
    });
  });
</script>

<template>
  <div id="different" class="relative">
    <div id="differentWrapper">
      <h1 id="differentTitle" class="mb-6 py-10 text-center text-2xl sm:text-3xl md:text-4xl">{{ $t("different") }}</h1>
      <div id="differentScrollContainer" class="flex flex-col items-center justify-around lg:flex-row">
        <div class="flex w-full flex-col gap-6 lg:flex-[0.5] lg:gap-4">
          <div
            v-for="(reason, index) in reasons"
            :key="index"
            class="different-row flex items-center gap-2 rounded-lg border border-[#68CBDE]/50 bg-[#68CBDE]/15 p-3 shadow-md shadow-[#68CBDE]/50 backdrop-blur-lg"
          >
            <div
              class="flex aspect-square h-full w-full flex-[0.1] items-center justify-center rounded-full bg-cyan-800 md:flex-[0.05]"
            >
              <div class="m-1 aspect-square w-full rounded-full bg-cyan-600 bg-gradient-to-t p-1 text-center">
                {{ index + 1 }}
              </div>
            </div>
            <h1 class="flex-[0.9] text-sm lg:text-base">{{ $t(reason) }}</h1>
          </div>
        </div>

        <NuxtImg id="imgLock" src="/lockimage.png" alt="lock" format="webp" class="mt-5 w-1/2 lg:mt-0 lg:flex-[0.2]" />
      </div>
    </div>
    <circle
      class="absolute left-[25%] top-[90%] aspect-square w-1/2 rounded-full bg-[#68CBDE]/25 blur-[200px] lg:left-[70%] lg:top-[10%]"
    />
  </div>
</template>

<style lang="scss">
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
