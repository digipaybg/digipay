<script lang="ts" setup>
  import { formatDate } from "@vueuse/core";
  import SplitType from "split-type";
  import getImagePath from "~/lib/getImagePathByName";

  const { locale } = useI18n();

  const route = useRoute();
  const localePath = useLocalePath();

  const path = computed(() => {
    const value = route.fullPath
      .split("/")
      .filter((x) => !x.endsWith(locale.value))
      .join("/")
      .split("#")[0];

    console.log(value);
    return value;
  });

  onMounted(() => {
    const backButton = document.querySelector("#backButton")!;
    const postImg = document.querySelector("#post-img")!;
    const split = new SplitType("#title");
    const readingTime = document.querySelector("#read-time")!;
    const dotSplitter = document.querySelector("#dot-splitter")!;
    const postDate = document.querySelector("#post-date")!;

    const tocCard = document.querySelector(".toc-card")!;
    const tocText = document.querySelector(".toc-text")!;
    const tocLinks = document.querySelectorAll(".anchor-doc");

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
        },
      ],

      [
        dotSplitter,
        {
          opacity: [0, 1],
          scale: [0, 1],
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
        backButton,
        {
          opacity: [0, 1],
          scale: [0.5, 1],
          y: [50, 0],
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
        tocCard,
        {
          x: [-100, 0],
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
        tocText,
        {
          y: [50, 0],
          opacity: [0, 1],
          scale: [0.5, 1],
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
        tocLinks,
        {
          y: [150, 0],
          opacity: [0, 1],
          scale: [0.7, 1],
        },
        {
          easing: spring({
            stiffness: 100,
            damping: 15,
            mass: 1,
          }),
          delay: stagger(0.035),
          at: "<",
        },
      ],
    ]);
  });

  definePageMeta({
    layout: "default",
  });
  const removeSpecialCharacters = (text: string) => {
    return text.replace(/[^\p{L}\p{N}\s!?.-]/gu, " ");
  };
</script>

