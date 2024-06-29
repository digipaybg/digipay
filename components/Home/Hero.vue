<script lang="ts" setup>
  import SplitType from "split-type";

  const leftIcons = ["/planet.svg", "/money.svg", "/phone.svg"];
  const rightIcons = ["/ai.svg", "/security.svg", "/lock.svg"];

  onMounted(() => {
    animate(
      ".icon-cell",
      {
        y: [-800, 0],
      },
      {
        easing: spring({
          stiffness: 50,
          damping: 15,
          mass: 1,
        }),
        delay: stagger(0.2, {
          from: "first",
        }),
      },
    );

    animate(
      ".icon-cell-alternate",

      {
        y: [-800, 0],
      },
      {
        easing: spring({
          stiffness: 50,
          damping: 15,
          mass: 1,
        }),
        delay: stagger(0.2, {
          from: "first",
        }),
      },
    );

    const split = new SplitType(".header-text");

    animate(
      split.chars!,
      {
        y: [100, 0],
        opacity: [0, 1],
        scale: [0.7, 1],
      },
      {
        delay: stagger(0.1, {
          start: 0.1,
        }),
        easing: spring({
          stiffness: 100,
          damping: 15,
          mass: 1,
        }),
      },
    );
  });
</script>

<template>
  <div class="relative h-screen select-none">
    <NuxtImg
      preload
      src="/background.png"
      alt="Hero"
      class="absolute inset-0 left-1/2 top-0 -z-[99] h-screen w-screen -translate-x-1/2 bg-background object-cover opacity-50"
      quality="70"
      format="webp"
    />
    <div
      class="relative bottom-0 flex h-screen flex-col bg-gradient-to-t from-background from-10% to-transparent to-70%"
    >
      <div class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2">
        <div class="flex flex-col items-center gap-1">
          <div class="hero-text flex h-80 items-center justify-center gap-8">
            <Motion
              :initial="{
                scale: 0.6,
                opacity: 0,
              }"
              :animate="{
                scale: 1,
                opacity: 1,
              }"
              :transition="{
                easing: spring({
                  stiffness: 100,
                  damping: 10,
                  mass: 1,
                }),
              }"
            >
              <Logo class="h-[250px]" />
            </Motion>
            <div class="flex items-center">
              <h1 class="header-text text-[250px]">8</h1>
              <div class="flex flex-col">
                <h2 class="header-text h-16 text-[75px] font-bold">October</h2>
                <h3 class="header-text text-[130px] text-primary">2024</h3>
              </div>
            </div>
          </div>
          <Motion
            :initial="{
              opacity: 0,
              scale: 0.8,
              y: 25,
            }"
            :animate="{
              opacity: 1,
              scale: 1,
              y: 0,
            }"
            :transition="{
              delay: 0.5,
              easing: spring({
                stiffness: 100,
                damping: 10,
                mass: 1,
              }),
            }"
          >
            <h4 class="slogan text-3xl font-semibold uppercase">Your secure and convenient journey</h4>
          </Motion>

          <Motion
            :initial="{
              opacity: 0,
              scale: 0.8,
              y: 25,
            }"
            :animate="{
              opacity: 1,
              scale: 1,
              y: 0,
            }"
            :transition="{
              delay: 0.7,
              easing: spring({
                stiffness: 100,
                damping: 10,
                mass: 1,
              }),
            }"
            class="mt-20 flex flex-col items-center justify-center gap-2"
          >
            <Button variant="default" class="w-64 text-lg"> {{ $t("buyTicket") }} </Button>
            <h4>{{ $t("liveOrOnline") }}</h4>
          </Motion>
        </div>
        <div class="absolute left-[-26.5%] hidden flex-col gap-4 2xl:flex">
          <div
            v-for="(icon, index) in leftIcons"
            class="icon-cell relative h-20 w-20 bg-center bg-no-repeat"
            :class="`left-[-${index * 150}%]`"
            :style="{
              backgroundImage: `url(${icon})`,
            }"
          />
          <!-- <img src="/planet.svg" class="icon-cell relative left-[-150%]" />
          <img src="/planet.svg" class="icon-cell relative left-[-300%]" /> -->
        </div>

        <div class="absolute right-[-70%] hidden flex-col gap-4 2xl:flex">
          <div
            v-for="(icon, index) in rightIcons"
            class="icon-cell-alternate relative h-20 w-20 bg-center bg-no-repeat"
            :class="`left-[-${(2 - index) * 150}%]`"
            :style="{
              backgroundImage: `url(${icon})`,
            }"
          />
          <!-- <img src="/planet.svg" class="icon-cell-alternate relative left-[-300%]" />
          <img src="/money.svg" class="icon-cell-alternate relative left-[-150%]" />
          <img src="/planet.svg" class="icon-cell-alternate relative left-[-0%]" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .hero-text {
    font-family: "Bebas Neue";
  }

  .icon-cell,
  .icon-cell-alternate {
    border: 1px solid #fff;
    border-radius: 9999px;
    background-size: 50px;

    @apply p-3 backdrop-blur-md;
  }
</style>
