<script lang="ts" setup>
  const { locale } = useI18n();

  const computedLocale = computed(() => {
    return locale.value === "en" ? "en" : "";
  });

  const speakersContent = await queryContent("speakers").locale(locale.value).find();

  const { width } = useWindowSize();

  const slidesPerViewComputed = computed(() => {
    if (width.value < 800) return 1;

    if (width.value < 1200) return 2;

    if (width.value < 1500) return 3;

    return 4;
  });
</script>

<template>
  <div id="speakers" class="my-52 pb-10" :class="{ 'mx-4': slidesPerViewComputed === 1 }">
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
        nextEl: '.nextButton',
        prevEl: '.prevButton',
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
    >
      <SwiperSlide v-for="(speaker, index) in speakersContent" :key="index" class="mb-10 w-fit rounded-xl">
        <div class="flex h-[600px] flex-col items-center justify-between gap-3 p-10 text-center">
          <NuxtImg
            :src="speaker.image"
            alt="speaker"
            class="aspect-square h-52 rounded-full border border-primary object-cover object-top shadow-[0px_0px_10px_2px] shadow-primary"
          />
          <h1 class="text-2xl">{{ speaker.name }}</h1>
          <h2 class="flex-1 text-lg">{{ speaker.position }}</h2>
          <NuxtLink as-child :to="computedLocale + speaker._path" class="m-10 mt-4 w-[75%]">
            <Button class="w-full border-primary hover:bg-primary hover:text-black" variant="outline">{{
              $t("bio")
            }}</Button>
          </NuxtLink>
        </div>
      </SwiperSlide>
      <div class="swiper-navigation-controls flex items-center justify-center py-2 pt-10" />
      <div class="absolute bottom-0 flex w-full justify-around px-52">
        <Button
          id="prevButton"
          size="icon"
          class="prevButton z-10 rounded-full bg-green-700 p-8 hover:rounded-full hover:bg-green-700 active:rounded-full active:bg-green-700"
        >
          <div class="flex items-center justify-center">
            <Icon name="i-material-symbols-arrow-left-alt" size="25" class="text-white" />
          </div>
        </Button>
        <Button
          id="nextButton"
          size="icon"
          class="nextButton z-10 rounded-full bg-green-700 p-8 hover:rounded-full hover:bg-green-700 active:rounded-full active:bg-green-700"
        >
          <div class="flex items-center justify-center">
            <Icon name="i-material-symbols-arrow-right-alt" size="25" class="text-white" />
          </div>
        </Button>
      </div>
    </Swiper>
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
