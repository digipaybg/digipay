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
  <div class="flex flex-col space-y-8 p-24 px-36">
    <h1 class="font-mono text-5xl">{{ $t("blogTitle") }}</h1>

    <div v-if="posts" class="body-text space-y-10 tracking-wide">
      <NuxtLink :href="localePath(posts[0]._path!)">
        <div class="flex gap-4 rounded-xl p-4 transition-all hover:bg-white/25">
          <NuxtImg class="flex-[1] rounded-lg" :src="posts[0].image" :alt="posts[0].title" />

          <div class="flex flex-[1.3] flex-col">
            <div class="space-y-2">
              <h2 class="text-2xl font-bold">{{ posts[0].title }}</h2>
              <p class="line-clamp-2 text-lg text-gray-400">{{ posts[0].description }}</p>
            </div>
            <div class="space-y-3 pt-6">
              <div class="flex gap-2">
                <p class="text-lg capitalize text-gray-400">
                  {{
                    formatDate(new Date(posts[0].date as EpochTimeStamp), "DD MMMM YYYY", {
                      locales: locale,
                    })
                  }}
                </p>
                <p class="text-lg text-gray-400">•</p>
                <p class="text-lg text-gray-400">
                  {{ $t("readingTime", { minutes: Math.round(posts[0].readingTime.minutes) }) }}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <NuxtImg
                  class="rounded-full"
                  :src="getImagePath(posts[0].author)"
                  :alt="posts[0].author"
                  width="50"
                  height="50"
                />
                <h3 class="author-name text-xl">{{ posts[0].author }}</h3>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
      <div v-if="posts.length > 1" class="">
        <h1 class="font-mono text-3xl tracking-wider">{{ $t("morePosts") }}</h1>
        <div class="grid w-full grid-flow-row grid-cols-3 gap-6">
          <NuxtLink
            v-for="(post, index) in posts.slice(1)"
            :key="index"
            :href="post._path"
            class="flex flex-col rounded-xl p-4 transition-all hover:bg-white/25"
          >
            <NuxtImg class="flex-[1] rounded-lg" :src="post.image" :alt="post.title" />
            <div class="space-y-2 pt-5">
              <h1 class="text-xl font-bold">{{ post.title }}</h1>
              <h2 class="line-clamp-2 text-xl text-gray-400">{{ post.description }}</h2>
            </div>

            <div class="space-y-3 pt-6">
              <div class="flex gap-2">
                <p class="text-lg capitalize text-gray-400">
                  {{
                    formatDate(new Date(post.date as EpochTimeStamp), "DD MMMM YYYY", {
                      locales: locale,
                    })
                  }}
                </p>
                <p class="text-lg text-gray-400">•</p>
                <p class="text-lg text-gray-400">
                  {{ $t("readingTime", { minutes: Math.round(post.readingTime.minutes) }) }}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <NuxtImg
                  class="rounded-full"
                  :src="getImagePath(post.author)"
                  :alt="post.author"
                  width="50"
                  height="50"
                />
                <h3 class="author-name text-lg">{{ post.author }}</h3>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
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
</style>
