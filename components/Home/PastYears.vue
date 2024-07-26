<script lang="ts" setup>
  import { scroll } from "#imports";
  import SplitType from "split-type";

  const yearsInfo = [
    {
      year: 2019,
      name: "Security of digital payments Inter Expo Center",
      countInfo: {
        attendees: 100,
        speakers: 15,
        investors: 10,
      },
      partners: ["acfe", "basscom", "bgFintech"],
    },
    {
      year: 2020,
      name: "DIGIPAY, Inter Expo Center",
      countInfo: {
        attendees: 170,
        speakers: 12,
        investors: 4,
      },
      partners: ["acfe", "basscom", "bgFintech"],
    },
    {
      year: 2021,
      name: "DIGIPAY, Inter Expo Center",
      countInfo: {
        attendees: 230,
        speakers: 23,
        investors: 15,
      },
      partners: ["acfe", "basscom", "bgFintech", "bea", "baseh"],
    },
    {
      year: 2022,
      name: "DIGIPAY, Inter Expo Center",
      countInfo: {
        attendees: 320,
        speakers: 16,
        investors: 15,
      },
      partners: ["acfe", "bgFintech", "bea", "baseh", "bsa"],
    },
    {
      year: 2023,
      name: "DIGIPAY, Inter Expo Center",
      countInfo: {
        attendees: 420,
        speakers: 26,
        investors: 18,
      },
      partners: ["aceriBulgaria", "bgFintech", "basscom", "bea", "safenet"],
    },
  ];
  onMounted(() => {
    const target = document.querySelector("#pastYears")!;

    const splitTitle = new SplitType("#pastYearsTitle")!;
    const targets = document.querySelectorAll(".year-card")!;

    scroll(
      timeline([
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
              mass: 0.5,
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
      ]),
      {
        target,
        smooth: 1,
        axis: "y",
        offset: ["start end", "0px 0px"],
      },
    );
  });
</script>

<template>
  <div id="pastYears" class="relative flex flex-col items-center justify-center px-4 py-8 lg:px-14 xl:px-8">
    <h1 id="pastYearsTitle" class="mb-6 py-10 text-center text-2xl sm:text-3xl md:text-4xl">{{ $t("pastYears") }}</h1>
    <div class="flex w-full flex-col gap-6 sm:gap-8 md:gap-10 lg:w-3/4 xl:w-1/2">
      <PastYearCard v-for="year in yearsInfo.reverse()" :key="year.year" :info="year" class="year-card" />
    </div>
    <circle class="absolute left-[5%] top-[10%] h-full w-1/2 rounded-full bg-[#27E076]/30 blur-[200px]" />
  </div>
</template>

<style lang="scss"></style>
