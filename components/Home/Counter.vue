<script lang="ts" setup>
  const countToDate = new Date("2024-10-08T09:00:00+03:00");
  const currentTime = ref(new Date());

  onMounted(() => {
    setInterval(() => {
      currentTime.value = new Date();
    }, 1000);
  });
</script>

<template>
  <div class="flex flex-col items-center gap-4 lg:flex-row">
    <h1
      class="grid grid-cols-2 gap-4 text-center text-[24px] font-bold capitalize text-primary lg:grid-cols-4 lg:text-[35px] xl:text-[65px]"
    >
      <div>
        <span class="block">
          {{ Math.floor((countToDate.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)) }}
        </span>
        <span class="block text-[18px] lg:text-[24px]">
          {{ $t("days") }}
        </span>
      </div>

      <div>
        <span class="block">
          {{ Math.floor(((countToDate.getTime() - currentTime.getTime()) / (1000 * 60 * 60)) % 24) }}
        </span>
        <span class="block text-[18px] lg:text-[24px]">
          {{ $t("hours") }}
        </span>
      </div>

      <div>
        <span class="block">
          {{ Math.floor(((countToDate.getTime() - currentTime.getTime()) / (1000 * 60)) % 60) }}
        </span>
        <span class="block text-[18px] lg:text-[24px]">
          {{ $t("minutes") }}
        </span>
      </div>

      <div>
        <span class="block">
          {{ Math.floor(((countToDate.getTime() - currentTime.getTime()) / 1000) % 60) }}
        </span>
        <span class="block text-[18px] lg:text-[24px]">
          {{ $t("seconds") }}
        </span>
      </div>
    </h1>
  </div>
</template>
