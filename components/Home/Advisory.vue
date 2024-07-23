<script lang="ts" setup>
  // TODO: Translate component, name and position
  const advisoryBoard = [
    {
      name: "stoilka",
      position: "stoilkaPosition",
      image: "/advisory/stoilka_arsova.jpg",
      shadow: "primary",
    },
    {
      name: "svetlin",
      position: "svetlinPosition",
      image: "/advisory/svetlin_lazarov.jpg",
      shadow: "white",
    },
    {
      name: "goran",
      position: "goranPosition",
      image: "/advisory/goran_angelov.jpg",
      shadow: "green-900",
    },
    {
      name: "boris",
      position: "borisPosition",
      image: "/advisory/boris_goncharov.jpg",
      shadow: "gray",
    },
    {
      name: "miglen",
      position: "miglenPosition",
      image: "/advisory/miglen_evlogiev.JPG",
    },
    {
      name: "pavel",
      position: "pavelPosition",
      image: "/advisory/pavel_kaminsky.jpg",
      shadow: "blue",
    },
  ];
</script>

<template>
  <div id="advisory" class="relative flex flex-col items-center justify-center overflow-visible">
    <h1 class="text-center text-4xl font-bold">{{ $t("advisory") }}</h1>
    <div class="mt-8 flex w-2/3 flex-col gap-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="(member, index) in advisoryBoard"
          :key="index"
          class="col-span-1 flex flex-col items-center justify-center gap-4 rounded-2xl p-8"
        >
          <NuxtImg
            :src="member.image"
            class="aspect-square h-60 rounded-full border-2 border-[#67CBDD] object-cover object-center"
            :class="`${index === 0 || index === 4 ? 'object-right' : ''} `"
            format="webp"
            quality="30"
            :alt="$t(member.name)"
            loading="lazy"
          />
          <h3 class="text-xl font-bold">{{ $t(member.name) }}</h3>
          <p class="text-center text-gray-700 dark:text-gray-300">{{ $t(member.position) }}</p>
        </div>
      </div>
    </div>
    <circle
      class="absolute left-[50%] top-[45%] -z-[50] aspect-square w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#68CBDE]/25 blur-[200px]"
    />
  </div>
</template>

<style lang="scss">
  #advisory {
    scroll-margin-top: 125px;
  }
</style>
