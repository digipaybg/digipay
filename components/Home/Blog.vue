<script lang="ts" setup>
  import { formatDate } from "@vueuse/core";

  const { locale } = useI18n();

  const computedLocale = computed(() => {
    return locale.value === "en" ? "en" : "";
  });

  // const blogContent = await queryContent("blog").locale(locale.value).find();

  const blogContent = useAsyncData("blogPosts", () => queryContent("blog").locale(locale.value).find(), {
    lazy: true,
  });

  const sortedBlogContent = computed(() => {
    if (!blogContent.data.value) return [];

    const arrCopy = blogContent.data.value;

    const sorted = arrCopy
      .sort((a, b) => {
        return new Date(b.date as EpochTimeStamp).getDate() - new Date(a.date as EpochTimeStamp).getDate();
      })
      .slice(0, 5);
    console.log(sorted);
    return sorted;
  });

  const { width } = useWindowSize();

  const slidesPerViewComputed = computed(() => {
    if (width.value < 800) return 1;

    if (width.value < 1200) return 2;

    if (width.value < 1500) return 3;

    return 4;
  });
</script>

<template>
  <div class="relative h-fit overflow-visible">
    <h1 class="py-10 text-center text-4xl">Blog</h1>
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
      :centered-slides="false"
      :grab-cursor="false"
      :round-lengths="false"
      :pagination="{
        enabled: true,
        type: 'bullets',
        clickable: true,
      }"
    >
      <SwiperSlide v-for="(blog, index) in sortedBlogContent" :key="index" class="mb-10 w-fit rounded-xl px-10">
        <NuxtLink as-child :to="computedLocale + blog._path">
          <div
            class="flex w-full flex-col justify-between gap-3 rounded-2xl border border-white pb-10 text-center backdrop-blur-sm backdrop-saturate-150"
          >
            <NuxtImg
              :src="blog.image"
              alt="speaker"
              class="rounded-2xl rounded-b-none"
              :preload="{ fetchPriority: 'low' }"
              format="webp"
              quality="60"
            />

            <h1 class="line-clamp-3 px-5 pt-5 text-left text-lg">{{ blog.title }}</h1>
            <h2 class="flex items-center px-5 text-left text-gray-300">
              <Icon name="i-material-symbols-calendar-today" size="25" class="mr-2" />
              {{ formatDate(new Date(blog.date as EpochTimeStamp), "DD/MM/YYYY") }}
            </h2>
          </div>
        </NuxtLink>
      </SwiperSlide>
      <SwiperSlide v-for="i in 10" :key="i" class="mb-10 w-fit rounded-xl px-10">
        <div
          class="flex h-[473px] w-full flex-col items-center justify-between gap-3 rounded-2xl border border-white py-10 text-center backdrop-blur-sm backdrop-saturate-150"
        >
          <h1 class="text-2xl">Want to Read More Posts?</h1>
          <NuxtLink to="/blog" class="mt-4 w-[75%]">
            <Button
              class="w-full border-primary backdrop-saturate-150 hover:bg-primary hover:text-black"
              variant="outline"
              >{{ $t("readMore") }}
            </Button>
          </NuxtLink>
        </div>
      </SwiperSlide>
    </Swiper>

    <circle class="absolute left-[-10%] top-[75%] z-[-100] h-full w-1/2 rounded-full bg-[#68CBDE]/30 blur-[200px]" />
    <circle class="absolute right-[-10%] top-[75%] z-[-100] h-full w-1/2 rounded-full bg-[#68CBDE]/30 blur-[200px]" />
  </div>
</template>

<style lang="scss"></style>
