<script lang="ts" setup>
  const { slug } = useRoute().params;
  const { locale } = useI18n();
  const { data } = await useAsyncData("page-data", () => queryContent(`/blog`).locale(locale.value).findOne());
</script>

<template>
  <div>
    <article class="p-24">
      <ContentDoc v-slot="{ doc }" path="/blog" :locale="locale">
        {{ doc.title }}
      </ContentDoc>
    </article>
  </div>
</template>

<style lang="scss"></style>
