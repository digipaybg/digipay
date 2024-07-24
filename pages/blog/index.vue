<script lang="ts" setup>
  import { formatDate } from "@vueuse/core";
  import getImagePath from "~/lib/getImagePathByName";

  const { locale } = useI18n();
  const { data: posts } = await useAsyncData("blogPosts", () =>
    queryContent("/blog")
      .locale(locale.value)
      .sort({
        date: -1,
        $numeric: true,
      })
      .find(),
  );

  useSeoMeta({
    title: "Blog",
    description: "Blog posts",
  });

  definePageMeta({
    layout: "blog",
  });

  const localePath = useLocalePath();
</script>

<template>
  <div class="relative flex h-fit flex-col space-y-8 overflow-x-hidden overflow-y-hidden p-4 sm:p-8 md:p-24 md:px-36">
    <h1 class="font-mono text-2xl sm:text-3xl md:text-5xl">{{ $t("blogTitle") }}</h1>

    <div v-if="posts" class="body-text space-y-10 tracking-wide">
      <NuxtLink :href="localePath(posts[0]._path!)">
        <div class="flex flex-col gap-4 rounded-xl p-4 transition-all hover:bg-white/25 lg:flex-row">
          <div class="flex-[1]">
            <NuxtImg
              class="h-auto max-h-[300px] w-full rounded-lg object-cover sm:max-h-[400px] md:max-h-[500px]"
              :src="posts[0].image"
              :alt="posts[0].title"
            />
          </div>

          <div class="flex flex-[1.3] flex-col">
            <div class="space-y-2">
              <h2 class="text-lg font-bold sm:text-xl md:text-2xl">{{ posts[0].title }}</h2>
              <p class="line-clamp-2 text-sm text-gray-400 sm:text-base md:text-lg">{{ posts[0].description }}</p>
            </div>
            <div class="space-y-3 pt-4 md:pt-6">
              <div class="flex gap-2">
                <p class="text-sm capitalize text-gray-400 sm:text-base md:text-lg">
                  {{
                    formatDate(new Date(posts[0].date as EpochTimeStamp), "DD MMMM YYYY", {
                      locales: locale,
                    })
                  }}
                </p>
                <p class="text-sm text-gray-400 sm:text-base md:text-lg">•</p>
                <p class="text-sm text-gray-400 sm:text-base md:text-lg">
                  {{ $t("readingTime", { minutes: Math.round(posts[0].readingTime.minutes) }) }}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <NuxtImg
                  class="rounded-full"
                  :src="getImagePath(posts[0].author)"
                  :alt="posts[0].author"
                  width="40"
                  height="40"
                />
                <h3 class="author-name text-base md:text-xl">{{ posts[0].author }}</h3>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
      <div v-if="posts.length > 1" class="">
        <h1 class="pb-6 font-mono text-xl tracking-wider sm:text-2xl md:pb-10 md:text-3xl">{{ $t("morePosts") }}</h1>
        <div class="grid w-full grid-flow-row grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <BlogCard v-for="post in posts.slice(1)" :key="post._id" :post="post" />
        </div>
      </div>
    </div>

    <circle
      class="absolute left-[-10%] top-[75%] z-[-100] hidden h-full w-1/2 rounded-full bg-[#68CBDE]/30 blur-[200px] lg:block"
    />
    <circle
      class="absolute right-[-25%] top-[-60%] z-[-100] hidden h-full w-1/2 rounded-full bg-[#68CBDE]/30 blur-[200px] lg:block"
    />
  </div>
</template>

<style lang="scss">
  .font-mono {
    font-family: "IBM Plex Mono", Courier, monospace;
  }

  .author-name {
    font-family: "IBM Plex Sans", sans-serif;
  }

  .body-text {
    font-family: "Arial", sans-serif;
  }

  @media (max-width: 768px) {
    .font-mono {
      font-size: 1.5rem;
    }

    .author-name {
      font-size: 1rem;
    }

    .body-text {
      font-size: 1rem;
    }

    .line-clamp-2 {
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
</style>
