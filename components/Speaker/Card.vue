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
    <!-- <NuxtImg
      :src="speaker.image"
      alt="speaker"
      format="webp"
      quality="50"
      class="aspect-square w-[70%] rounded-full object-cover object-top"
      :class="{ 'rounded-full': $route.path.split('/').at(-1) !== 'speakers' }"
    />
    <div class="flex-1 space-y-2 pt-5 text-center">
      <h1 class="font-sans text-2xl font-bold">
        {{ speaker.name }}
      </h1>
      <h2 class="flex-1 font-sans text-lg text-gray-400">{{ speaker.position }}</h2>
    </div> -->
    <NuxtImg
      :src="speaker.image"
      class="aspect-square h-60 rounded-full border-2 border-[#22c55e] object-cover object-top shadow-[0px_0px_10px_0px] shadow-[#22c55e]"
      format="webp"
      quality="30"
      :alt="$t(speaker.name)"
      loading="lazy"
    />
    <h3 class="text-xl font-bold">{{ $t(speaker.name) }}</h3>
    <p class="text-center text-gray-700 dark:text-gray-300">{{ $t(speaker.position) }}</p>
  </NuxtLink>
</template>
