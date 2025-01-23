<script lang="ts" setup>
const { t } = useI18n();

const people = [
  {
    key: "boris",
    image: "/people/boris-goncharov.jpg",
  },
  {
    key: "goran",
    image: "/people/goran-angelov.jpg",
  },
  {
    key: "ivana",
    image: "/people/ivana-rosencic.jpg",
  },
  {
    key: "deyan",
    image: "/people/deyan-radev.jpg",
  },
  {
    key: "chrystalla",
    image: "/people/chrystalla-kazara.jpg",
  },
  {
    key: "tsvetomir",
    image: "/people/tsvetomir-doskov.jpg",
  },
];
</script>

<template>
  <div class="px-4 md:px-6">
    <LetterPullup
      text-class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold mt-8 sm:mt-16 mb-4 sm:mb-8 text-center"
      container-class="mx-auto text-center justify-center"
      :words="$t('Testimonials.title')"
      :initial-delay="0"
      key="topics"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        class="flex-1 overflow-hidden p-3 sm:p-4 rounded-xl bg-secondary flex flex-col gap-2 sm:gap-4 justify-between"
        v-for="(person, index) in people"
        :key="index"
      >
        <video
          class="object-cover w-full aspect-[9/16] rounded-lg"
          :src="`/interviews/interview-${index + 1}.mp4`"
          controls
        />
        <div class="mx-1 sm:mx-2 flex items-center gap-3 sm:gap-4">
          <NuxtImg
            :src="person.image"
            placeholder
            class="rounded-full aspect-square object-cover object-left size-10 sm:size-12"
          />
          <div class="space-y-0.5">
            <h1 class="text-base sm:text-lg lg:text-xl font-semibold">
              {{ $t(`Testimonials.people.${person.key}.name`) }}
            </h1>
            <h3 class="text-sm sm:text-base text-foreground/75">
              {{ $t(`Testimonials.people.${person.key}.role`) }}
            </h3>
          </div>
        </div>
        <div class="flex-1 flex flex-col justify-end">
          <h1 class="text-sm sm:text-base text-foreground flex-1">
            "{{ $t(`Testimonials.people.${person.key}.quote`) }}"
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
