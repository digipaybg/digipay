<script lang="ts" setup>
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/vue";

const props = defineProps<{
  year: {
    year: number;
    subtitle: string;
    participants: number;
    speakers: number;
    partners: number;
  };
  bentoSpan: string;
}>();

const yearBoxRef = ref<HTMLElement | null>(null);
const visible = useElementVisibility(yearBoxRef, {
  threshold: 0.75,
});

const year = ref(0);
const participants = ref(0);
const speakers = ref(0);
const partners = ref(0);

watch(visible, () => {
  if (visible.value) {
    year.value = props.year.year;
    participants.value = props.year.participants;
    speakers.value = props.year.speakers;
    partners.value = props.year.partners;
  }
});
</script>

<template>
  <div
    ref="yearBoxRef"
    :class="
      cn(
        'rounded-xl p-6 hover:scale-105 transition-all bg-muted shadow-lg shadow-muted/50 flex flex-col justify-between',
        bentoSpan,
      )
    "
  >
    <div class="">
      <NumberFlow
        :value="year"
        class="text-2xl font-bold text-primary"
        :format="{
          useGrouping: false,
        }"
      />
      <p class="text-gray-600 text-sm mt-1">{{ props.year.subtitle }}</p>
    </div>
    <div class="mt-4 space-y-2 font-semibold flex flex-col">
      <NumberFlow
        :value="participants"
        :suffix="$t('OtherYears.participants')"
      />
      <NumberFlow :value="speakers" :suffix="$t('OtherYears.speakers')" />
      <NumberFlow :value="partners" :suffix="$t('OtherYears.partners')" />
    </div>
  </div>
</template>

<style lang="scss"></style>
