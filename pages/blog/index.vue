<script lang="ts" setup>
const { data } = useFetch("/api/en/blog");

definePageMeta({
  scrollToTop: true,
});

const localePath = useLocalePath();
</script>

<template>
  <div>
    <div
      v-if="data"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="blog in data.results"
        :key="blog.id"
        class="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <!-- <NuxtImg
          :src="
            blog.cover.file.type === 'file'
              ? blog.cover.file.url
              : blog.cover.file.external.url
          "
          alt="cover"
          class="w-full h-64 object-cover object-center"
        /> -->
        <div class="p-4">
          <h1 class="text-2xl font-bold">{{ blog.title }}</h1>
          <p class="mt-2 text-gray-600">{{ blog.description }}</p>
          <div class="mt-4">
            <NuxtLink
              :to="
                localePath(
                  `/blog/${blog.properties.slug.rich_text[0].plain_text}`,
                )
              "
              class="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Read More
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
