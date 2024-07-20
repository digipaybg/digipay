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
  <div class="relative flex flex-col items-center justify-center">
    <h1 class="mb-12 text-center text-4xl">{{ $t("pastYears") }}</h1>
    <div class="flex w-1/2 flex-col gap-10">
      <PastYearCard v-for="year in yearsInfo" :key="year.year" :info="year" />
    </div>

    <circle class="absolute left-[5%] top-[10%] h-full w-1/2 rounded-full bg-[#27E076]/30 blur-[200px]" />
  </div>
</template>

<style lang="scss"></style>
