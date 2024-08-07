<script lang="ts" setup>
  import { breakpointsTailwind } from "@vueuse/core";

  const localePath = useLocalePath();
  const { y } = useWindowScroll({ behavior: "smooth" });
  const showMenu = useState("hamburgerOpen", () => false);

  const route = useRoute();

  const showBlur = computed(() => {
    if (showMenu.value) return false;

    return y.value > 250 || (route.path !== "/" && route.path !== "/en");
  });

  const links = ["/", "/speakers", "/partners", "/blog", "/advisory-board", "/contact-us"];

  const breakpoints = useBreakpoints(breakpointsTailwind);

  const { lenis } = useLenis();

  watch(breakpoints.smaller("lg"), (value) => {
    if (!value) {
      showMenu.value = false;
      lenis.value.start();
    }
  });
</script>

<template>
  <header
    :style="{
      backdropFilter: showBlur ? 'blur(15px) saturate(180%)' : 'none',
      backgroundColor:
        y > 250 || ($route.path !== '/' && $route.path !== '/en') ? 'rgb(12 4 39 / 0.5) ' : 'transparent',
      boxShadow:
        y > 700 || ($route.path !== '/' && $route.path !== '/en')
          ? 'inset 0 -1px 0 0px rgba(255, 255, 255, 0.3)'
          : 'none',
    }"
    class="fixed top-0 z-50 h-24 w-full overflow-visible py-3 transition-all"
    :class="{ 'duration-300': !showMenu, 'duration-100': showMenu }"
  >
    <NuxtLink class="absolute left-0 top-0 h-10 w-10" as-child :href="'https://www.youtube.com/watch?v=uHgt8giw1LY'">
    </NuxtLink>
    <div
      class="flex h-full w-screen items-center justify-between gap-3 overflow-visible px-10 xl:justify-center xl:px-0"
    >
      <!-- <NuxtImg alt="DIGIPAY Logo" preload class="" src="/logo.svg" quality="100" /> -->
      <Motion
        :initial="{
          opacity: 0,
          scale: 0,
          rotate: 90,
          filter: 'blur(10px)',
        }"
        :animate="{
          opacity: 1,
          scale: 1,
          rotate: 0,
          filter: 'blur(0px)',
          transition: {
            delay: 0.2,
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
        <NuxtLink as-child :href="localePath('/')">
          <Logo class="h-[50px] rounded-full" />
        </NuxtLink>
      </Motion>

      <div class="hidden gap-3 xl:flex">
        <Motion
          v-for="(link, index) in links"
          :key="index"
          :initial="{
            opacity: 0,
            scale: 0.7,
            y: -50,
            filter: 'blur(10px)',
          }"
          :in-view="{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              delay: index * 0.1 + 0.2,
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
            y: -50,
            filter: 'blur(10px)',
          }"
        >
          <HeaderLink :link :showMenu />
        </Motion>

        <Motion
          :initial="{
            opacity: 0,
            scale: 0.7,
            y: -50,
            filter: 'blur(10px)',
          }"
          :in-view="{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              delay: links.length * 0.1 + 0.2,
              duration: 0.4,
              easing: spring({
                damping: 10,
                stiffness: 100,
                mass: 0.4,
                velocity: 5,
              }),
            },
          }"
        >
          <HeaderPreviousEditions />
        </Motion>
      </div>
      <div class="flex gap-2 overflow-visible">
        <HeaderLanugageSelector />
        <div v-if="breakpoints.smaller('xl').value" class="overflow-visible">
          <HeaderMenu :links="links" />
        </div>
      </div>
    </div>

    <!-- <HeaderDarkModeToogle /> -->
    <!-- <div class="absolute inset-0 bottom-0 -z-10 h-full backdrop-blur-2xl" /> -->
  </header>
</template>

<style lang="scss">
  .shadow-custom {
    box-shadow: inset 0 -1px 0 0 rgba(255, 255, 255, 0.5);
  }
</style>
