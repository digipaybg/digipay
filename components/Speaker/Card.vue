<script lang="ts" setup>
  import type { ParsedContent } from "@nuxt/content";

  defineProps<{
    speaker: ParsedContent;
  }>();

  const localePath = useLocalePath();
</script>

<template>
  <NuxtLink
    :href="localePath(speaker._path ?? '/speakers')"
    class="flex h-[500px] flex-col items-center gap-6 rounded-xl p-4 transition-all hover:bg-white/25"
  >
    <NuxtImg
      :src="speaker.image"
      alt="speaker"
      format="webp"
      quality="50"
      class="aspect-square w-[70%] rounded-2xl object-cover object-top"
      :class="{ 'rounded-full': $route.path.split('/').at(-1) !== 'speakers' }"
    />
    <div class="flex-1 space-y-2 pt-5 text-center">
      <h1 class="text-xl font-bold">{{ speaker.name }}</h1>
      <h2 class="flex-1 text-lg">{{ speaker.position }}</h2>
    </div>
  </NuxtLink>
</template>

<style lang="scss"></style>