<template>
  <div class="relative overflow-x-clip pt-10" :key="route.fullPath">
    <ContentDoc :key="route.fullPath" :path="path" :head="true" :locale="locale" class="scroll-container relative">
      <template v-slot="{ doc }">
        <Head>
          <Meta name="og:image" :content="doc.image" />
          <Meta name="twitter:image" :content="doc.image" />
          <Meta name="twitter:card" content="summary_large_image" />
          <Meta name="twitter:site" :content="doc.author" />
          <Meta name="twitter:creator" :content="doc.author" />
          <Meta name="twitter:label1" content="Reading time" />
          <Meta name="twitter:data1" :content="doc.readingTime.minutes + ' min read'" />
          <Meta name="twitter:label2" content="Published" />
          <Meta
            name="twitter:data2"
            :content="formatDate(new Date(doc.date as EpochTimeStamp), 'DD MMMM YYYY', { locales: locale })"
          />
          <Meta name="twitter:label3" content="Author" />
          <Meta name="twitter:data3" :content="doc.author" />
          <Meta name="twitter:title" :content="doc.title" />
          <Meta name="twitter:description" :content="doc.description" />
          <Meta name="og:title" :content="doc.title" />
          <Meta name="og:description" :content="doc.description" />
          <Meta name="og:url" :content="$route.fullPath" />
          <Meta name="og:type" content="article" />
          <Meta name="og:article:published_time" :content="doc.date" />
          <Meta name="og:article:author" :content="doc.author" />
          <Meta name="keywords" :content="doc.keywords" />
        </Head>
        <div class="relative flex justify-center gap-10 px-4 py-16 md:px-16 md:py-24 lg:px-32">
          <article class="w-full max-w-full flex-[1] space-y-6">
            <NuxtLink id="" :href="localePath('/blog')" as-child>
              <Button
                id="backButton"
                size="lg"
                variant="outline"
                class="border-primary hover:bg-primary hover:text-black"
              >
                <Icon name="fluent:arrow-left-24-regular" size="25" class="mr-2" />
                {{ $t("backPosts") }}
              </Button>
            </NuxtLink>
            <NuxtImg
              id="post-img"
              class="mx-auto aspect-video w-full rounded-2xl object-cover"
              :alt="doc.title"
              :src="doc.image"
              format="webp"
              quality="80"
            />
            <div class="flex flex-col gap-5">
              <h1 id="title" class="text-2xl font-bold md:text-3xl">{{ doc.title }}</h1>

              <div class="space-y-3">
                <div class="flex gap-2">
                  <p id="post-date" class="text-base capitalize text-gray-400 md:text-lg">
                    {{
                      formatDate(new Date(doc.date as EpochTimeStamp), "DD MMMM YYYY", {
                        locales: locale,
                      })
                    }}
                  </p>
                  <p id="dot-splitter" class="text-base text-gray-400 md:text-lg">•</p>
                  <p id="read-time" class="text-base text-gray-400 md:text-lg">
                    {{ $t("readingTime", { minutes: Math.round(doc.readingTime.minutes) }) }}
                  </p>
                </div>
              </div>
            </div>

            <hr />
            <ContentRenderer id="bodyText" class="font-sans text-base tracking-normal md:text-lg" :value="doc" />
          </article>
          <div
            class="toc-card sticky right-0 top-32 z-20 mt-24 hidden h-fit flex-[0.4] space-y-4 overflow-hidden rounded-2xl border border-white/15 bg-[#0c0427]/30 p-4 shadow-[0px_0px_10px_0px] shadow-white/10 backdrop-blur-lg backdrop-saturate-150 lg:block"
          >
            <h1 class="toc-text flex items-center gap-2 text-lg font-bold md:text-xl">
              <Icon name="fluent:content-view-24-regular" size="25" class="mr-2 hidden lg:block" />
              {{ $t("toc") }}
            </h1>
            <a
              v-for="(link, index) in doc.body?.toc?.links"
              :key="index"
              :href="'#' + link.id"
              class="anchor-doc block cursor-pointer text-blue-500"
            >
              {{ removeSpecialCharacters(link.text) }}
            </a>
          </div>
        </div>
      </template>
      <template #not-found>
        <h1>Document not found</h1>
      </template>
    </ContentDoc>
    <!-- <circle
      class="absolute left-[-30%] top-[75%] z-[-100] aspect-square w-1/2 rounded-full bg-[#68CBDE]/30 blur-[200px]"
    />
    <circle
      class="absolute right-[-10%] top-[30%] z-[-100] aspect-square w-1/2 rounded-full bg-[#68CBDE]/30 blur-[200px]"
    />
    <circle
      class="absolute left-[5%] top-[0%] z-[-100] aspect-square w-1/2 rounded-full bg-[#68CBDE]/30 blur-[200px]"
    />
    <circle
      class="absolute left-[25%] top-[50%] z-[-100] aspect-square w-1/2 rounded-full bg-[#68CBDE]/20 blur-[200px]"
    />
    <LazyHomeBlog :exclude-post="route.path.split('/').at(-1)" /> -->
  </div>
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
    img {
      @apply rounded-2xl;
    }

    h1,
    h2,
    h3 {
      scroll-margin-top: 140px;
      font-size: 24px;
      padding-top: 30px;
      padding-bottom: 10px;
      color: #b0edf9;
    }

    p {
      font-size: 18px;
      padding-block: 10px;
    }

    h3 {
      font-size: 21px;
    }
  }

  @media (max-width: 768px) {
    #title {
      font-size: 2xl;
    }

    #post-date,
    #dot-splitter,
    #read-time,
    #author-name {
      font-size: base;
    }

    .toc-text {
      font-size: lg;
    }

    .toc-card {
      flex-basis: 100%;
    }
  }
</style>
