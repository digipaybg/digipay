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

  const titleRef = ref<HTMLElement | null>(null);
  const descriptionRef = ref<HTMLElement | null>(null);

  defineOgImageComponent("SpeakerImage", {
    title: titleRef.value?.textContent?.split("|")[0],
    position: descriptionRef.value?.textContent,
  });

  onMounted(() => {
    window.scrollTo({ top: 0 });

    const speakerName = document.getElementById("speakerName")!;
    const speakerPosition = document.getElementById("speakerPosition")!;
    const bodyText = document.querySelector("#bodyText")!;
    const speakerImage = document.querySelector("#speakerImage")!;

    const nameSplit = new SplitType(speakerName);
    const positionSplit = new SplitType(speakerPosition);
    const bodySplit = new SplitType(bodyText as HTMLElement);

    speakerName.classList.remove("opacity-0");
    speakerPosition.classList.remove("opacity-0");
    bodyText.classList.remove("opacity-0");
    speakerImage.classList.remove("opacity-0");

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
          delay: stagger(0.05),
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
          delay: stagger(0.05),
        },
      ],
    ]);
  });
</script>

<template>
  <ContentDoc v-slot="{ doc }" :locale="locale" :path="path" :head="true" class="">
    <Head>
      <Title ref="titleRef">{{ doc.name }} | DigiPay</Title>
      <Meta property="og:title" :content="doc.name" />
      <Meta property="og:description" :content="doc.position" />
      <Meta property="og:url" :content="`https://digipay.bg${doc._path}`" />
      <Meta property="twitter:title" :content="doc.name" />
      <Meta property="twitter:description" :content="doc.position" />
      <Meta property="twitter:image" :content="doc.image" />
      <Meta property="twitter:card" content="summary_large_image" />
    </Head>

    <article class="flex w-full flex-col justify-center gap-24 place-self-center px-52 py-52 2xl:flex-row">
      <div class="flex flex-[1] flex-col gap-10">
        <div class="space-y-3">
          <h1 id="speakerName" class="tracking-wider opacity-0 sm:text-4xl md:text-6xl 2xl:text-7xl">{{ doc.name }}</h1>
          <h2 id="speakerPosition" ref="descriptionRef" class="font-sans text-xl font-light tracking-tight opacity-0">
            {{ doc.position }}
          </h2>
        </div>
        <ContentRenderer id="bodyText" class="tracking-lg font-sans text-lg opacity-0" :value="doc" />
      </div>
      <NuxtImg
        id="speakerImage"
        :src="doc.image"
        alt="speaker"
        format="webp"
        quality="80"
        preload
        priority
        class="sticky top-32 aspect-square flex-[0.6] object-cover object-top opacity-0 2xl:max-h-[500px]"
      />
    </article>
  </ContentDoc>
</template>

<style lang="scss">
  * {
    font-family: "Arial", sans-serif;
  }

  hr {
    border: 0;
    height: 1px;
    // background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #22c55e, rgba(0, 0, 0, 0));
    margin: 1rem 0;
  }
</style>
