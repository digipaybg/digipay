<script lang="ts" setup></script>

<template>
  <div>
    <h1 class="py-10 text-center text-4xl capitalize">{{ $t("video") }}</h1>

    <iframe
      src="https://www.youtube.com/embed/BVXYljey6ms?si=hLbCgh4JtVqPoZQ5"
      title="DigiPay"
      frameborder="0"
      allow="picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
      class="mx-auto aspect-video w-[90%] rounded-2xl xl:w-2/3"
    ></iframe>

    <NuxtLink href="/videos" class="mt-10 flex justify-center">
      <Button size="lg" class="px-12 py-8 text-2xl">
        {{ $t("allVideos") }}
      </Button>
    </NuxtLink>
  </div>
</template>

<style lang="scss"></style>
