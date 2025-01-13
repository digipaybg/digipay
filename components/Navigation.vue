<script lang="ts" setup>
import { cn } from "@/lib/utils";

const scrolled = useWindowScroll();
const isScrolled = computed(() => scrolled.y.value > 0);

const { t } = useI18n();
const localePath = useLocalePath();
const navigationItems = [
  {
    label: "Navigation.home",
    href: "/",
  },
  {
    label: "Navigation.blog",
    href: "/blog",
  },
  {
    label: "Navigation.contact",
    href: "/contact-us",
  },
];
</script>

<template>
  <div
    :class="
      cn(
        'w-full py-8  sticky top-4 z-50 backdrop-blur-md bg-background/50 max-w-screen-xl mx-auto px-4 xl:rounded-2xl my-6 transition-all ease-out duration-200 border border-transparent ',
        { 'shadow-lg  !border-white/20': isScrolled },
      )
    "
  >
    <div
      class="h-6 flex items-center justify-between w-full max-w-screen-xl mx-auto"
    >
      <NuxtLink to="/">
        <Logo class="w-12" />
      </NuxtLink>
      <div className="space-x-4 flex items-center">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.href"
          :to="localePath(item.href)"
        >
          <Button class="text-lg" variant="link">
            {{ $t(item.label) }}
          </Button>
        </NuxtLink>

        <NavigationPreviousEditions />
        <NavigationLanguageSelector />
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
