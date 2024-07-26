<script setup>
  import { scroll } from "#imports";
  import SplitType from "split-type";

  const thumbsSwiper = ref(null);

  const onSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
  };

  onMounted(() => {
    const target = document.querySelector("#lastYear");

    const splitTitle = new SplitType("#lastYearTitle");

    scroll(
      timeline([
        [
          splitTitle.chars,
          {
            y: [10, 0],
            opacity: [0, 1],
            scale: [0.7, 1],
          },
          {
            delay: stagger(0.05),
            easing: spring({
              stiffness: 100,
              damping: 10,
              mass: 0.5,
            }),
          },
        ],
        [
          ".swiper-last-year",
          {
            y: [20, 0],
            opacity: [0, 1],
            scale: [0.7, 1],
            filter: ["blur(10px)", "blur(0px)"],
          },
          {
            delay: stagger(0.25, {
              from: "first",
            }),
            easing: spring({
              stiffness: 100,
              damping: 10,
              mass: 0.5,
            }),
          },
        ],
      ]),
      {
        target,
        smooth: 1,
        axis: "y",
        offset: ["start end", "70px 0px"],
      },
    );
  });
</script>

<template>
  <div id="lastYear" class="py-8">
    <h1 id="lastYearTitle" class="mb-6 py-10 text-center text-2xl sm:text-3xl md:text-4xl">{{ $t("lastYear") }}</h1>

    <ClientOnly class="swiper-last-year">
      <Swiper
        :modules="[SwiperThumbs, SwiperNavigation]"
        :thumbs="{
          swiper: thumbsSwiper,
        }"
        :space-between="10"
        :slides-per-view="1"
        :centered-slides="true"
        :navigation="{
          enabled: true,
          nextEl: '#nextEl',
          prevEl: '#prevEl',
        }"
        class="relative"
      >
        <SwiperSlide v-for="i in 5" :key="i" class="">
          <NuxtImg
            :src="`/lastYear/${i}.png`"
            alt="last year DIGIPAY digipay"
            format="webp"
            class="last-year-image mx-auto h-[300px] w-full max-w-md rounded-lg object-cover sm:h-[400px] sm:max-w-lg md:h-[450px] md:max-w-xl lg:h-[500px] lg:max-w-4xl"
          />
        </SwiperSlide>
        <div class="absolute top-1/2 z-[9999] flex w-full -translate-y-1/2 transform justify-between px-4 sm:px-10">
          <Button
            id="prevEl"
            class="aspect-square w-8 rounded-full bg-white text-black hover:bg-white/70 active:bg-white/50 sm:w-10"
            size="icon"
          >
            <Icon name="i-material-symbols-arrow-left-alt" size="20" sm:size="25" class="" />
          </Button>
          <Button
            id="nextEl"
            size="icon"
            class="aspect-square w-8 rounded-full bg-white text-black hover:bg-white/70 active:bg-white/50 sm:w-10"
          >
            <Icon name="i-material-symbols-arrow-right-alt" size="20" sm:size="25" class="" />
          </Button>
        </div>
        <div class="swiper-slide-thumb-active"></div>
      </Swiper>

      <Swiper
        :modules="[SwiperThumbs, SwiperFreeMode]"
        :free-mode="{
          enabled: true,
        }"
        :space-between="10"
        :slides-per-view="5"
        :centered-slides="true"
        class="swiper-thumbs swiper-last-year-thumbs mt-10 w-full"
        watch-slides-progress
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="i in 5" :key="i" class="w-full">
          <NuxtImg
            format="webp"
            :src="`/lastYear/${i}.png`"
            alt="last year"
            class="aspect-video h-[70px] w-full rounded-lg object-cover sm:h-[120px] md:h-[140px] lg:h-[250px]"
          />
        </SwiperSlide>
        <div class="swiper-slide-thumb-active"></div>
      </Swiper>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
  .swiper-thumbs {
    .swiper-slide {
      opacity: 0.4;
      scale: 0.95;
      transition:
        opacity 0.3s,
        scale 0.3s;

      transform-origin: center;
    }
    .swiper-slide-thumb-active {
      opacity: 1;
      scale: 1;
    }
  }
</style>
