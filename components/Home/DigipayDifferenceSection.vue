<script lang="ts" setup>
import { cn } from "@/lib/utils";

const diffs = [1, 2, 3, 4, 5].map((i) => `DigipayDifference.differences.${i}`);
</script>

<template>
  <div class="mt-32">
    <LetterPullup
      text-class="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold z-20 mt-8 sm:mt-32 mb-4 sm:mb-10 "
      container-class="mb-10 justify-center"
      :words="$t('DigipayDifference.title')"
      :initial-delay="0"
      key="digipay-difference"
    />

    <div class="flex flex-col gap-4 md:gap-0">
      <DifferenceItem
        v-for="(diff, index) in diffs"
        :key="index"
        :index="index"
        :diff="diff"
      />
    </div>
  </div>
</template>

<style lang="scss"></style>
