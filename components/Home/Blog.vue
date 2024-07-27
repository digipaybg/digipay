<script lang="ts" setup>
  import SplitType from "split-type";

  const props = defineProps({
    excludePost: {
      type: String,
      default: "",
    },
  });

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
      .filter((post) => post._path?.split("/").at(-1) !== props.excludePost)
      .slice(0, 4);
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

  onMounted(() => {
    const target = document.querySelector("#blog")!;
    const splitTitle = new SplitType("#blogTitle");

    target.classList.add("opacity-0");
    inView(target, (entry) => {
      if (entry.isIntersecting) {
        target.classList.remove("opacity-0");

        timeline([
          [
            splitTitle.chars!,
            {
              y: [10, 0],
              opacity: [0, 1],
              scale: [0.7, 1],
            },
            {
              delay: stagger(0.035),
              easing: spring({
                stiffness: 100,
                damping: 10,
                mass: 0.5,
              }),
            },
          ],
          [
            ".blog-slide",
            {
              y: [20, 0],
              opacity: [0, 1],
              scale: [0.7, 1],
              filter: ["blur(10px)", "blur(0px)"],
            },
            {
              delay: stagger(0.035),
              easing: spring({
                stiffness: 100,
                damping: 10,
                mass: 0.5,
              }),
            },
          ],
        ]);
      }
    });
  });
</script>

<template>
  <div id="blog" class="relative mx-14 overflow-visible pt-24">
    <h1 v-if="excludePost === ''" id="blogTitle" class="mb-6 py-10 text-center text-2xl sm:text-3xl md:text-4xl">
      {{ $t("blog") }}
    </h1>
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
        nextEl: '#nextEl',
        prevEl: '#prevEl',
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
      :space-between="20"
      class="relative h-full w-full"
    >
      <SwiperSlide v-for="(blog, index) in sortedBlogContent" :key="index" class="blog-slide">
        <BlogCard :post="blog" />
      </SwiperSlide>
    </Swiper>

    <div class="flex items-center justify-center py-10">
      <NuxtLink as-child :href="localePath('/blog')">
        <Button id="morePosts-Button" size="lg" class="text-lg">{{ $t("morePosts") }}</Button>
      </NuxtLink>
    </div>
    <circle class="absolute left-[-10%] top-[75%] z-[-100] h-full w-1/2 rounded-full bg-[#68CBDE]/30 blur-[200px]" />
    <circle class="absolute right-[-10%] top-[75%] z-[-100] h-full w-1/2 rounded-full bg-[#68CBDE]/30 blur-[200px]" />
  </div>
</template>

<style lang="scss"></style>
