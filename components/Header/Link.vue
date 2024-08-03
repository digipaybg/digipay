<script lang="ts" setup>
  import { breakpointsTailwind } from "@vueuse/core";

  defineProps({
    link: {
      type: String,
      required: true,
    },
  });

  const localePath = useLocalePath();
  const showMenu = useState("hamburgerOpen", () => false);

  const breakPoints = useBreakpoints(breakpointsTailwind);
</script>

<template>
  <NuxtLink :href="localePath(link)" @click="showMenu = false">
    <Button
      :class="{
        'bg-[#1b2243]': $route.path === link,
        'bg-transparent': $route.path !== link,
        'w-full p-8 text-2xl': breakPoints.smaller('lg').value,
      }"
      class="font-semibold uppercase shadow-none"
      variant="ghost"
    >
      {{ link !== "/" ? $t(link.replaceAll("#", "").replaceAll("-", "").replaceAll("/", "")) : $t("home") }}
    </Button>
  </NuxtLink>
</template>

<style lang="scss"></style>
