<script lang="ts" setup>
const { locale } = useI18n();
const { data } = useFetch(`/api/${locale.value}/blog`);

definePageMeta({
  scrollToTop: true,
});

const localePath = useLocalePath();
</script>

<template>
  <div>
    <div
      v-if="data"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-screen-2xl"
    >
      <BlogPost :blog="data.results[0]" :is-row="true" />

      <BlogPost
        v-for="blog in (data.results as any[]).slice(1)"
        :key="blog.id"
        :blog="blog"
      />
    </div>
    <div class="max-w-screen-2xl text-4xl font-bold mx-auto" v-else>
      Loading...
    </div>
  </div>
</template>

<style lang="scss"></style>
