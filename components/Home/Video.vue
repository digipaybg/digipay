<script lang="ts" setup>
  import SplitType from "split-type";

  onMounted(() => {
    const target = document.querySelector("#video")!;

    const videoTitle = new SplitType("#videoTitle")!;

    target.classList.add("opacity-0");
    inView(target, (entry) => {
      if (entry.isIntersecting) {
        target.classList.remove("opacity-0");
        timeline([
          [
            videoTitle.chars!,
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
        ]);
      }
    });
  });
</script>

<template>
  <div id="video" class="h-screen py-10">
    <h1 id="videoTitle" class="mb-6 py-10 text-center text-2xl sm:text-3xl md:text-4xl">
      {{ $t("video") }}
    </h1>

    <div class="relative">
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
      <circle
        class="absolute left-[50%] top-[50%] -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#27E076]/30 blur-[200px]"
      />
    </div>

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
