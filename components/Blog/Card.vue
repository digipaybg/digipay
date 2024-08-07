<script lang="ts" setup>
  import type { ParsedContent } from "@nuxt/content";
  import { formatDate } from "@vueuse/core";
  import getImagePath from "~/lib/getImagePathByName";

  defineProps<{ post: ParsedContent }>();

  const { locale } = useI18n();
  const localePath = useLocalePath();
</script>

<template>
  <NuxtLink :href="localePath(post._path!)" class="flex flex-col rounded-xl p-4 transition-all hover:bg-white/25">
    <NuxtImg
      class="aspect-video flex-[1] rounded-lg object-cover"
      format="webp"
      quality="80"
      :src="post.image"
      :alt="post.title"
    />
    <div class="flex-1 space-y-2 pt-5">
      <h1 class="line-clamp-2 text-xl font-bold">{{ post.title }}</h1>
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
    </div>
  </NuxtLink>
</template>

<style lang="scss"></style>
