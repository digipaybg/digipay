<script lang="ts" setup>
  definePageMeta({
    layout: "blog",
  });

  const { locale } = useI18n();
  const speakersContent = useAsyncData("speakersInfo", () => queryContent("speakers").locale(locale.value).find(), {
    lazy: true,
  });
</script>

<template>
  <div class="relative flex flex-col space-y-8 p-24 px-36">
    <h1 class="font-mono text-5xl">{{ $t("speakers") }}</h1>

    <div v-if="speakersContent.data">
      <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <SpeakerCard v-for="speaker in speakersContent.data.value" :key="speaker._id" :speaker="speaker" />
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
