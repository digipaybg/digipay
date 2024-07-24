<script lang="ts" setup>
  const yearsInfo = [
    {
      year: 2019,
      name: "Security of digital payments, Inter Expo Center",
      countInfo: {
        attendees: 100,
        speakers: 15,
        investors: 10,
      },
      partners: ["aceriBulgaria", "basscom", "bgFintech"],
    },
    {
      year: 2020,
      name: "DIGI PAY, Inter Expo Center",
      countInfo: {
        attendees: 170,
        speakers: 12,
        investors: 4,
      },
      partners: ["acfe", "basscom", "bgFintech"],
    },
    {
      year: 2021,
      name: "DIGI PAY, Inter Expo Center",
      countInfo: {
        attendees: 230,
        speakers: 23,
        investors: 15,
      },
      partners: ["acfe", "basscom", "bgFintech", "bea", "baseh"],
    },
    {
      year: 2022,
      name: "DIGI PAY, Inter Expo Center",
      countInfo: {
        attendees: 320,
        speakers: 16,
        investors: 15,
      },
      partners: ["acfe", "bgFintech", "bea", "baseh", "bsa"],
    },
    {
      year: 2023,
      name: "DIGI PAY, Inter Expo Center",
      countInfo: {
        attendees: 420,
        speakers: 26,
        investors: 18,
      },
      partners: ["aceriBulgaria", "bgFintech", "basscom", "bea", "safenet"],
    },
  ];
</script>

<template>
  <div id="pastYears" class="relative flex flex-col items-center justify-center px-4 py-8 lg:px-14 xl:px-8">
    <h1 class="mb-6 text-center text-2xl sm:text-3xl md:text-4xl">{{ $t("pastYears") }}</h1>
    <div class="flex w-full flex-col gap-6 sm:gap-8 md:gap-10 lg:w-3/4 xl:w-1/2">
      <PastYearCard v-for="year in yearsInfo" :key="year.year" :info="year" />
    </div>
    <circle class="absolute left-[5%] top-[10%] h-full w-1/2 rounded-full bg-[#27E076]/30 blur-[200px]" />
  </div>
</template>

<style lang="scss"></style>
