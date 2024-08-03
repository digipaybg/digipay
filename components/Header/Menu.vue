<script setup>
  const showMenu = useState("hamburgerOpen", () => false);
  const { lenis } = useLenis();

  watch(showMenu, (value) => {
    if (value) {
      lenis.value.stop();
    } else {
      lenis.value.start();
    }
  });

  defineProps({
    links: Array,
  });
</script>

<template>
  <div>
    <Motion
      :initial="{
        opacity: 0,
        y: -20,
        filter: 'blur(10px)',
      }"
      :animate="{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          delay: 0.4,
          duration: 0.4,
          easing: spring({
            damping: 10,
            stiffness: 100,
            mass: 0.7,
            velocity: 5,
          }),
        },
      }"
    >
      <Button size="icon" variant="ghost" @click="() => (showMenu = !showMenu)">
        <Icon name="i-icon-park-outline-hamburger-button" size="24" />
      </Button>
    </Motion>
    <Presence>
      <Motion
        v-show="showMenu"
        :animate="{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transitionDelay: 0.1,
        }"
        :exit="{
          opacity: 0,
          y: -20,
          filter: 'blur(10px)',
        }"
        :initial="{
          opacity: 0,
          y: -20,
          filter: 'blur(10px)',
        }"
        class="absolute left-0 top-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center gap-4"
        :style="{
          background: 'rgb(12 5 40 / 0.7)',
          backdropFilter: 'blur(10px) !important',
        }"
        @click="() => (showMenu = false)"
      >
        <!-- rgb(12 5 40 / 0.5 -->
        <Button
          size="icon"
          variant="outline"
          class="absolute right-12 top-20 md:right-24 lg:right-32"
          @click="() => (showMenu = !showMenu)"
        >
          <Icon name="i-material-symbols-close" size="24" />
        </Button>

        <Motion
          v-for="(link, index) in links"
          :key="index"
          :initial="{
            opacity: 0,
            scale: 0.7,
            y: -20,
            filter: 'blur(10px)',
          }"
          :in-view="{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              delay: index * 0.05 + 0.2,
              duration: 0.4,
              easing: spring({
                damping: 10,
                stiffness: 100,
                mass: 0.4,
                velocity: 5,
              }),
            },
          }"
          :exit="{
            opacity: 0,
            y: -20,
            filter: 'blur(10px)',
          }"
          class="w-96"
        >
          <!-- <NuxtLink class="w-full" :href="localePath(link)" @click="showMenu = false">
            <Button class="w-full bg-transparent p-8 text-2xl shadow-none" variant="ghost">
              {{ $t(link.replaceAll("#", "").replaceAll("/", "")) }}
            </Button>
          </NuxtLink> -->
          <HeaderLink :link :showMenu />
        </Motion>

        <Motion
          :initial="{
            opacity: 0,
            scale: 0.7,
            y: -20,
            filter: 'blur(10px)',
          }"
          :in-view="{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              delay: links.length * 0.05 + 0.2,
              duration: 0.4,
              easing: spring({
                damping: 10,
                stiffness: 100,
                mass: 0.4,
                velocity: 5,
              }),
            },
          }"
          :exit="{
            opacity: 0,
            y: -20,
            filter: 'blur(10px)',
          }"
          class="w-96"
        >
          <HeaderPreviousEditions html-classes="w-full bg-transparent p-8 text-2xl shadow-none" />
        </Motion>
      </Motion>
    </Presence>
  </div>
</template>

<style lang="scss"></style>
