<script lang="ts" setup>
  import { animate, spring, stagger } from "motion";
  import SplitType from "split-type";

  const upcomingTitleRef = ref();
  const heroTitleRef = ref();
  const heroDescriptionRef = ref();

  const buyTicketButton = ref<HTMLElement>();
  const learnMoreButton = ref<HTMLElement>();

  onMounted(() => {
    const upcomingTitleSplit = new SplitType(upcomingTitleRef.value);
    const heroTitleSplit = new SplitType(heroTitleRef.value);
    const heroDescriptionSplit = new SplitType(heroDescriptionRef.value);

    console.log(upcomingTitleSplit, heroTitleSplit, heroDescriptionSplit);

    const instance = animate(
      upcomingTitleSplit.chars!.concat(
        heroTitleSplit.lines!,
        heroDescriptionSplit.lines!,
        buyTicketButton.value!,
        learnMoreButton.value!,
      ),
      {
        y: [25, 0],
        opacity: [0, 1],
      },
      {
        delay: stagger(0.05),
        easing: spring({
          stiffness: 100,
          damping: 10,
          mass: 0.7,
        }),
      },
    );
  });
</script>

<template>
  <!-- <div
    class="flex min-h-[80vh] flex-col items-center justify-center gap-3 bg-gradient-to-b from-violet-900/50 to-background to-70%"
  >
    <h3 class="text-xl">{{ $t("date") }}</h3>
    <h1 class="text-5xl">
      Digi<strong class="bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text text-transparent">Pay</strong>
    </h1>
    <h2 class="text-3xl">{{ $t("conference") }} 2024</h2>
  </div> -->
  <div class="relative mt-52 flex min-h-screen flex-col justify-around bg-gradient-to-b lg:mt-0 lg:flex-row">
    <div class="flex flex-1 flex-col gap-3 self-center px-24">
      <p class="text-2xl font-semibold uppercase text-purple-600 dark:text-purple-400" ref="upcomingTitleRef">
        {{ $t("upcoming") }}
      </p>
      <h1 class="text-6xl font-bold uppercase" ref="heroTitleRef">{{ $t("heroTitle") }}</h1>
      <h2 class="text-xl" ref="heroDescriptionRef">
        {{ $t("heroDescription") }}
      </h2>
      <div class="mt-5 flex gap-5">
        <div ref="buyTicketButton">
          <Button variant="default">{{ $t("buyTicket") }}</Button>
        </div>
        <div ref="learnMoreButton">
          <Button variant="secondary">{{ $t("learnMore") }}</Button>
        </div>
      </div>
    </div>
    <div
      class="relative flex h-[90vh] flex-1 justify-center overflow-hidden rounded-bl-2xl bg-gradient-to-br from-pink-600 to-purple-600"
    >
      <NuxtImg src="/file.png" alt="Hero" class="absolute bottom-0 h-[90%] grayscale lg:left-32" format="webp" />

      <Motion
        :initial="{
          x: 300,
          opacity: 0,
        }"
        :animate="{
          x: 0,
          opacity: 1,

          transition: {
            easing: spring({
              damping: 10,
              stiffness: 100,
              mass: 0.7,
            }),
          },
        }"
        class="absolute bottom-0 right-0 flex w-96 flex-col gap-3 rounded-tl-2xl bg-popover/50 p-8 backdrop-blur-lg"
      >
        <h1>{{ $t("date") }}</h1>
        <h1 class="text-3xl font-bold tracking-wide">DigiPay</h1>

        <Separator class="" />

        <div class="flex">
          <Icon name="carbon:location" class="h-6 w-6" />
          <p class="ml-2">{{ $t("location") }}</p>
        </div>

        <div class="flex">
          <Icon name="carbon:calendar" class="h-6 w-6" />
          <p class="ml-2">{{ $t("date") }}</p>
        </div>
      </Motion>
    </div>
  </div>
</template>

<style lang="scss"></style>
