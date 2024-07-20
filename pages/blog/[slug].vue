<script lang="ts" setup>
  const { locale } = useI18n();

  const route = useRoute();
  const path = computed(() => {
    return route.path
      .split("/")
      .filter((x) => !x.endsWith(locale.value))
      .join("/");
  });

  definePageMeta({
    layout: "blog",
  });
</script>

<template>
  <ContentDoc v-slot="{ doc }" :locale="locale" :path="path" :head="true" class="">
    <article class="p-24">
      <NuxtImg id="speakerImage" class="mx-auto mb-10 h-96 rounded-2xl" :src="doc.image" :alt="doc.title" />
      <h1 class="text-center text-3xl">{{ doc.title }}</h1>

      <hr />
      <ContentRenderer id="bodyText" class="tracking-lg font-sans text-lg" :value="doc" />
    </article>
  </ContentDoc>
</template>

<style lang="scss">
  hr {
    border: 0;
    height: 1px;
    // background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #22c55e, rgba(0, 0, 0, 0));
    margin: 1rem 0;
  }

  h1 {
    font-size: 20px;
  }

  h2 {
    font-size: 16px;
  }
  h3 {
    font-size: 14px;
  }
</style>
