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
    const dateProp = blog.properties.date as
      | Extract<PageObjectResponse["properties"][string], { type: "date" }>
      | undefined;
    const date = dateProp?.date?.start;
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
  const firstBlog = filteredData.value?.[0];
  if (!firstBlog) return "/18.png";

  if (firstBlog.cover?.type === "file") {
    return firstBlog.cover?.file?.url ?? "/18.png";
  }

  if (firstBlog.cover?.type === "external") {
    return firstBlog.cover?.external?.url ?? "/18.png";
  }

  return "/18.png";
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
        :index="0"
        class="col-span-2 lg:col-span-3 sm:is-row mb-2 sm:mb-0"
      />

      <BlogPost
        v-for="(blog, index) in filteredData.slice(1)"
        :key="blog.id"
        :blog="blog"
        :index="index"
        class="col-span-2 lg:col-span-1"
      />

      <div
        v-if="filteredData.length === 0"
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
