<script lang="ts" setup>
import { cn } from "@/lib/utils";

const diffs = [1, 2, 3, 4, 5, 6].map(
  (i) => `DigipayDifference.differences.${i}`,
);
</script>

<template>
  <div class="">
    <h1
      class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mt-32 mb-10"
    >
      {{ $t("DigipayDifference.title") }}
    </h1>

    <div class="flex flex-col">
      <div
        :class="cn('flex', index % 2 === 0 ? 'flex-row' : 'flex-row-reverse')"
        v-for="(diff, index) in diffs"
        :key="index"
      >
        <div
          :class="
            cn(
              'flex-[2] flex items-center justify-center relative rounded-[50px] overflow-hidden',
              index % 2 === 0 ? 'rounded-r-none' : 'rounded-l-none',
            )
          "
        >
          <NuxtImg
            :src="`/differences/difference-${index + 1}.jpg`"
            :alt="$t(diff)"
            class="w-full aspect-video object-cover"
            format="webp"
            preload
            placeholder
          />
          <div
            class="absolute inset-0 bg-gradient-to-br from-blue-700/30 via-green-500/30 to-purple-400/30"
          />
        </div>
        <div
          :class="
            cn(
              'flex-[1]  rounded-[50px] aspect-video flex flex-col  justify-between p-16',
              index % 2 === 0
                ? 'bg-secondary rounded-l-none'
                : 'bg-muted rounded-r-none',
            )
          "
        >
          <h3 class="text-5xl font-bold">
            {{ index + 1 }}
          </h3>
          <p class="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold">
            {{ $t(diff) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
