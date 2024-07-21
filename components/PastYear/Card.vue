<script lang="ts" setup>
  defineProps({
    info: {
      type: Object as () => {
        year: number;
        name: string;
        countInfo: {
          attendees: number;
          speakers: number;
          investors: number;
        };
        partners: string[];
      },
      required: true,
    },
  });
</script>

<template>
  <div
    class="flex w-full items-center justify-between rounded-2xl border border-white p-8 backdrop-blur-lg backdrop-saturate-[1.4]"
  >
    <div class="mr-10 flex flex-[1.2] flex-col justify-between">
      <h1 class="year-text text-[70px] font-bold tracking-wide text-primary">{{ info.year }}</h1>
      <h2 class="text-lg">{{ info.name }}</h2>
    </div>
    <div class="flex-1 space-y-4">
      <div class="">
        <h2 class="font-bold text-primary">{{ info.countInfo.attendees }}</h2>
        <h3>{{ $t("attendees") }}</h3>
      </div>
      <div class="">
        <h2 class="font-bold text-primary">{{ info.countInfo.speakers }}</h2>
        <h3>{{ $t("speakers") }}</h3>
      </div>
      <div class="">
        <h2 class="font-bold text-primary">{{ info.countInfo.investors }}</h2>

        <h3>{{ $t("investors") }}</h3>
      </div>
    </div>
    <div class="flex-[1.5] gap-2">
      <h1>{{ $t("partners") }}</h1>

      <div class="flex h-max flex-col gap-[4px] text-center">
        <h5 v-for="partner in info.partners" :key="partner" class="text-balance text-primary">
          {{ $t(partner) }}
        </h5>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .year-text {
    font-family: "Bebas Neue";
  }
</style>
