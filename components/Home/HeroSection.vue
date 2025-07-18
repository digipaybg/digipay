<script lang="ts" setup>
const { $anime } = useNuxtApp() as any;
const { locale } = useI18n();
const link =
  locale.value === "en"
    ? "https://tickets.paysera.com/en/event/digi-pay-10c0"
    : "https://tickets.paysera.com/bg-BG/event/digi-pay-10c0";

const titleRef = ref<HTMLElement | null>(null);
const isTitleVisible = useElementVisibility(titleRef, {
  threshold: 0.75,
});

let animation: any = null;

const scroll = useWindowScroll();

watch(scroll.y, () => {
  if (isTitleVisible.value && animation && !animation.began) {
    animation.play();
  }
});

onMounted(() => {
  const tl = $anime.timeline({
    easing: "easeOutExpo",
    // duration: 750,
    delay: 100,
  });

  tl.add({
    targets: [".hero"],
    opacity: [0, 1],
    filter: ["blur(10px)", "blur(0px)"],
    scale: [0.8, 1],
    delay: $anime.stagger(100),
  });

  tl.add(
    {
      targets: [".details"],
      opacity: [0, 1],
      filter: ["blur(10px)", "blur(0px)"],
      translateY: [-100, 0],
      delay: $anime.stagger(150),
    },
    "-=500",
  );

  // animation = $anime({
  //   targets: titleRef.value,
  //   opacity: [0, 1],
  //   filter: ["blur(10px)", "blur(0px)"],
  //   scale: [0.8, 1],
  //   easing: "easeOutExpo",
  //   autoplay: false,
  //   begin: () => {
  //     $anime.set(titleRef.value, { opacity: 0 });
  //   },
  // });
});
</script>

<template>
  <div ref="containerRef" class="rounded-lg">
    <div class="absolute top-0 h-1/3 overflow-hidden" />

    <div
      class="relative w-full lg:w-10/12 mx-auto 2xl:w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] my-3 md:my-2 md:mb-8 lg:rounded-2xl overflow-hidden aspect-video z-10 bg-background hero"
    >
      <video
        ref="videoRef"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        class="w-full h-full opacity-30 aspect-video object-cover"
        poster="/18.png"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4 flex flex-col items-center gap-4"
      >
        <div>
          <Logo
            class="text-center text-white mx-auto w-[150px] sm:w-[200px] md:w-[250px] hero"
          />
        </div>

        <LetterPullup
          words="Your secure and convenient journey"
          :initialDelay="0"
          containerClass="flex justify-center w-full "
          textClass="text-2xl md:text-3xl md:text-4xl lg:text-5xl h-full hero"
          key="hero"
        />

        <div class="flex justify-center w-full mt-12 hero">
          <NuxtLink :to="link" asChild>
            <Button class="">
              {{ $t("HomePage.hero.button") }}
            </Button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <h1
      ref="infoRef"
      class="text-2xl lg:text-3xl font-normal font-mono text-center flex flex-col md:flex-row items-center md:justify-between w-full px-4 gap-4 md:gap-0 -z-10"
    >
      <span
        v-for="item in [
          $t('HomePage.hero.date'),
          $t('HomePage.hero.format'),
          $t('HomePage.hero.location'),
        ]"
        :key="item"
        class="details"
      >
        {{ item }}
      </span>
    </h1>

    <!-- <h1
      ref="titleRef"
      class="w-full text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] 2xl:text-[13rem] font-mono font-black text-center tracking-[.0095em] mx-auto"
    >
      {{ $t("HomePage.hero.mainTitle") }}
    </h1> -->
  </div>
</template>

<style lang="scss"></style>
