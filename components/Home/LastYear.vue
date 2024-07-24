<script setup>
  const thumbsSwiper = ref(null);

  const onSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
  };
</script>

<template>
  <div id="lastYear" class="px-4 py-8 sm:px-8 md:px-16 lg:px-24">
    <h1 class="py-4 text-center text-2xl capitalize sm:text-3xl md:text-4xl">{{ $t("lastYear") }}</h1>

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
      <SwiperSlide v-for="i in 5" :key="i">
        <NuxtImg
          :src="`/lastYear/${i}.png`"
          alt="last year"
          format="webp"
          class="mx-auto h-[300px] w-full max-w-md rounded-lg object-cover sm:h-[400px] sm:max-w-lg md:h-[450px] md:max-w-xl lg:h-[500px] lg:max-w-4xl"
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
      :slides-per-view="3"
      :centered-slides="true"
      class="swiper-thumbs mt-5 w-[90%] sm:w-[80%]"
      watch-slides-progress
      @swiper="onSwiper"
    >
      <SwiperSlide v-for="i in 5" :key="i" class="w-full">
        <NuxtImg
          format="webp"
          :src="`/lastYear/${i}.png`"
          alt="last year"
          class="h-[100px] w-full rounded-lg object-cover sm:h-[120px] md:h-[140px] lg:h-[250px]"
        />
      </SwiperSlide>
      <div class="swiper-slide-thumb-active"></div>
    </Swiper>
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
