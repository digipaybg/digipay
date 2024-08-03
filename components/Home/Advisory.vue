<script lang="ts" setup>
  // TODO: Translate component, name and position
  import SplitType from "split-type";
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

  onMounted(() => {
    const target = document.querySelector("#advisory")!;
    const splitTitle = new SplitType("#advisoryTitle")!;
    const targets = document.querySelectorAll(".advisory-member")!;

    target.classList.add("opacity-0");
    inView(
      target,
      (entry) => {
        if (entry.isIntersecting) {
          target.classList.remove("opacity-0");

          timeline([
            [
              splitTitle.chars!,
              {
                y: [10, 0],
                opacity: [0, 1],
                scale: [0.7, 1],
              },
              {
                delay: stagger(0.05),
                easing: spring({
                  stiffness: 100,
                  damping: 10,
                  mass: 0.5,
                }),
              },
            ],
            [
              targets,
              {
                y: [10, 0],
                opacity: [0, 1],
                scale: [0.7, 1],
              },
              {
                delay: stagger(0.05),
                easing: spring({
                  stiffness: 100,
                  damping: 10,
                  mass: 0.5,
                }),
              },
            ],
          ]);
        }
      },
      { amount: "any", margin: "-10%" },
    );
  });
</script>

<template>
  <div class="relative h-screen max-h-screen">
    <div id="advisory" class="flex flex-col items-center justify-center overflow-visible">
      <h1 id="advisoryTitle" class="mb-6 py-10 text-center text-2xl sm:text-3xl md:text-4xl">
        {{ $t("advisoryboard") }}
      </h1>
      <div class="mt-8 flex w-2/3 flex-col gap-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="(member, index) in advisoryBoard"
            :key="index"
            class="advisory-member col-span-1 flex flex-col items-center justify-center gap-4 rounded-2xl p-8"
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
