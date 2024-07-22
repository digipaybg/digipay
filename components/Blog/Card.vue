<script lang="ts" setup>
  import type { ParsedContent } from "@nuxt/content";
  import { formatDate } from "@vueuse/core";
  import getImagePath from "~/lib/getImagePathByName";

  defineProps<{ post: ParsedContent }>();

  const { locale } = useI18n();
</script>

<template>
  <NuxtLink :href="post._path" class="flex flex-col rounded-xl p-4 transition-all hover:bg-white/25">
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
        <NuxtImg class="rounded-full" :src="getImagePath(post.author)" :alt="post.author" width="50" height="50" />
        <h3 class="author-name text-lg">{{ post.author }}</h3>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss"></style>
