<script lang="ts" setup>
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// Define interfaces for API responses
interface NotionPageResponse {
  id: string;
  properties: {
    title: {
      title: Array<{ plain_text: string }>;
    };
    image: {
      rich_text: Array<{ plain_text: string }>;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface BlogBlocksResponse {
  blocks: BlockObjectResponse[];
}

const route = useRoute();
const { locale } = useI18n();

const {
  data: fetchedData,
  pending,
  // status, // status is not used in the provided snippet
  error: pageError, // Renamed for clarity
} = await useFetch<NotionPageResponse>(
  `/api/${locale.value}/blog/${route.params.slug as string}`,
);

if (pageError.value && process.client) {
  // Access .value for refs // Use renamed pageError
  console.error("Fetch error:", pageError.value); // Use renamed pageError
}

const {
  data: blocksData,
  error: blocksError, // Renamed for clarity
} = await useFetch<BlogBlocksResponse>(
  `/api/${locale.value}/blog/${route.params.slug as string}/pageblocks`,
);

const { data } = await useAsyncData(
  `notion-${route.params.slug as string}`,
  async () => {
    const page = fetchedData.value;

    if (pageError.value || !page || typeof page.id !== "string") {
      console.warn(
        "Skipping Notion blocks fetch: Initial page data is missing, malformed, or fetch failed.",
        {
          error: pageError.value,
          pageId: page?.id,
          pageType: typeof page?.id,
          fetchedData: page,
        },
      );

      return []; // Return empty array instead of null
    }

    if (blocksError.value) {
      console.error("Blocks fetch error:", blocksError.value);
    }

    return blocksData.value || []; // Return blocks data or empty array
  },
);

// Create a computed property for the blocks
const blocks = computed(() => {
  if (!data.value || !Array.isArray(data.value)) {
    return [];
  }

  return data.value;
});

const cover = computed(() => {
  const page = fetchedData.value;
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

const title = computed(() => {
  const page = fetchedData.value;
  if (pageError.value || !page || !page.properties) {
    // Changed error.value to pageError.value
    return "Untitled";
  }
  const titleProp = page.properties.title.title[0]?.plain_text;

  return titleProp || "Untitled";
});

useSeoMeta({
  ogImage: { url: `/blog/${cover.value}`, width: 1200, alt: title.value },
  ogTitle: title.value,
  ogDescription: title.value,
  twitterTitle: title.value,
  title: title.value,
  description: title.value,
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
  () =>
    pending.value || !cover.value || !title.value || blocks.value.length === 0,
);

// Additional safety check for valid blocks
const hasValidBlocks = computed(() => {
  return blocks.value && blocks.value.length > 0;
});
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div v-if="!isLoading" class="notion-page">
      <img
        :src="cover"
        preload
        class="w-full aspect-video object-cover rounded-lg mx-auto"
        alt="Cover image"
        loading="eager"
        decoding="async"
      />
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold my-4 sm:my-8">
        {{ title }}
      </h1>
      <CustomNotionRenderer
        v-if="hasValidBlocks"
        :blocks="blocks"
        class="w-full notion-content"
      />
    </div>

    <div v-else class="animate-pulse space-y-4 notion-page">
      <div class="w-full aspect-video bg-muted rounded-lg mx-auto"></div>
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
    border-radius: 0.5rem;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    height: auto;
  }

  @media (min-width: 640px) {
    img {
      border-radius: 0.75rem;
    }
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
  }

  @media (min-width: 640px) {
    pre {
      font-size: 1rem;
    }
  }

  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    max-width: 100%;
    font-size: 0.875rem;
  }

  @media (min-width: 640px) {
    table {
      font-size: 1rem;
    }
  }

  blockquote {
    padding: 0.5rem 1rem;
  }

  @media (min-width: 640px) {
    blockquote {
      padding: 1rem;
    }
  }
}
</style>
