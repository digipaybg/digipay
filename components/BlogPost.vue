<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
  PartialDatabaseObjectResponse,
  DatabaseObjectResponse,
  RichTextItemResponse,
  DatePropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  TextRichTextItemResponse,
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
    type: Object as PropType<PageObjectResponse>,
    required: true,
  },
});

const localePath = useLocalePath();

const cover = computed(() => {
  const imageProp = props.blog.properties.image as
    | Extract<PageObjectResponse["properties"][string], { type: "rich_text" }>
    | undefined;
  return imageProp?.rich_text?.[0]?.plain_text ?? "/18.png";
});

const title = computed(() => {
  const titleProp = props.blog.properties.title as
    | Extract<PageObjectResponse["properties"][string], { type: "title" }>
    | undefined;
  const firstTitleItem = titleProp?.title?.[0];
  if (firstTitleItem?.plain_text) {
    return firstTitleItem.plain_text;
  }
  return "Untitled";
});

const slug = computed(() => {
  const slugProp = props.blog.properties.slug as
    | Extract<PageObjectResponse["properties"][string], { type: "rich_text" }>
    | undefined;
  return slugProp?.rich_text?.[0]?.plain_text || "";
});

const date = computed(() => {
  const dateProp = props.blog.properties.date as
    | Extract<PageObjectResponse["properties"][string], { type: "date" }>
    | undefined;
  return dateProp?.date?.start || new Date();
});

const description = computed(() => {
  const descriptionProp = props.blog.properties.description as
    | Extract<PageObjectResponse["properties"][string], { type: "rich_text" }>
    | undefined;
  return descriptionProp?.rich_text?.[0]?.plain_text || "";
});
</script>

<template>
  <NuxtLink
    :to="localePath(`/blog/${slug}`)"
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
          {{ title }}
        </h1>
        <p class="text-gray-400 mt-2">
          {{ formatDate(new Date(date), "DD/MM/YYYY") }}
        </p>
        <p class="mt-2 text-gray-600">{{ description }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss"></style>
