<script lang="ts" setup>
  const { locale } = useI18n();

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

  const localePath = useLocalePath();
</script>

<template>
  <div class="relative overflow-visible">
    <h1 class="py-10 text-center text-4xl">{{ $t("blog") }}</h1>
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
      :space-between="10"
      class="h-full"
    >
      <SwiperSlide v-for="(blog, index) in sortedBlogContent" :key="index" class="mx-10">
        <!-- <NuxtLink as-child :to="computedLocale + blog._path">
          <div
            class="flex w-full flex-col justify-between gap-3 rounded-2xl border border-white pb-10 text-center backdrop-blur-sm backdrop-saturate-150"
          >
            <NuxtImg :src="blog.image" alt="speaker" class="rounded-2xl rounded-b-none" format="webp" quality="60" />

            <h1 class="line-clamp-3 px-5 pt-5 text-left text-lg">{{ blog.title }}</h1>
            <h2 class="flex items-center px-5 text-left text-gray-300">
              <Icon name="i-material-symbols-calendar-today" size="25" class="mr-2" />
              {{ formatDate(new Date(blog.date as EpochTimeStamp), "DD/MM/YYYY") }}
            </h2>
          </div>
        </NuxtLink> -->
        <BlogCard :post="blog" />
      </SwiperSlide>
    </Swiper>

    <div class="flex items-center justify-center py-10">
      <NuxtLink as-child :href="localePath('/blog')">
        <Button size="lg" class="text-lg">{{ $t("readAllPosts") }}</Button>
      </NuxtLink>
    </div>
    <circle class="absolute left-[-10%] top-[75%] z-[-100] h-full w-1/2 rounded-full bg-[#68CBDE]/30 blur-[200px]" />
    <circle class="absolute right-[-10%] top-[75%] z-[-100] h-full w-1/2 rounded-full bg-[#68CBDE]/30 blur-[200px]" />
  </div>
</template>

<style lang="scss"></style>
