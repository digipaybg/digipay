<script lang="ts" setup>
  const files = useFetch("/api/testStatic", { method: "get" }).data;
</script>

<template>
  <div class="mx-10 grid grid-cols-1 gap-4 pt-32 md:grid-cols-2 lg:grid-cols-3">
    <NuxtImg
      format="webp"
      quality="60"
      v-for="file in files"
      :key="file"
      :src="`/gallery/${file}`"
      class="hover:shadow-[0px 0px 10px 0px rgba(#fff)] aspect-video rounded-2xl object-cover transition-all duration-300 ease-in-out hover:scale-[1.02]"
      priority
    />
  </div>
</template>

<style lang="scss"></style>
