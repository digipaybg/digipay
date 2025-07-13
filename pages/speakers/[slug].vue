<script lang="ts" setup>
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const route = useRoute();
const { locale } = useI18n();
const { t } = useI18n();

const { data: speaker } = await useFetch<PageObjectResponse>(
  `/api/${locale.value}/speakers/${route.params.slug}`,
);
const { data: blocks } = await useFetch<BlockObjectResponse[]>(
  `/api/${locale.value}/speakers/${route.params.slug}/blocks`,
);

const name = computed(() => {
  const nameProp = speaker.value?.properties?.name as
    | Extract<PageObjectResponse["properties"][string], { type: "title" }>
    | undefined;
  return nameProp?.title?.[0]?.plain_text || "Unknown Speaker";
});

const role = computed(() => {
  const roleProp = speaker.value?.properties?.position as
    | Extract<PageObjectResponse["properties"][string], { type: "rich_text" }>
    | undefined;
  return roleProp?.rich_text?.[0]?.plain_text || "";
});

const picture = computed(() => {
  const page = speaker.value;
  if (
    page?.cover &&
    typeof page.cover === "object" &&
    "type" in page.cover &&
    page.cover.type === "file"
  ) {
    return (page.cover as any).file?.url ?? "/18.png";
  }

  if (
    page?.cover &&
    typeof page.cover === "object" &&
    "type" in page.cover &&
    page.cover.type === "external"
  ) {
    return (page?.cover as any).external?.url ?? "/18.png";
  }

  return "/18.png";
});

const slug = computed(() => {
  const slugProp = speaker.value?.properties?.slug as
    | Extract<PageObjectResponse["properties"][string], { type: "rich_text" }>
    | undefined;
  return slugProp?.rich_text?.[0]?.plain_text || route.params.slug;
});

const linkedinUrl = computed(() => {
  const linkedinProp = speaker.value?.properties?.linkedin as
    | Extract<PageObjectResponse["properties"][string], { type: "url" }>
    | undefined;
  return linkedinProp?.url || null;
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
    {
      property: "og:url",
      content: `${useRuntimeConfig().public.siteUrl || ""}/speakers/${
        slug.value
      }`,
    },
  ],
});
</script>

<template>
  <div v-if="speaker" class="container mx-auto px-4 py-8 max-w-5xl">
    <div class="flex flex-col md:flex-row gap-8 mb-12">
      <div class="md:w-1/3">
        <img
          :src="picture"
          :alt="name"
          class="w-full aspect-[1] object-cover object-right-top rounded-lg md:sticky md:top-32"
        />
      </div>
      <div class="flex-1">
        <div class="flex items-center justify-between gap-4 mb-4">
          <h1 class="text-4xl font-bold">{{ name }}</h1>
          <a
            v-if="linkedinUrl"
            :href="linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-10 h-10 text-white hover:text-blue-400 rounded-full transition-colors duration-200"
            :aria-label="`${name} LinkedIn profile`"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </a>
        </div>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">{{ role }}</p>
        <CustomNotionRenderer
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
