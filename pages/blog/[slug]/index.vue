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

const data = await $notion.getPageBlocks(
  fetchedData.value?.id.replaceAll("-", ""),
);

const imageUrl: string =
  fetchedData.value.cover.type === "file"
    ? fetchedData.value.cover.file.url
    : fetchedData.value.cover.external.url;

definePageMeta({
  scrollToTop: true,
});
</script>

<template>
  <div>
    <div v-if="fetchedData && data" class="notion-page">
      <NuxtImg
        v-if="fetchedData.cover"
        :src="imageUrl"
        class="mx-auto rounded-2xl"
        alt="Cover image"
        width="1300"
        height="600"
        loading="lazy"
        preload
        format="webp"
        :modifiers="{ rotate: null }"
      />
      <h1 class="text-6xl font-bold my-8">
        {{ fetchedData.properties.title.title[0].text.content }}
      </h1>
      <NotionRenderer
        :blockMap="data"
        prism
        data-allow-mismatch
        class="*:!text-foreground"
        katex
        :imageOptions="{
          component: 'nuxt-img',
        }"
        :mapImageUrl="(imageUrl: String, block: any) => {
        if (block && block.type === 'cover') {
          console.log('cover', imageUrl);
          return imageUrl;
        }
        
        return imageUrl;
      }"
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
}
</style>
