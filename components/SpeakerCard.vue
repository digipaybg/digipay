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
  const nameProp = props.speaker.properties.Name as
    | Extract<PageObjectResponse["properties"][string], { type: "title" }>
    | undefined;
  return nameProp?.title?.[0]?.plain_text || "Unknown Speaker";
});

const role = computed(() => {
  const roleProp = props.speaker.properties.Role as
    | Extract<PageObjectResponse["properties"][string], { type: "rich_text" }>
    | undefined;
  return roleProp?.rich_text?.[0]?.plain_text || "";
});

const picture = computed(() => {
  const pictureProp = props.speaker.properties.Picture as
    | Extract<PageObjectResponse["properties"][string], { type: "url" }>
    | undefined;
  return pictureProp?.url || "/18.png";
});
</script>

<template>
  <NuxtLink :to="localePath(`/speakers/${speaker.id}`)" class="block">
    <div
      :class="
        cn(
          'flex flex-col gap-4 items-start w-full h-full hover:bg-white/15 p-4 rounded-xl transition-all duration-300 ease-out shadow-none hover:-translate-y-2 hover:shadow-[0px_5px_10px_0px] hover:shadow-border',
          { 'md:flex-row md:gap-8': isRow },
        )
      "
    >
      <img
        :src="picture"
        :alt="name"
        :class="
          cn('w-full aspect-video object-cover rounded-lg', {
            'md:w-2/5 md:aspect-[3/4]': isRow,
          })
        "
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
