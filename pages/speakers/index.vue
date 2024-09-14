<script lang="ts" setup>
  const { locale } = useI18n();
  const speakersContent = useAsyncData("speakersInfo", () => queryContent("speakers").locale(locale.value).find(), {
    lazy: false,
  });

  definePageMeta({
    layout: "default",
  });

  const speakersComputed = computed(() => {
    if (!speakersContent.data.value) return [];

    return speakersContent.data.value.sort((a, b) => a.order - b.order).filter((speaker) => !speaker.moderator);
  });

  const moderators = computed(() => {
    if (!speakersContent.data.value) return [];

    return speakersContent.data.value.filter((speaker) => speaker.moderator).sort((a, b) => a.order - b.order);
  });
</script>

<template>
  <div class="relative flex flex-col space-y-8 p-4 sm:p-8 md:p-24 md:px-36 md:pt-32">
    <div v-if="speakersContent.data">
      <div class="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <SpeakerCard v-for="speaker in speakersComputed" :key="speaker._id" :speaker="speaker" />
      </div>
      <h1 class="py-10 font-mono text-3xl font-bold">{{ $t("moderators") }}</h1>
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <SpeakerCard v-for="speaker in moderators" :key="speaker._id" :speaker="speaker" />
      </div>
    </div>
  </div>
</template>
