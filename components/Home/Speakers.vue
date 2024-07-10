<script lang="ts" setup>
  const { locale } = useI18n();
  const speakersContent = await queryContent("speakers").locale(locale.value).find();
</script>

<template>
  <div class="my-52">
    <Swiper
      :modules="[
        SwiperAutoplay,
        SwiperNavigation,
        SwiperThumbs,
        SwiperPagination,
        SwiperEffectCoverflow,
        SwiperKeyboard,
        SwiperFreeMode,
      ]"
      :navigation="{
        enabled: true,
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :keyboard="{
        enabled: true,
      }"
      :slides-per-view="5"
      :allow-slide-next="true"
      :allow-slide-prev="true"
      :loop="false"
      :centered-slides="true"
      :grab-cursor="true"
      :round-lengths="true"
      :space-between="25"
      :pagination="{
        enabled: true,
        type: 'bullets',
        clickable: true,
      }"
    >
      <SwiperSlide v-for="(speaker, index) in speakersContent" :key="index" class="w-fit rounded-xl bg-blue-900">
        <div class="flex flex-col items-center justify-center gap-3 p-10 text-center">
          <NuxtImg
            :src="speaker.img"
            alt="speaker"
            class="aspect-square h-52 rounded-full border border-white object-cover"
            preload
          />
          <h1 class="text-2xl">{{ speaker.name }}</h1>
          <h2 class="text-lg">{{ speaker.position }}</h2>
          <NuxtLink as-child :to="speaker._path" class="m-10 mt-4 w-[75%]">
            <Button class="w-full" variant="default">Bio</Button>
          </NuxtLink>
        </div>
      </SwiperSlide>
      <div class="swiper-navigation-controls pt-10">
        <div class="swiper-button-prev" />
        <div class="swiper-button-next" />
      </div>
    </Swiper>
  </div>
</template>

<style lang="scss">
  .swiper {
    padding-bottom: 25px;
  }
</style>
