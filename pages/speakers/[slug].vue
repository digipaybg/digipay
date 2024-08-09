<script lang="ts" setup>
  import SplitType from "split-type";

  const { locale } = useI18n();

  const route = useRoute();
  const path = computed(() => {
    return route.path
      .split("/")
      .filter((x) => !x.endsWith(locale.value))
      .join("/");
  });

  definePageMeta({
    layout: "default",
  });

  onMounted(() => {
    window.scrollTo({ top: 0 });

    const speakerName = document.getElementById("speakerName")!;
    const speakerPosition = document.getElementById("speakerPosition")!;
    const speakerTopic = document.getElementById("speakerTopic")!;
    const bodyText = document.querySelector("#bodyText")!;
    const speakerImage = document.querySelector("#speakerImage")!;
    const socialMedias = document.querySelector("#socialMedias")!;

    const nameSplit = new SplitType(speakerName);
    const positionSplit = new SplitType(speakerPosition);
    const topicSplit = new SplitType(speakerTopic);
    const bodySplit = new SplitType(bodyText as HTMLElement);

    speakerName.classList.remove("opacity-0");
    speakerPosition.classList.remove("opacity-0");
    speakerTopic.classList.remove("opacity-0");
    bodyText.classList.remove("opacity-0");
    speakerImage.classList.remove("opacity-0");
    socialMedias.classList.remove("opacity-0");

    timeline([
      [
        speakerImage,
        {
          opacity: [0, 1],
          rotate: [30, 0],
          borderRadius: ["10rem", "2rem"],
          scale: [0.6, 1],
        },
        {
          duration: 0.5,
          easing: spring({
            stiffness: 100,
            damping: 15,
          }),
          at: 0.3,
        },
      ],
      [
        nameSplit.chars!,
        {
          y: [100, 0],
          opacity: [0, 1],
          scale: [0.5, 1],
        },
        {
          duration: 0.5,
          easing: spring({
            stiffness: 100,
            damping: 10,
          }),
          delay: stagger(0.035),
          at: 0,
        },
      ],
      [
        positionSplit.lines!,
        {
          y: [20, 0],
          opacity: [0, 1],
          scale: [0.8, 1],
        },
        {
          duration: 1,
          easing: spring({
            stiffness: 100,
            damping: 10,
          }),
          at: 1,
        },
      ],
      [
        topicSplit.lines!,
        {
          y: [20, 0],
          opacity: [0, 1],
          scale: [0.8, 1],
        },
        {
          duration: 1,
          easing: spring({
            stiffness: 100,
            damping: 10,
          }),
          at: 1,
          delay: stagger(0.035),
        },
      ],

      [
        bodySplit.lines!,
        {
          y: [20, 0],
          opacity: [0, 1],
          scale: [0.8, 1],
        },
        {
          duration: 1,
          easing: spring({
            stiffness: 100,
            damping: 10,
          }),
          at: 1,
          delay: stagger(0.035),
        },
      ],
      [
        socialMedias,
        {
          y: [20, 0],
          opacity: [0, 1],
          scale: [0.8, 1],
        },
        {
          duration: 1,
          easing: spring({
            stiffness: 100,
            damping: 10,
          }),
          at: 1.1,
        },
      ],
    ]);
  });
</script>

<template>
  <div>
    <ContentDoc v-slot="{ doc }" :key="$route.fullPath" :locale="locale" :path="path" class="">
      <Head>
        <Title ref="titleRef">{{ doc.name }} | DIGIPAY</Title>
        <Meta property="og:title" :content="doc.name" />
        <Meta property="og:description" :content="doc.position" />
        <Meta property="og:url" :content="$route.fullPath" />
        <Meta property="og:image" :content="doc.image" />
        <Meta property="twitter:title" :content="doc.name" />
        <Meta property="twitter:description" :content="doc.position" />
        <Meta property="twitter:image" :content="doc.image" />
        <Meta property="twitter:card" content="summary_card" />
        <Meta name="description" :content="doc.description" />
        <Meta name="keywords" :content="doc.keywords" />
        <Meta name="author" :content="doc.name" />
        <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <article class="sm:px-18 flex w-full flex-col justify-center gap-12 px-4 py-32 md:px-48 lg:py-64 2xl:flex-row">
        <div class="flex flex-[1] flex-col gap-6 md:gap-10">
          <div class="space-y-2 md:space-y-3">
            <h1
              id="speakerName"
              class="text-2xl font-bold tracking-wider opacity-0 sm:text-4xl md:text-6xl 2xl:text-7xl"
            >
              {{ doc.name }}
            </h1>
            <h2
              id="speakerPosition"
              ref="descriptionRef"
              class="font-sans text-lg font-light tracking-tight opacity-0 sm:text-xl"
            >
              {{ doc.position }}
            </h2>

            <h3 id="speakerTopic" class="py-10 font-sans text-lg font-semibold tracking-tight opacity-0 sm:text-xl">
              {{ $t("topic") }}: {{ doc.topic }}
            </h3>
          </div>
          <ContentRenderer id="bodyText" class="tracking-lg font-sans text-base opacity-0 sm:text-lg" :value="doc" />
          <div class="flex w-full opacity-0" id="socialMedias">
            <NuxtLink :href="doc.linkedin" target="_blank" rel="noopener noreferrer">
              <Icon name="i-mdi-linkedin" class="h-8 w-8 text-white transition-all hover:text-green-500" />
            </NuxtLink>
          </div>
        </div>
        <NuxtImg
          id="speakerImage"
          :src="doc.image"
          alt="speaker"
          format="webp"
          quality="80"
          preload
          priority
          class="sticky top-32 aspect-square w-full flex-[0.5] object-cover object-top opacity-0 sm:w-3/4 md:w-1/2 2xl:max-h-[500px] 2xl:w-auto"
        />
      </article>
    </ContentDoc>
  </div>
</template>

<style lang="scss">
  hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #22c55e, rgba(0, 0, 0, 0));
    margin: 1rem 0;
  }
</style>
