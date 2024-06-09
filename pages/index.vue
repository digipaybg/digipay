<script lang="ts" setup>
  definePageMeta({
    layout: "default",
  });

  const scrollContainer = useState<HTMLElement | null>("scrollContainer", () => null);
</script>

<template>
  <div class="flex flex-col overflow-x-hidden" ref="scrollContainer">
    <HomeHero />

    <HomePartners />

    <div
      v-for="index in 150"
      class="my-5 h-20 w-20 self-center bg-slate-400"
      v-motion
      :initial="{
        opacity: 0.8,
        scale: 0,
      }"
      :visible="{
        opacity: 1,
        scale: [0, 1.25, 1], // [initial, mid, final
        // rotate: [0, 360, 0],

        transition: {
          duration: 450,
          type: 'spring',
          stiffness: 100,
          damping: 10,
        },
      }"
    />
  </div>
</template>

<style lang="scss"></style>
