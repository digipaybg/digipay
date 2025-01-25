<script lang="ts" setup>
const route = useRoute();
const { $notion } = useNuxtApp();
const { locale } = useI18n();

const {
  data: fetchedData,
  pending,
  status,
  error,
} = await useFetch(`/api/${locale.value}/blog/${route.params.slug as string}`);

if (error) {
  console.error(error);
}

// const data = await $notion.getPageBlocks(
//   fetchedData.value?.id.replaceAll("-", ""),
// );
const { data } = await useAsyncData(`notion-${route.params.slug}`, () =>
  $notion.getPageBlocks(fetchedData.value?.id.replaceAll("-", "")),
);

const imageUrl = computed(() => {
  if (!fetchedData.value?.cover) return null;
  return fetchedData.value.cover.type === "file"
    ? fetchedData.value.cover.file.url
    : fetchedData.value.cover.external.url;
});

useHead({
  title: fetchedData.value?.properties.title.title[0].text.content,
});

defineOgImage({
  url: imageUrl.value,
  alt: fetchedData.value?.properties.title.title[0].text.content,
  cacheMaxAgeSeconds: 60 * 60 * 24 * 365,
});

definePageMeta({
  scrollToTop: true,
});

const isLoading = computed(
  () => pending.value || !fetchedData.value || !data.value,
);
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div v-if="!isLoading" class="notion-page">
      <img
        v-if="fetchedData.cover && imageUrl"
        :src="imageUrl"
        class="w-full aspect-video object-cover rounded-lg mx-auto"
        alt="Cover image"
        loading="eager"
        decoding="async"
      />
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold my-4 sm:my-8">
        {{ fetchedData.properties.title.title[0].text.content }}
      </h1>
      <NotionRenderer
        :blockMap="data"
        prism
        data-allow-mismatch
        class="*:!text-foreground w-full notion-content"
        katex
      />
    </div>

    <div v-else class="animate-pulse space-y-4 notion-page">
      <div class="w-full aspect-video bg-muted rounded-lg"></div>
      <div class="h-8 bg-muted rounded w-3/4"></div>
      <div class="space-y-3">
        <div class="h-4 bg-muted rounded w-full"></div>
        <div class="h-4 bg-muted rounded w-5/6"></div>
        <div class="h-4 bg-muted rounded w-4/6"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.notion-page {
  border-radius: 12px;
  backdrop-filter: blur(10px);
  background-color: var(--background) / 50;
  padding: 0.75rem;
  margin-inline: auto;
  width: 100%;

  @media (min-width: 640px) {
    padding: 2rem;
    width: 90%;
  }

  @media (min-width: 1024px) {
    padding: 5rem;
    width: 80%;
  }

  @media (min-width: 1280px) {
    width: 60%;
  }

  span {
    font-size: 0.95rem;
    line-height: 1.6;
    @media (min-width: 640px) {
      font-size: 1.2rem;
    }
  }

  h2 {
    span {
      font-size: 1.25rem !important;
      @media (min-width: 640px) {
        font-size: 2rem !important;
      }
    }
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
  }

  img {
    @apply rounded-lg sm:rounded-xl w-full aspect-video object-cover;
    height: auto;
  }
}

.notion-content {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  pre {
    max-width: 100%;
    overflow-x: auto;
    padding: 0.75rem;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    -webkit-overflow-scrolling: touch;
    @apply sm:text-base;
  }

  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    max-width: 100%;
    font-size: 0.875rem;
    @apply sm:text-base;
  }

  blockquote {
    padding: 0.5rem 1rem;
    @apply sm:p-4;
  }
}
</style>
