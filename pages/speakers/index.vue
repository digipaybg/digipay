<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Speaker } from "lucide-vue-next";

const { locale } = useI18n();
const { data: speakers } = useFetch<{ results: PageObjectResponse[] }>(
  `/api/${locale.value}/speakers`,
);
const { t } = useI18n();

watch(speakers, (newSpeakers) => {
  console.log("Speakers data:", newSpeakers);
});

useHead({
  title: t("Navigation.speakers"),
});

definePageMeta({
  scrollToTop: true,
});

const localePath = useLocalePath();
const isMobile = useBreakpoints(breakpointsTailwind).isSmallerOrEqual("md");

useSeoMeta({
  ogTitle: t("Navigation.speakers"),
  ogDescription: t("Speaker.description") || "Latest Speakers from DIGIPAY",
  twitterTitle: t("Navigation.speakers"),
  title: t("Navigation.speakers"),
  description: t("Speakers.description") || "Latest Speakers from DIGIPAY",
});
</script>

<template>
  <div class="px-3 sm:px-6 lg:px-8">
    <div
      v-if="speakers"
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 mx-auto max-w-screen-2xl w-full"
    >
      <SpeakerCard
        v-for="speaker in speakers.results"
        :speaker="speaker"
        class="col-span-2 lg:col-span-1"
      />

      <div
        v-if="speakers.results.length === 0"
        class="col-span-full text-center py-10"
      >
        {{ t("Blog.noPublishedPosts") || "No published posts yet" }}
      </div>
    </div>
    <LoadingSpinner v-else />
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  :deep(.notion-page) {
    overflow-x: hidden;
  }
}
</style>
