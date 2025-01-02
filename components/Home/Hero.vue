<script lang="ts" setup>
import { defaultTransition } from "#build/imports";
</script>

<template>
  <div ref="containerRef" class="rounded-lg">
    <div class="absolute top-0 h-1/3 overflow-hidden" />

    <div
      class="relative w-full lg:w-10/12 mx-auto 2xl:w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] my-3 md:my-2 md:mb-8 lg:rounded-2xl overflow-hidden aspect-video z-10 bg-background"
      v-motion
      :initial="{
        opacity: 0,
        scale: 0.8,
        filter: 'blur(10px)',
      }"
      :enter="{
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',

        transition: {
          type: 'spring',
          bounce: 0.2,
        },
      }"
      :duration="600"
      :delay="150"
    >
      <video
        ref="videoRef"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        class="w-full h-full opacity-30 aspect-video object-cover"
        poster="/18.png"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white space-y-4 w-full px-4"
      >
        <div>
          <NuxtImg
            src="/logo.svg"
            alt="DIGIPAY LOGO"
            class="text-center text-white mx-auto w-[150px] sm:w-[200px] md:w-[250px]"
          />
        </div>
        <LetterPullup words="Your secure and convenient journey" />
      </div>
    </div>

    <h1
      ref="infoRef"
      class="text-base sm:text-lg md:text-2xl lg:text-3xl font-normal font-mono text-center flex flex-col md:flex-row items-center md:justify-between w-full px-4 gap-2 md:gap-0 -z-10"
    >
      <span
        v-for="(item, index) in [
          '08 October 2025',
          'Live & Virtual',
          'Inter Expo Center',
        ]"
        v-motion
        :initial="{
          opacity: 0,
          y: -200,
          filter: 'blur(10px)',
        }"
        :enter="{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            bounce: 0.2,
            mass: 0.2,
          },
        }"
        :delay="index * 100"
      >
        {{ item }}
      </span>
    </h1>

    <h1
      ref="titleRef"
      class="w-full text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] 2xl:text-[13rem] font-mono font-black text-center tracking-[.0095em] mx-auto"
      v-motion
      :initial="{
        opacity: 0,
        scale: 0.8,
        filter: 'blur(10px)',
      }"
      :visible-once="{
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          type: 'spring',
          bounce: 0.2,
          mass: 0.2,
        },
      }"
    >
      <!-- {{ $t("HomePage.hero.mainTitle") }} -->
      DIGIPAY 2025
    </h1>
  </div>
</template>

<style lang="scss"></style>
