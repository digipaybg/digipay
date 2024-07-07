<script lang="ts" setup>
  const { locale } = useI18n();
  const { data: posts } = await useAsyncData("home", () => queryContent("/blog").locale(locale.value).find());

  useSeoMeta({
    title: "Blog",
    description: "Blog posts",
  });
</script>

<template>
  <div class="p-24">
    <h1>Blog</h1>
    <!-- <ContentList :path="`/blog/${locale}`" v-slot="{ list }">
      <ul>
        <li v-for="post in list" :key="post._path">
          <Link :to="`/blog/${post.slug}`">{{ post.title }}</Link>
          <p>{{ post.description }}</p>
        </li>
      </ul>
    </ContentList> -->
    <ul>
      <li v-for="post in posts" :key="post._path">
        <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
