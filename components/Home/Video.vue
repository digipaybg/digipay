<script lang="ts" setup>
  import { scroll } from "#imports";
  import SplitType from "split-type";

  onMounted(() => {
    const target = document.querySelector("#video")!;

    const videoTitle = new SplitType("#videoTitle")!;

    scroll(
      timeline([
        [
          videoTitle.chars!,
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
          "iframe",
          {
            y: [20, 0],
            opacity: [0, 1],
            scale: [0.7, 1],
            filter: ["blur(10px)", "blur(0px)"],
          },
          {
            easing: spring({
              stiffness: 100,
              damping: 10,
              mass: 0.3,
            }),
          },
        ],
      ]),
      {
        target,
        smooth: 1,
        axis: "y",
        offset: ["start end", "-100px 0px"],
      },
    );
  });
</script>

<template>
  <div id="video">
    <h1 id="videoTitle" class="mb-6 py-10 text-center text-2xl sm:text-3xl md:text-4xl">
      {{ $t("video") }}
    </h1>

    <iframe
      id="2023Video"
      src="https://www.youtube.com/embed/BVXYljey6ms?si=hLbCgh4JtVqPoZQ5"
      title="DIGIPAY"
      frameborder="0"
      allow="picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
      class="mx-auto aspect-video w-[90%] rounded-2xl xl:w-2/3"
    ></iframe>

    <NuxtLink
      href="https://www.youtube.com/@DIGIPAY8873"
      rel="noopener noreferrer"
      target="_blank"
      class="mt-10 flex justify-center"
    >
      <Button size="lg" class="px-12 py-8 text-2xl">
        {{ $t("allVideos") }}
      </Button>
    </NuxtLink>
  </div>
</template>

<style lang="scss"></style>
