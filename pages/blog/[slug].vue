<script lang="ts" setup>
  import { formatDate } from "@vueuse/core";
  import SplitType from "split-type";
  import getImagePath from "~/lib/getImagePathByName";

  const { locale } = useI18n();

  const route = useRoute();
  const path = computed(() => {
    return route.path
      .split("/")
      .filter((x) => !x.endsWith(locale.value))
      .join("/");
  });

  onMounted(() => {
    const postImg = document.querySelector("#post-img")!;
    const split = new SplitType("#title");
    const authorPfp = document.querySelector("#author-img")!;
    const authorName = document.querySelector("#author-name")!;
    const readingTime = document.querySelector("#read-time")!;
    const postDate = document.querySelector("#post-date")!;

    timeline([
      [
        postImg,
        {
          y: [-50, 0],
          opacity: [0, 1],
          scale: [0.7, 1],
        },
        {
          easing: spring({
            stiffness: 100,
            damping: 15,
            mass: 1,
          }),
        },
      ],
      [
        split.chars!,
        { y: [25, 0], opacity: [0, 1], scale: [0.7, 1] },
        {
          delay: stagger(0.02),
          easing: spring({
            stiffness: 100,
            damping: 15,
            mass: 1,
          }),
          at: 0.2,
        },
      ],
      [
        authorPfp,
        {
          opacity: [0, 1],
          scale: [0.7, 1],
        },
        {
          easing: spring({
            stiffness: 100,
            damping: 15,
            mass: 1,
          }),
        },
      ],
      [
        authorName,
        {
          opacity: [0, 1],
          scale: [0.7, 1],
        },
        {
          easing: spring({
            stiffness: 100,
            damping: 15,
            mass: 1,
          }),
        },
      ],
      [
        readingTime,
        {
          opacity: [0, 1],
          scale: [0.7, 1],
        },
        {
          easing: spring({
            stiffness: 100,
            damping: 15,
            mass: 1,
          }),
          at: "<",
        },
      ],
      [
        postDate,
        {
          opacity: [0, 1],
          scale: [0.7, 1],
        },
        {
          easing: spring({
            stiffness: 100,
            damping: 15,
            mass: 1,
          }),
          at: "<",
        },
      ],
    ]);
  });

  const removeSpecialCharacters = (text: string) => {
    return text.replace(/[^\p{L}\p{N}\s!?.-]/gu, " ");
  };

  definePageMeta({
    layout: "blog",
  });
</script>

<template>
  <ContentDoc v-slot="{ doc }" :locale="locale" :path="path" :head="true" class="scroll-container">
    <div class="relative flex justify-center gap-10 px-64 py-32">
      <article class="w-full max-w-full flex-[1] space-y-10">
        <NuxtImg id="post-img" class="mx-auto w-full rounded-2xl" :src="doc.image" :alt="doc.title" />
        <div class="flex flex-col gap-5">
          <h1 id="title" class="text-3xl font-bold">{{ doc.title }}</h1>

          <div class="space-y-3">
            <div class="flex gap-2">
              <p class="text-lg capitalize text-gray-400">
                {{
                  formatDate(new Date(doc.date as EpochTimeStamp), "DD MMMM YYYY", {
                    locales: locale,
                  })
                }}
              </p>
              <p class="text-lg text-gray-400">•</p>
              <p class="text-lg text-gray-400">
                {{ $t("readingTime", { minutes: Math.round(doc.readingTime.minutes) }) }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <NuxtImg class="rounded-full" :src="getImagePath(doc.author)" :alt="doc.author" width="50" height="50" />
              <h3 class="author-name text-lg">{{ doc.author }}</h3>
            </div>
          </div>
        </div>

        <hr />
        <ContentRenderer id="bodyText" class="tracking-lg font-sans text-lg" :value="doc" />
      </article>
      <div
        class="sticky right-0 top-32 h-fit flex-[0.3] space-y-4 overflow-hidden rounded-2xl border border-white/15 p-4 backdrop-blur-lg backdrop-saturate-150"
        :style="{
          backdropFilter: 'blur(15px) saturate(180%)',
          backgroundColor: 'rgb(12 4 39 / 0.5) ',
          boxShadow: 'inset 0 -1px 0 0px rgba(255, 255, 255, 0.3)',
        }"
      >
        <h1 class="flex items-center gap-2 text-xl font-bold">
          <Icon name="fluent:content-view-24-regular" size="25" class="mr-2" />
          {{ $t("toc") }}
        </h1>
        <a
          v-for="(link, index) in doc.body?.toc?.links"
          :key="index"
          :href="'#' + link.id"
          class="block cursor-pointer text-blue-500"
        >
          {{ removeSpecialCharacters(link.text) }}
        </a>
      </div>
    </div>
  </ContentDoc>
</template>

<style lang="scss">
  hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #11e7ed, rgba(0, 0, 0, 0));
    margin: 2rem 0;
  }

  strong {
    font-weight: bold;
    letter-spacing: 1px;
    color: #c0dffd;
  }

  #bodyText {
    * {
      font-family: "Arial", sans-serif;
    }

    h1,
    h2,
    h3 {
      scroll-margin-top: 140px;
      font-size: 28px;
      padding-top: 30px;
      padding-bottom: 10px;
      color: #b0edf9;
    }

    p {
      font-size: 20px;
      padding-block: 10px;
    }

    h3 {
      font-size: 23px;
    }
  }
</style>
