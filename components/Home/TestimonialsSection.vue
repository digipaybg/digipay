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
  <div class="px-2 sm:px-4 md:px-6">
    <LetterPullup
      text-class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 sm:mt-16 mb-2 sm:mb-8 text-center"
      container-class="mx-auto text-center justify-center"
      :words="$t('Testimonials.title')"
      :initial-delay="0"
      key="topics"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
      <div
        class="flex-1 overflow-hidden p-2 sm:p-3 md:p-4 rounded-xl bg-secondary flex flex-col gap-2 sm:gap-3 md:gap-4 justify-between"
        v-for="(person, index) in people"
        :key="index"
      >
        <video
          class="object-cover w-full aspect-[16/9] sm:aspect-[9/16] rounded-lg"
          :src="`/interviews/interview-${index + 1}.mp4`"
          controls
        />
        <div class="mx-1 sm:mx-2 flex items-center gap-2 sm:gap-3 md:gap-4">
          <NuxtImg
            :src="person.image"
            placeholder
            class="rounded-full aspect-square object-cover object-left size-8 sm:size-14"
          />
          <div class="space-y-0.5 sm:space-y-1">
            <h1 class="text-base sm:text-xl lg:text-2xl font-semibold">
              {{ $t(`Testimonials.people.${person.key}.name`) }}
            </h1>
            <h3 class="text-sm sm:text-lg text-foreground/75">
              {{ $t(`Testimonials.people.${person.key}.role`) }}
            </h3>
          </div>
        </div>
        <div class="flex-1 flex flex-col justify-end mt-1 sm:mt-2">
          <h1 class="text-sm sm:text-lg text-foreground flex-1 leading-relaxed">
            "{{ $t(`Testimonials.people.${person.key}.quote`) }}"
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
