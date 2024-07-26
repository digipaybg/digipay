<script lang="ts" setup>
  definePageMeta({
    layout: "blog",
  });

  const { locale } = useI18n();
  const speakersContent = useAsyncData("speakersInfo", () => queryContent("speakers").locale(locale.value).find(), {
    lazy: true,
  });

  const speakersComputed = computed(() => {
    if (!speakersContent.data) return [];

    const arrCopy = speakersContent.data.value;

    return arrCopy?.sort((a, b) => a.order - b.order);
  });
</script>

<template>
  <div class="relative flex flex-col space-y-8 p-4 sm:p-8 md:p-24 md:px-36">
    <h1 class="font-mono text-3xl uppercase sm:text-4xl md:text-5xl">{{ $t("speakers") }}</h1>

    <div v-if="speakersContent.data">
      <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <SpeakerCard v-for="speaker in speakersComputed" :key="speaker._id" :speaker="speaker" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .font-mono {
    font-family: "IBM Plex Mono", Courier, monospace;
  }
</style>
