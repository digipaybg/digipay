<script lang="ts" setup>
  const { locale } = useI18n();

  const speakersContent = useAsyncData("speakersInfo", () => queryContent("speakers").locale(locale.value).find(), {
    lazy: true,
  });

  const speakersContentComputed = computed(() => {
    if (!speakersContent.data.value) return [];

    const arrCopy = speakersContent.data.value;
    return arrCopy.sort((a, b) => a.order - b.order);
  });

  const { width } = useWindowSize();

  const slidesPerViewComputed = computed(() => {
    if (width.value < 800) return 1;

    if (width.value < 1200) return 2;

    if (width.value < 1500) return 3;

    return 4;
  });
</script>

<!-- TODO: Make speaker card be like blog card -->

<template>
  <div id="speakers" class="relative my-52 pb-10" :class="{ 'mx-4': slidesPerViewComputed === 1 }">
    <h1 class="py-10 text-center text-4xl">{{ $t("speakers") }}</h1>
    <Swiper
      :modules="[
        SwiperAutoplay,
        SwiperNavigation,
        SwiperThumbs,
        SwiperPagination,
        SwiperEffectCoverflow,
        SwiperKeyboard,
        SwiperFreeMode,
        SwiperController,
      ]"
      :navigation="{
        enabled: true,
        nextEl: '#nextElm',
        prevEl: '#previousEl',
      }"
      :keyboard="{
        enabled: true,
      }"
      :slides-per-view="slidesPerViewComputed"
      :allow-slide-next="true"
      :allow-slide-prev="true"
      :loop="false"
      :centered-slides="true"
      :grab-cursor="false"
      :round-lengths="false"
      :space-between="40"
      :pagination="{
        enabled: true,
        type: 'bullets',
        clickable: true,
      }"
      class="relative"
    >
      <SwiperSlide v-for="(speaker, index) in speakersContentComputed" :key="index" class="mb-10 w-fit rounded-xl">
        <SpeakerCard :speaker="speaker" />
      </SwiperSlide>
      <div class="swiper-navigation-controls flex items-center justify-center py-2 pt-10" />
      <div class="absolute top-[35%] z-[9999] flex w-full justify-between px-10">
        <Button
          id="previousEl"
          class="aspect-square w-10 rounded-full bg-white text-black hover:rounded-full hover:bg-white/70 active:rounded-full active:bg-white/50"
          size="icon"
        >
          <Icon name="i-material-symbols-arrow-left-alt" size="25" class="" />
        </Button>
        <Button
          id="nextElm"
          size="icon"
          class="aspect-square w-10 rounded-full bg-white text-black hover:rounded-full hover:bg-white/70 active:rounded-full active:bg-white/50"
        >
          <Icon name="i-material-symbols-arrow-right-alt" size="25" class="" />
        </Button>
      </div>
    </Swiper>

    <circle class="absolute right-[-10%] top-[25%] z-[-100] h-full w-1/2 rounded-full bg-[#2fc85c]/30 blur-[200px]" />
  </div>
</template>

<style lang="scss">
  .swiper {
    padding-bottom: 25px;
  }

  .swiper-pagination-bullet {
    @apply bg-green-700;
  }
</style>
