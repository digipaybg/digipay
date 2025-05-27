<script lang="ts" setup>
const route = useRoute();
const { $notion } = useNuxtApp();
const { locale } = useI18n();

// Define a more specific type for the expected page structure from the API
interface NotionProperty {
  type: string;
  rich_text?: Array<{ plain_text?: string; text?: { content?: string } }>;
  title?: Array<{ text?: { content?: string } }>;
  files?: Array<{ type: 'external' | 'file'; external?: { url?: string }; file?: { url?: string } }>;
  url?: string;
  
  [key: string]: any; // Allow other properties
}

interface FetchedPageData {
  id: string;
  properties: Record<string, NotionProperty | undefined>;
}

const {
  data: fetchedData,
  pending,
  // status, // status is not used in the provided snippet
  error,
} = await useFetch<FetchedPageData>(`/api/${locale.value}/blog/${route.params.slug as string}`);

if (error.value && process.client) { // Access .value for refs
  console.error('Fetch error:', error.value);
}

// const data = await $notion.getPageBlocks(
//   fetchedData.value?.id.replaceAll("-", ""),
// );
const { data } = await useAsyncData(`notion-${route.params.slug}`, async () => {
  const page = fetchedData.value;

  if (error.value || !page || typeof page.id !== 'string') {
    if (process.client) {
      console.warn('Skipping Notion blocks fetch: Initial page data is missing, malformed, or fetch failed.', {
        error: error.value,
        pageId: page?.id,
        pageType: typeof page?.id,
        fetchedData: page,
      });
    }
    return {}; // Return empty object instead of null
  }
  
  if (process.client) {
    console.log('Attempting to fetch Notion blocks for page ID:', page.id.replaceAll("-", ""));
  }
  const blocks = await $notion.getPageBlocks(page.id.replaceAll("-", ""));
  
  if (process.client) {
    console.log('Raw blocks from $notion.getPageBlocks:', JSON.parse(JSON.stringify(blocks))); // Log a clone
  }

  if (!blocks || (typeof blocks === 'object' && Object.keys(blocks).length === 0)) {
      if (process.client) {
        
        console.warn('No blocks returned from $notion.getPageBlocks or blocks object is empty.');
      }
      return {}; // Return empty object
  }

  try {
    // Ensure the data is a POJO to prevent stringify errors
    const parsedBlocks = JSON.parse(JSON.stringify(blocks));
    if (process.client) {
      console.log('Parsed blocks for NotionRenderer:', JSON.parse(JSON.stringify(parsedBlocks))); // Log a clone
      if (Object.keys(parsedBlocks).length === 0 && Object.keys(blocks).length > 0) {
          console.warn('Parsed blocks became an empty object, but raw blocks were not. Check stringify/parse process.');
      }
    }
    return parsedBlocks;
  } catch (e) {
    if (process.client) {
      console.error("Failed to stringify/parse Notion blocks:", e);
    }
    return {}; // Return empty object on error
  }
});

const cover = computed(() => {
  const page = fetchedData.value;
  if (error.value || !page || !page.properties) {
    return "/18.png"; // Default image
  }

  const imageProp = page.properties.image;

  if (!imageProp) return "/18.png";

  // Check for 'files' type (common for cover images in Notion)
  if (imageProp.type === 'files' && Array.isArray(imageProp.files) && imageProp.files.length > 0) {
    const firstFile = imageProp.files[0];
    if (firstFile.type === 'external' && firstFile.external?.url) {
      return firstFile.external.url;
    }
    if (firstFile.type === 'file' && firstFile.file?.url) {
      return firstFile.file.url;
    }
  }

  // Check for 'rich_text' type (e.g., URL stored in rich text)
  if (imageProp.type === 'rich_text' && Array.isArray(imageProp.rich_text) && imageProp.rich_text.length > 0) {
    return imageProp.rich_text[0]?.plain_text || "/18.png";
  }
  
  // Check for 'url' type
  if (imageProp.type === 'url' && typeof imageProp.url === 'string') {
    return imageProp.url || "/18.png";
  }

  return "/18.png"; // Default fallback
});

const title = computed(() => {
  const page = fetchedData.value;
  if (error.value || !page || !page.properties) {
    return "Untitled";
  }
  const titleProp = page.properties.title;
  if (titleProp && titleProp.type === 'title' && Array.isArray(titleProp.title) && titleProp.title.length > 0) {
    return titleProp.title[0]?.text?.content || "Untitled";
  }
  return "Untitled";
});

const description = computed(() => {
  const page = fetchedData.value;
  if (error.value || !page || !page.properties) {
    return "";
  }
  const descriptionProp = page.properties.description;
  if (descriptionProp && descriptionProp.type === 'rich_text' && Array.isArray(descriptionProp.rich_text) && descriptionProp.rich_text.length > 0) {
    return descriptionProp.rich_text[0]?.plain_text || "";
  }
  return "";
});

useSeoMeta({
  ogImage: { url: `/blog/${cover.value}`, width: 1200, alt: title.value },
  ogTitle: title.value,
  ogDescription: description.value,
  twitterTitle: title.value,
  title: title.value,
  description: description.value,
});

useHead({
  meta: [
    {
      name: "description",
      content:
        "DIGIPAY 2025 is a conference in Bulgaria that brings together the best experts in the field of digital payments.",
    },
    {
      name: "image",
      property: "og:image",
      content: `/blog/${cover.value}`,
    },
  ],
});

definePageMeta({
  scrollToTop: true,
});

const isLoading = computed(
  () => pending.value || !fetchedData.value || !data.value,
);

if (process.client) {
  watchEffect(() => {
    console.log('Final data for NotionRenderer (data.value):', data.value ? JSON.parse(JSON.stringify(data.value)) : data.value);
    console.log('isLoading state:', isLoading.value);
    console.log('pending.value:', pending.value);
    console.log('fetchedData.value exists:', !!fetchedData.value);
    console.log('data.value exists:', !!data.value);
    if (data.value && typeof data.value === 'object') {
      console.log('data.value keys:', Object.keys(data.value).length);
    }
  });
}
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div v-if="!isLoading" class="notion-page">
      <NuxtImg
        :src="`/blog/${cover}`"
        preload
        class="w-full aspect-video object-cover rounded-lg mx-auto"
        alt="Cover image"
        loading="eager"
        decoding="async"
      />
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold my-4 sm:my-8">
        {{ title }}
      </h1>
      <NotionRenderer
        v-if="data"
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