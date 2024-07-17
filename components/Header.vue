<script setup lang="ts">
  const localePath = useLocalePath();
</script>

<template>
  <header
    class="fixed top-0 z-50 -mb-px w-full border-b border-gray-200 bg-background/75 py-3 backdrop-blur dark:border-gray-800 lg:mb-0 lg:border-0"
  >
    <div class="flex items-center justify-center gap-3">
      <!-- <NuxtImg alt="DigiPay Logo" preload class="" src="/logo.svg" quality="100" /> -->
      <Logo class="h-[50px] cursor-pointer rounded-full" @click="() => $router.push('/')" />

      <a href="/" as-child>
        <Button variant="ghost" class="bg-transparent">
          {{ $t("about") }}
        </Button>
      </a>
      <a href="#speakers">
        <Button variant="ghost" class="bg-transparent">
          {{ $t("speakers") }}
        </Button>
      </a>
      <a href="#speakers" as-child>
        <Button variant="ghost" class="bg-transparent">
          {{ $t("agenda") }}
        </Button>
      </a>
      <a href="#schedule" as-child>
        <Button variant="ghost" class="bg-transparent">
          {{ $t("partners") }}
        </Button>
      </a>
      <NuxtLink :href="localePath('/blog')" as-child>
        <Button variant="ghost" class="bg-transparent">
          {{ $t("blog") }}
        </Button>
      </NuxtLink>
      <a href="#sponsors" as-child>
        <Button variant="ghost" class="bg-transparent">
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
</style>
