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
</script>

<template>
  <div>
    <div v-if="fetchedData && data" class="notion-page">
      <img
        v-if="fetchedData.cover && imageUrl"
        :src="imageUrl"
        class="aspect-video object-cover rounded-lg mx-auto"
        alt="Cover image"
        preload
      />
      <h1 class="text-5xl font-bold my-8">
        {{ fetchedData.properties.title.title[0].text.content }}
      </h1>
      <NotionRenderer
        :blockMap="data"
        prism
        data-allow-mismatch
        class="*:!text-foreground w-full"
        katex
      />
    </div>

    <div v-else>Loading...</div>
  </div>
</template>

<style lang="scss">
.notion-page-cover {
  max-width: 90%;
  height: auto;
  display: block;
  margin-inline: auto;
  margin-top: 20px;
  margin-bottom: -100px;
  border-radius: 20px;
}

.notion-page {
  border-radius: 20px;
  backdrop-filter: blur(10px);
  background-color: var(--background) / 50;
  padding: 5rem;
  margin-inline: auto;
  width: 60%;

  span {
    font-size: 1.2rem;
  }

  h2 {
    span {
      font-size: 2rem !important;
    }
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  img {
    @apply rounded-xl w-full aspect-video object-cover;
  }
}

// .notion-row {
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;

//   .notion-asset-wrapper {
//     width: 25% !important;
//     height: auto;
//     display: block;
//     margin-inline: auto;
//     margin-top: 20px;
//     margin-bottom: -100px;
//     border-radius: 20px;

//     img {
//       border-radius: 100%;
//       aspect-ratio: 1;
//       height: auto;
//       width: 25%;
//     }
//   }
// }
</style>
