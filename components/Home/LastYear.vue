<script setup>
  const thumbsSwiper = ref(null);

  const onSwiper = (swiper) => {
    console.log(swiper);
    thumbsSwiper.value = swiper;
  };
</script>

<template>
  <div>
    <h1 class="py-10 text-center text-4xl capitalize">{{ $t("lastYear") }}</h1>

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
        <img
          :src="`/lastYear/${i}.png`"
          alt="last year"
          class="h-[500px] w-1/2 translate-x-1/2 rounded-lg object-cover"
        />
      </SwiperSlide>
      <div class="absolute top-[45%] z-[9999] flex w-full justify-between px-10">
        <Button
          id="prevEl"
          class="aspect-square w-10 rounded-full bg-white text-black hover:rounded-full hover:bg-white/70 active:rounded-full active:bg-white/50"
          size="icon"
        >
          <Icon name="i-material-symbols-arrow-left-alt" size="25" class="" />
        </Button>
        <Button
          id="nextEl"
          size="icon"
          class="aspect-square w-10 rounded-full bg-white text-black hover:rounded-full hover:bg-white/70 active:rounded-full active:bg-white/50"
        >
          <Icon name="i-material-symbols-arrow-right-alt" size="25" class="" />
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
      class="swiper-thumbs mt-5 w-[80%]"
      watch-slides-progress
      @swiper="onSwiper"
    >
      <SwiperSlide v-for="i in 5" :key="i" class="w-full translate-x-1/2">
        <img :src="`/lastYear/${i}.png`" alt="last year" class="max-h-[150px] w-full rounded-lg object-cover" />
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
