<script lang="ts" setup>
const members = [
  {
    image: "/advisory/svetlin-lazarov.png",
    name: "SvetlinLazarov",
    role: "SvetlinRole",
    bio: "SvetlinBio",
    // whyJoin: "SvetlinWhyJoin",
  },
  {
    image: "/advisory/albena-petkova.png",
    name: "AlbenaPetkova",
    role: "AlbenaRole",
    bio: "AlbenaBio",
    whyJoin: "AlbenaWhyJoin",
  },
  {
    image: "/advisory/goran-angelov.png",
    name: "GoranAngelov",
    role: "GoranRole",
    bio: "GoranBio",
    whyJoin: "GoranWhyJoin",
  },
  {
    image: "/advisory/dafinka-lazarova.png",
    name: "DafinkaLazarova",
    role: "DafinkaRole",
    bio: "DafinkaBio",
    whyJoin: "DafinkaWhyJoin",
  },
  {
    image: "/advisory/hristian-prashkov.jpeg",
    name: "HristianPrashkov",
    role: "HristianRole",
    bio: "HristianBio",
    whyJoin: "HristianWhyJoin",
  },

  {
    image: "/advisory/filip-mutafis.JPG",
    name: "FilipMutafis",
    role: "FilipRole",
    bio: "FilipBio",
    // whyJoin: "FilipWhyJoin",
  },
  {
    image: "/advisory/pavel-kaminsky.jpeg",
    name: "PavelKaminsky",
    role: "PavelRole",
    bio: "PavelBio",
    whyJoin: "PavelWhyJoin",
  },
];
</script>

<template>
  <div class="max-w-screen-2xl space-y-8 mx-auto px-4 sm:px-6 *:font-sans">
    <LetterPullup
      :animate-directly="true"
      :words="$t('AdvisoryBoard.title')"
      text-class="!text-4xl md:!text-4xl"
      :initial-delay="100"
      key="title-contact"
    />
    <div class="flex flex-col gap-6 mt-4 px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          v-for="member in members"
          :key="member.name"
          class="bg-primary/5 rounded-lg shadow-sm p-4 transition-all ease-in-out hover:shadow-md group group-hover:bg-primary/10 group-hover:shadow-md"
        >
          <div class="flex flex-col sm:flex-row gap-4 items-start">
            <div class="flex-shrink-0">
              <NuxtImg
                :src="member.image"
                :class="[
                  'size-24 sm:size-30 object-top object-cover rounded-full',
                  member.name === 'HristianPrashkov' ? 'rotate-90' : '',
                ]"
                :alt="$t(`AdvisoryBoard.${member.name}`)"
              />
            </div>
            <div class="flex-grow space-y-4 tracking-wide">
              <h3
                class="text-lg font-semibold transition-all ease-in-out group-hover:tracking-widest"
              >
                {{ $t(`AdvisoryBoard.${member.name}`) }}
              </h3>
              <p
                class="text-sm text-gray-500 transition-all ease-in-out group-hover:tracking-wider"
              >
                {{ $t(`AdvisoryBoard.${member.role}`) }}
              </p>
              <p class="text-sm text-gray-200">
                {{ $t(`AdvisoryBoard.${member.bio}`) }}
              </p>

              <p v-if="member.whyJoin" class="text-sm italic text-gray-300">
                "{{ $t(`AdvisoryBoard.${member.whyJoin}`) }}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.rotate-90 {
  transform: rotate(90deg);
}
</style>
