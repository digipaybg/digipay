<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
  PartialDatabaseObjectResponse,
  DatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { formatDate } from "@vueuse/core";
import type { PropType } from "vue";
import { computed } from "vue";

const props = defineProps({
  isRow: {
    type: Boolean,
    default: false,
  },
  blog: {
    type: Object as PropType<
      | PageObjectResponse
      | PartialPageObjectResponse
      | PartialDatabaseObjectResponse
      | DatabaseObjectResponse
    >,
    required: true,
  },
});

const localePath = useLocalePath();

const cover = computed(() => {
  if (!props.blog.properties.image.rich_text[0].plain_text) return "/18.png";

  return props.blog.properties.image.rich_text[0].plain_text;
});
</script>

<template>
  <NuxtLink
    :to="localePath(`/blog/${blog.properties.slug.rich_text[0].plain_text}`)"
    :class="cn({ 'col-span-3': isRow })"
  >
    <div
      :class="
        cn(
          'flex flex-col gap-4 items-start w-full h-full hover:bg-white/15 p-4 rounded-xl transition-all duration-300 ease-out shadow-none hover:-translate-y-3 hover:shadow-[0px_5px_10px_0px] hover:shadow-border hover:gap-6',
          { 'flex-row gap-8 hover:gap-10': isRow },
        )
      "
    >
      <NuxtImg
        :src="`/blog/${cover}`"
        preload
        alt="cover"
        :class="
          cn('w-full aspect-video object-cover rounded-lg', { 'w-2/5': isRow })
        "
        :modifiers="{ rotate: null }"
      />
      <div class="flex-1 flex flex-col">
        <h1
          :class="
            cn('text-2xl font-semibold flex-1', {
              'text-4xl': isRow,
            })
          "
        >
          {{ blog.properties.title.title[0].text.content }}
        </h1>
        <p class="text-gray-400 mt-2">
          {{
            formatDate(new Date(blog.properties.date.date.start), "DD/MM/YYYY")
          }}
        </p>
        <p class="mt-2 text-gray-600">{{ blog.description }}</p>
        <!-- <div class="mt-4">Read More</div> -->
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss"></style>
