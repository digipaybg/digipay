<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const { locale } = useI18n();
const { data } = useFetch<{ results: PageObjectResponse[] }>(
  `/api/${locale.value}/blog`,
);
const { t } = useI18n();

useHead({
  title: t("Navigation.blog"),
});

definePageMeta({
  scrollToTop: true,
});

const localePath = useLocalePath();
const isMobile = useBreakpoints(breakpointsTailwind).isSmallerOrEqual("md");
const filteredData = computed(() => {
  if (!data.value?.results) return [];

  const currentDate = new Date();
  return data.value.results.filter((blog) => {
    const date = blog.properties?.date?.date?.start;
    if (!date) return false;

    try {
      const blogDate = new Date(date);
      return blogDate <= currentDate;
    } catch (error) {
      console.error("Error parsing date:", date, error);
      return false;
    }
  });
});

const defaultOgImage = computed(() => {
  if (!filteredData.value?.[0]?.properties?.image?.rich_text?.[0]?.plain_text) {
    return "/18.png";
  }
  return `/blog/${filteredData.value[0].properties.image.rich_text[0].plain_text}`;
});

useSeoMeta({
  ogImage: {
    url: defaultOgImage.value,
    width: 1200,
    alt: t("Navigation.blog"),
  },
  ogTitle: t("Navigation.blog"),
  ogDescription: t("Blog.description") || "Latest blog posts from DIGIPAY",
  twitterTitle: t("Navigation.blog"),
  title: t("Navigation.blog"),
  description: t("Blog.description") || "Latest blog posts from DIGIPAY",
});

useHead({
  title: t("Navigation.blog"),
  meta: [
    {
      name: "description",
      content: t("Blog.description") || "Latest blog posts from DIGIPAY",
    },
    {
      name: "image",
      property: "og:image",
      content: defaultOgImage.value,
    },
  ],
});
</script>

<template>
  <div class="px-3 sm:px-6 lg:px-8">
    <div
      v-if="data"
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 mx-auto max-w-screen-2xl w-full"
    >
      <BlogPost
        v-if="filteredData.length > 0"
        :blog="filteredData[0]"
        :is-row="!isMobile"
        class="col-span-2 lg:col-span-3 sm:is-row mb-2 sm:mb-0"
      />

      <BlogPost
        v-for="blog in filteredData.slice(1)"
        :key="blog.id"
        :blog="blog"
        class="col-span-2 lg:col-span-1"
      />

      <div
        v-if="filteredData.length === 0"
        class="col-span-full text-center py-10"
      >
        {{ t("Blog.noPublishedPosts") || "No published posts yet" }}
      </div>
    </div>
    <div
      v-else
      class="max-w-screen-2xl text-lg sm:text-4xl font-bold mx-auto flex items-center justify-center min-h-[120px] sm:min-h-[200px]"
    >
      Loading...
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  :deep(.notion-page) {
    overflow-x: hidden;
  }
}
</style>
