<script lang="ts" setup>
  const { locale } = useI18n();
</script>

<template>
  <ContentDoc v-slot="{ doc }" :locale="locale" :path="$route.path" :query="{}">
    <article class="flex w-1/2 gap-10 place-self-center pt-52">
      <NuxtImg
        :src="doc.img"
        alt="speaker"
        class="aspect-square w-10 flex-[0.5] rounded-2xl object-cover shadow-[0px_0px_20px_0px] shadow-green-500"
      />
      <div class="flex flex-[1] flex-col">
        <h1 class="text-4xl">{{ doc.name }}</h1>
        <ContentRenderer :value="doc" />
      </div>
    </article>
  </ContentDoc>
</template>

<style lang="scss"></style>
