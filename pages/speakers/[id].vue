<script lang="ts" setup>
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const route = useRoute();
const { locale } = useI18n();
const { t } = useI18n();

const { data: speaker } = await useFetch<PageObjectResponse>(
  `/api/${locale.value}/speakers/${route.params.id}`,
);
const { data: blocks } = await useFetch<BlockObjectResponse[]>(
  `/api/${locale.value}/speakers/${route.params.id}/blocks`,
);

const name = computed(() => {
  const nameProp = speaker.value?.properties?.Name as
    | Extract<PageObjectResponse["properties"][string], { type: "title" }>
    | undefined;
  return nameProp?.title?.[0]?.plain_text || "Unknown Speaker";
});

const role = computed(() => {
  const roleProp = speaker.value?.properties?.Role as
    | Extract<PageObjectResponse["properties"][string], { type: "rich_text" }>
    | undefined;
  return roleProp?.rich_text?.[0]?.plain_text || "";
});

const picture = computed(() => {
  const pictureProp = speaker.value?.properties?.Picture as
    | Extract<PageObjectResponse["properties"][string], { type: "url" }>
    | undefined;
  return pictureProp?.url || "/18.png";
});

useHead({
  title: name.value,
  meta: [
    {
      name: "description",
      content: `${name.value} - ${role.value}`,
    },
    {
      property: "og:image",
      content: picture.value,
    },
  ],
});
</script>

<template>
  <div v-if="speaker" class="container mx-auto px-4 py-8 max-w-4xl">
    <div class="flex flex-col md:flex-row gap-8 mb-12">
      <img
        :src="picture"
        :alt="name"
        class="w-full md:w-1/3 rounded-lg object-cover aspect-[3/4]"
      />
      <div class="flex-1">
        <h1 class="text-4xl font-bold mb-4">{{ name }}</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">{{ role }}</p>
        <vue3-notion-render
          v-if="blocks"
          :blocks="blocks"
          class="notion-content"
        />
      </div>
    </div>
  </div>
  <div
    v-else
    class="container mx-auto px-4 py-8 text-center text-2xl font-bold"
  >
    Loading...
  </div>
</template>

<style scoped>
:deep(.notion-content) {
  font-size: 1.1rem;
  line-height: 1.75;
}

:deep(.notion-content p) {
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  :deep(.notion-page) {
    overflow-x: hidden;
  }
}
</style>
