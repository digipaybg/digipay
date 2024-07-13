<script setup lang="ts">
  /**
   * @credits Full Stack Heroes <https://fullstackheroes.com/>
   */

  const props = withDefaults(
    defineProps<{
      title?: string;
      position?: string;
    }>(),
    {
      title: "title",
      position: "position",
    },
  );

  const titleComputed = computed(() => props.title.split("|")[0]);
</script>

<template>
  <div class="relative flex h-full w-full items-start justify-start bg-[#0c0427]">
    <div
      class="absolute right-0 top-0 h-full w-full overflow-visible"
      :style="{
        background: 'radial-gradient(circle, rgba(61,221,120,1) 0%, rgba(12,4,39,1) 100%)',
      }"
    />
    <!-- #3ddd78 -->

    <div class="flex h-full items-start justify-start">
      <div class="flex h-full w-full flex-col justify-between p-20">
        <Logo class="h-[70px] w-[70px] justify-self-start text-white" />
        <div class="flex flex-1 flex-col justify-end">
          <h1 class="text-left text-[60px] font-bold text-white">
            {{ titleComputed }}
          </h1>
          <h1 class="text-left text-[30px] font-bold text-white">
            {{ position }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
