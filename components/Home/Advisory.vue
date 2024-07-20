<script lang="ts" setup>
  const advisoryBoard = [
    {
      name: "Stoilka Arsova",
      position: "Director of National card and payment scheme, part of Borica AD",
      image: "/advisory/stoilka_arsova.jpg",
      shadow: "primary",
    },
    {
      name: "Svetlin Lazarov",
      position: "Head of Cyber Intelligence and Digital Forensics Unit at GDCOC",
      image: "/advisory/svetlin_lazarov.jpg",
      shadow: "white",
    },
    {
      name: "Goran Angelov",
      position: "Founder and CEO, IBS Bulgaria",
      image: "/advisory/goran_angelov.jpg",
      shadow: "green-900",
    },
    {
      name: "Boris Goncharov",
      position: "Chief Visionary Officer, AMATAS",
      image: "/advisory/boris_goncharov.jpg",
      shadow: "gray",
    },
    {
      name: "Pavel Kaminsky",
      position: "Founder, 7Security",
      image: "/advisory/pavel_kaminsky.jpg",
      shadow: "blue",
    },
  ];
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-center text-4xl font-bold">Advisory Board</h1>
    <div class="mt-8 flex w-2/3 flex-col gap-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="(member, index) in advisoryBoard"
          :key="index"
          class="col-span-1 flex flex-col items-center justify-center gap-4 rounded-2xl p-8"
        >
          <NuxtImg
            preload
            :src="member.image"
            class="aspect-square h-60 w-60 rounded-full border-2 border-[#67CBDD] object-cover object-center"
            :class="`${index === 0 ? 'object-right' : ''} `"
            format="webp"
            quality="80"
            :alt="member.name"
          />
          <h3 class="text-xl font-bold">{{ member.name }}</h3>
          <p class="text-center text-gray-700 dark:text-gray-300">{{ member.position }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
