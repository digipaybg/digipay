<script lang="ts" setup>
const { $notion } = useNuxtApp();
const route = useRoute();

const {
  data: fetchedData,
  pending,
  error,
} = await useFetch(`/api/blog/${route.params.slug as string}`, {
  priority: "high",
});

const { data } = await useAsyncData("notion", () =>
  $notion.getPageBlocks(fetchedData.value.id.replaceAll("-", "")),
);

definePageMeta({
  scrollToTop: true,
});
</script>

<template>
  <div>
    <NotionRenderer
      v-if="data"
      :blockMap="data"
      fullPage
      prism
      data-allow-mismatch
      class="*:!text-foreground"
      katex
      :imageOptions="{
        component: 'nuxt-img',
      }"
      :mapImageUrl="(imageUrl: String, block: any) => {
        if (block.type === 'cover') {
          console.log('cover', imageUrl);
          return imageUrl;
        }
        

        return imageUrl;

      }"
    />

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
  width: 70%;
}
</style>
