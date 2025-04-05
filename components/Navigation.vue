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
    label: "Navigation.advisory-board",
    href: "/advisory-board",
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

const isMobileMenuOpen = ref(false);
</script>

<template>
  <div
    :class="
      cn(
        'w-full py-8  sticky top-0 xl:top-4 z-50 backdrop-blur-md bg-background/50 max-w-screen-xl mx-auto px-4 xl:rounded-2xl  my-0 xl:my-6 transition-all ease-out duration-200 border border-transparent  ',
        { 'shadow-lg  xl:!border-white/20': isScrolled },
      )
    "
  >
    <div
      class="h-6 flex items-center justify-between w-full max-w-screen-xl mx-auto"
    >
      <NuxtLink :to="localePath('/')" aria-label="Home">
        <Logo class="w-12" />
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.href"
          :to="localePath(item.href)"
          :aria-label="$t(item.label)"
          :title="$t(item.label)"
        >
          <Button class="text-lg mx-2" variant="ghost">
            {{ $t(item.label) }}
          </Button>
        </NuxtLink>

        <NavigationPreviousEditions />
        <NavigationLanguageSelector />
      </div>

      <!-- Mobile Menu Button -->
      <Button
        variant="ghost"
        size="icon"
        class="md:hidden p-2"
        @click="isMobileMenuOpen = true"
        aria-label="Open menu"
      >
        <Icon name="tabler:menu-2" size="32" />
      </Button>

      <!-- Mobile Navigation Sheet -->
      <Sheet :open="isMobileMenuOpen" @update:open="isMobileMenuOpen = $event">
        <SheetContent class="">
          <SheetHeader>
            <SheetTitle class="text-3xl text-left">
              {{ $t("Navigation.menu") }}
            </SheetTitle>
          </SheetHeader>
          <div class="flex flex-col gap-4 mt-4 -m-2">
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.href"
              :to="localePath(item.href)"
              @click="isMobileMenuOpen = false"
              :aria-label="$t(item.label)"
              :title="$t(item.label)"
            >
              <Button class="w-full text-left text-xl py-4" variant="ghost">
                {{ $t(item.label) }}
              </Button>
            </NuxtLink>
            <NavigationPreviousEditions />
            <NavigationLanguageSelector />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</template>

<style lang="scss"></style>
