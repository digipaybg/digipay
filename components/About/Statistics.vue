<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import NumberFlow from "@number-flow/vue";

const props = defineProps<{
  label: string;
  value: number;
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
  <div ref="statRef" class="-space-y-2">
    <NumberFlow
      :value="count"
      class="text-5xl font-bold text-accent-foreground"
      suffix=" +"
    />
    <h2 class="text-4xl text-primary-foreground/50">{{ label }}</h2>
  </div>
</template>
