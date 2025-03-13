<script lang="ts" setup>
const members = [
  {
    image: "/advisory/albena-petkova.png",
    name: "AdvisoryBoard.AlbenaPetkova",
    role: "AdvisoryBoard.AlbenaRole",
    bio: "AdvisoryBoard.AlbenaBio",
    whyJoin: "AdvisoryBoard.AlbenaWhyJoin",
  },
  {
    image: "/advisory/dafinka-lazarova.png",
    name: "AdvisoryBoard.DafinkaLazarova",
    role: "AdvisoryBoard.DafinkaRole",
    bio: "AdvisoryBoard.DafinkaBio",
    whyJoin: "AdvisoryBoard.DafinkaWhyJoin",
  },
];
</script>

<template>
  <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 *:font-sans">
    <LetterPullup
      :animate-directly="true"
      :words="$t('AdvisoryBoard.title')"
      text-class="!text-4xl md:!text-6xl"
      :initial-delay="100"
      key="title-contact"
    />
    <div class="flex flex-col gap-6 mt-4 px-4">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">
        {{ $t("AdvisoryBoard.members") }}
      </h2>
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
                class="size-24 sm:size-30 object-cover object-top rounded-full"
                :alt="$t(member.name)"
              />
            </div>
            <div class="flex-grow space-y-4 tracking-wide">
              <h3
                class="text-lg font-semibold transition-all ease-in-out group-hover:tracking-widest"
              >
                {{ $t(member.name) }}
              </h3>
              <p
                class="text-sm text-gray-500 transition-all ease-in-out group-hover:tracking-wider"
              >
                {{ $t(member.role) }}
              </p>
              <p class="text-sm text-gray-200">
                {{ $t(member.bio) }}
              </p>
              <p class="text-sm italic text-gray-300">
                "{{ $t(member.whyJoin) }}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
