<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { PropType } from "vue";

const props = defineProps({
  speaker: {
    type: Object as PropType<PageObjectResponse>,
    required: true,
  },
  isRow: {
    type: Boolean,
    default: false,
  },
});

const localePath = useLocalePath();

const name = computed(() => {
  const nameProp = props.speaker.properties.name as
    | Extract<PageObjectResponse["properties"][string], { type: "title" }>
    | undefined;
  return nameProp?.title?.[0]?.plain_text || "Unknown Speaker";
});

const role = computed(() => {
  const roleProp = props.speaker.properties.position as
    | Extract<PageObjectResponse["properties"][string], { type: "rich_text" }>
    | undefined;
  return roleProp?.rich_text?.[0]?.plain_text || "";
});

const picture = computed(() => {
  const imageProp = props.speaker.properties.image as
    | Extract<PageObjectResponse["properties"][string], { type: "rich_text" }>
    | undefined;
  const imageFileName = imageProp?.rich_text?.[0]?.plain_text;

  if (!imageFileName) {
    return "/18.png";
  }
  return `/speakers/${imageFileName}`;
});

const slug = computed(() => {
  const slugProp = props.speaker.properties.slug as
    | Extract<PageObjectResponse["properties"][string], { type: "rich_text" }>
    | undefined;
  return slugProp?.rich_text?.[0]?.plain_text || props.speaker.id;
});
</script>

<template>
  <NuxtLink :to="localePath(`/speakers/${slug}`)" class="block">
    <div
      :class="
        cn(
          'flex flex-col gap-4 items-start w-full h-full hover:bg-white/15 p-4 rounded-xl transition-all duration-300 ease-out shadow-none hover:-translate-y-2 hover:shadow-[0px_5px_10px_0px] hover:shadow-border',
          { 'md:flex-row md:gap-8': isRow },
        )
      "
    >
      <NuxtImg
        :src="picture"
        :alt="name"
        preload
        :class="
          cn('w-full aspect-[1] object-cover object-right-top rounded-lg', {
            'md:w-2/5 md:aspect-[3/4]': isRow,
          })
        "
        :modifiers="{ rotate: null }"
      />
      <div class="flex-1 flex flex-col">
        <h2
          :class="
            cn('text-xl font-semibold flex-1', {
              'text-3xl': isRow,
            })
          "
        >
          {{ name }}
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mt-2">{{ role }}</p>
      </div>
    </div>
  </NuxtLink>
</template>
