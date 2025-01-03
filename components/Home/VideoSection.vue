<script lang="ts" setup>
// No additional setup needed as translations will be handled by Vue i18n
</script>

<template>
  <div class="flex flex-col gap-4 space-y-6 sm:space-y-8 md:space-y-10">
    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">
      {{ $t("Video2024.title") }}
    </h1>
    <div class="w-full max-w-screen-2xl mx-auto">
      <iframe
        src="https://www.youtube.com/embed/1F0RMUus_Ek?si=RpqSFEvF9kViHUCX"
        :title="$t('Video2024.videoTitle')"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        class="w-full aspect-video rounded-xl sm:rounded-2xl shadow-lg"
      />
    </div>
  </div>
</template>

<style lang="scss"></style>
