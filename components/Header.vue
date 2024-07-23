<script lang="ts" setup>
  const localePath = useLocalePath();
  const { y } = useWindowScroll({ behavior: "smooth" });
</script>

<template>
  <header
    :style="{
      backdropFilter: y > 250 || ($route.path !== '/' && $route.path !== '/en') ? 'blur(15px) saturate(180%)' : 'none',
      backgroundColor:
        y > 250 || ($route.path !== '/' && $route.path !== '/en') ? 'rgb(12 4 39 / 0.5) ' : 'transparent',
      boxShadow:
        y > 700 || ($route.path !== '/' && $route.path !== '/en')
          ? 'inset 0 -1px 0 0px rgba(255, 255, 255, 0.3)'
          : 'none',
    }"
    class="fixed top-0 z-[100] h-24 w-full py-3 transition-all duration-300"
  >
    <div class="flex h-full items-center justify-center gap-3">
      <!-- <NuxtImg alt="DigiPay Logo" preload class="" src="/logo.svg" quality="100" /> -->
      <NuxtLink as-child :href="localePath('/')">
        <Logo class="h-[50px] rounded-full" />
      </NuxtLink>

      <NuxtLink :href="localePath('/#about')">
        <Button class="bg-transparent" variant="ghost">
          {{ $t("about") }}
        </Button>
      </NuxtLink>

      <NuxtLink :href="localePath('/#different')">
        <Button class="bg-transparent" variant="ghost">
          {{ $t("different") }}
        </Button>
      </NuxtLink>

      <NuxtLink :href="localePath('/#invest')">
        <Button class="bg-transparent" variant="ghost">
          {{ $t("invest") }}
        </Button>
      </NuxtLink>

      <NuxtLink :href="localePath('/#partners')">
        <Button class="bg-transparent" variant="ghost">
          {{ $t("partners") }}
        </Button>
      </NuxtLink>

      <NuxtLink :href="localePath('/#advisory')">
        <Button class="bg-transparent" variant="ghost">
          {{ $t("advisory") }}
        </Button>
      </NuxtLink>

      <NuxtLink :href="localePath('/speakers')">
        <Button class="bg-transparent" variant="ghost">
          {{ $t("speakers") }}
        </Button>
      </NuxtLink>

      <NuxtLink :href="localePath('/blog')">
        <Button class="bg-transparent" variant="ghost">
          {{ $t("blog") }}
        </Button>
      </NuxtLink>

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
