<script lang="ts" setup>
  const localePath = useLocalePath();

  // defineProps({
  //   y: {
  //     type: Number,
  //     required: true,
  //   },
  // });
  const { y } = useWindowScroll({ behavior: "smooth" });
</script>
<!-- :class="{
      'shadow-custom': y > 700,
      'bg-[#0c0427] bg-opacity-20 backdrop-blur': y > 250,
    }" -->

<template>
  <header
    :style="{
      backdropFilter: y > 250 || $route.fullPath !== '/' ? 'blur(15px) saturate(180%)' : 'none',
      backgroundColor: y > 250 || $route.fullPath !== '/' ? 'rgb(12 4 39 / 0.5) ' : 'transparent',
      boxShadow: y > 700 || $route.fullPath !== '/' ? 'inset 0 -1px 0 0px rgba(255, 255, 255, 0.3)' : 'none',
    }"
    class="fixed top-0 z-[1000] h-24 w-full py-3 transition-all duration-300"
  >
    <div class="flex h-full items-center justify-center gap-3">
      <!-- <NuxtImg alt="DigiPay Logo" preload class="" src="/logo.svg" quality="100" /> -->
      <Logo class="h-[50px] cursor-pointer rounded-full" @click="() => $router.push('/')" />

      <a as-child href="/">
        <Button class="bg-transparent" variant="ghost">
          {{ $t("about") }}
        </Button>
      </a>
      <a href="#speakers">
        <Button class="bg-transparent" variant="ghost">
          {{ $t("speakers") }}
        </Button>
      </a>
      <a as-child href="#speakers">
        <Button class="bg-transparent" variant="ghost">
          {{ $t("agenda") }}
        </Button>
      </a>
      <a as-child href="#schedule">
        <Button class="bg-transparent" variant="ghost">
          {{ $t("partners") }}
        </Button>
      </a>
      <NuxtLink :href="localePath('/blog')" as-child>
        <Button class="bg-transparent" variant="ghost">
          {{ $t("blog") }}
        </Button>
      </NuxtLink>
      <a as-child href="#sponsors">
        <Button class="bg-transparent" variant="ghost">
          {{ $t("contacts") }}
        </Button>
      </a>
      <HeaderLanugageSelector />
    </div>

    <!-- <HeaderDarkModeToogle /> -->
    <!-- <div class="absolute inset-0 bottom-0 -z-10 h-full backdrop-blur-2xl" /> -->
  </header>
</template>

<style lang="scss">
  div.absolute.inset-0.-z-10 {
    mask-image: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }

  .shadow-custom {
    box-shadow: inset 0 -1px 0 0 rgba(255, 255, 255, 0.5);
  }
</style>
