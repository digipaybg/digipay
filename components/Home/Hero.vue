<script lang="ts" setup>
  import { animate, spring, stagger } from "motion";
  import SplitType from "split-type";

  const upcomingTitleRef = ref();
  const heroTitleRef = ref();
  const heroDescriptionRef = ref();

  const buyTicketButton = ref<HTMLElement>();
  const learnMoreButton = ref<HTMLElement>();

  const hide = ref(true);

  onMounted(() => {
    const upcomingTitleSplit = new SplitType(upcomingTitleRef.value);
    const heroTitleSplit = new SplitType(heroTitleRef.value);
    const heroDescriptionSplit = new SplitType(heroDescriptionRef.value);

    console.log(upcomingTitleSplit, heroTitleSplit, heroDescriptionSplit);

    hide.value = false;
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
  <div class="relative h-screen">
    <NuxtImg
      preload
      src="/background.png"
      alt="Hero"
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      class="absolute inset-0 top-0 -z-[99] h-screen w-[200vw] bg-background opacity-50"
      quality="70"
      format="webp"
    />
    <div class="relative bottom-0 h-screen bg-gradient-to-t from-background from-15% to-transparent to-50%"></div>
  </div>
</template>

<style lang="scss"></style>
