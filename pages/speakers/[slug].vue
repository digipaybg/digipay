<script lang="ts" setup>
  const { locale } = useI18n();

  const route = useRoute();
  const path = computed(() => {
    return route.path
      .split("/")
      .filter((x) => !x.endsWith(locale.value))
      .join("/");
  });
</script>

<template>
  <ContentDoc v-slot="{ doc }" :locale="locale" :path="path" :head="true" class="">
    <Head>
      <Meta property="og:image" :content="doc.image" />
      <Meta property="og:title" :content="doc.name" />
      <Meta property="og:description" :content="doc.position" />
      <Meta property="og:url" :content="`https://digipay.bg${doc._path}`" />
      <Meta property="twitter:title" :content="doc.name" />
      <Meta property="twitter:description" :content="doc.position" />
      <Meta property="twitter:image" :content="doc.image" />
    </Head>

    <article class="flex min-h-screen w-2/3 justify-center gap-24 place-self-center pt-52">
      <div class="flex flex-[1] flex-col gap-10">
        <div class="space-y-3">
          <h1 class="text-8xl tracking-wider">{{ doc.name }}</h1>
          <h2 class="font-sans text-xl font-light tracking-tight">{{ doc.position }}</h2>
        </div>
        <ContentRenderer class="tracking-lg font-sans text-lg" :value="doc" />
      </div>
      <NuxtImg
        :src="doc.image"
        alt="speaker"
        format="webp"
        quality="80"
        preload
        priority
        class="sticky top-20 aspect-square max-h-[500px] rounded-[2rem] object-cover object-top"
      />
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
</style>
