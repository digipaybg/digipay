<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import NumberFlow from "@number-flow/vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  label: string;
  value: number;
  trailing?: string;
  smaller?: boolean;
}>();

const count = ref(0);
const statRef = ref<HTMLElement | null>(null);
const visible = useElementVisibility(statRef, {
  threshold: 0.75,
});

watch(visible, () => {
  if (visible.value) {
    count.value = props.value;
  }
});
</script>

<template>
  <div ref="statRef" class="flex flex-col space-y-1 sm:space-y-2">
    <NumberFlow
      :value="count"
      :class="
        cn(
          'text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-foreground',
          { 'text-2xl sm:text-3xl lg:text-4xl': smaller },
        )
      "
      :suffix="trailing ?? ' +'"
    />
    <h2
      :class="
        cn('text-xl sm:text-2xl lg:text-4xl text-foreground/50 leading-tight', {
          'text-lg sm:text-xl lg:text-2xl': smaller,
        })
      "
    >
      {{ label }}
    </h2>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .number-flow {
    line-height: 1.2;
  }
}
</style>
