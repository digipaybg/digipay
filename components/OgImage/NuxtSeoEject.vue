<script setup>
import { useOgImageRuntimeConfig } from "#og-image/app/utils";
import { useSiteConfig } from "#site-config/app/composables";
import { computed, defineComponent, h, resolveComponent } from "vue";
const props = defineProps({
  colorMode: { type: String, required: false },
  title: { type: String, required: false, default: "title" },
  icon: { type: [String, Boolean], required: false },
  siteName: { type: String, required: false },
  siteLogo: { type: String, required: false },
  theme: { type: String, required: false, default: "#00dc82" },
  image: { type: String, required: true },
});
const HexRegex = /^#(?:[0-9a-f]{3}){1,2}$/i;
const runtimeConfig = useOgImageRuntimeConfig();
const colorMode = computed(() => {
  return props.colorMode || runtimeConfig.colorPreference || "dark";
});
const themeHex = computed(() => {
  if (HexRegex.test(props.theme)) return props.theme;
  if (HexRegex.test(`#${props.theme}`)) return `#${props.theme}`;
  if (props.theme.startsWith("rgb")) {
    const rgb = props.theme
      .replace("rgb(", "")
      .replace("rgba(", "")
      .replace(")", "")
      .split(",")
      .map((v) => Number.parseInt(v.trim(), 10));
    const hex = rgb
      .map((v) => {
        const hex2 = v.toString(16);
        return hex2.length === 1 ? `0${hex2}` : hex2;
      })
      .join("");
    return `#${hex}`;
  }
  return "#FFFFFF";
});
const themeRgb = computed(() => {
  return themeHex.value
    .replace("#", "")
    .match(/.{1,2}/g)
    ?.map((v) => Number.parseInt(v, 16))
    .join(", ");
});
const siteConfig = useSiteConfig();
const siteName = computed(() => {
  return props.siteName || siteConfig.name;
});
const siteLogo = computed(() => {
  return props.siteLogo || siteConfig.logo;
});
const IconComponent = runtimeConfig.hasNuxtIcon
  ? resolveComponent("Icon")
  : defineComponent({
      render() {
        return h("div", "missing @nuxt/icon");
      },
    });
if (
  typeof props.icon === "string" &&
  !runtimeConfig.hasNuxtIcon &&
  process.dev
) {
  console.warn(
    "Please install `@nuxt/icon` to use icons with the fallback OG Image component.",
  );
  console.log("\nnpx nuxi module add icon\n");
}
</script>

<template>
  <div
    class="w-full h-full flex justify-between relative p-[60px]"
    :class="[
      colorMode === 'light'
        ? ['bg-white', 'text-gray-900']
        : ['bg-gray-900', 'text-white'],
    ]"
  >
    <div
      class="flex absolute top-0 right-[-100%]"
      :style="{
        width: '200%',
        height: '200%',
        backgroundImage: `radial-gradient(circle, rgba(${themeRgb}, 0.5) 0%,  ${
          colorMode === 'dark'
            ? 'rgba(5, 5, 5,0.3)'
            : 'rgba(255, 255, 255, 0.7)'
        } 50%, ${
          props.colorMode === 'dark'
            ? 'rgba(5, 5, 5,0)'
            : 'rgba(255, 255, 255, 0)'
        } 70%)`,
      }"
    />
    <div class="h-full w-full justify-between relative">
      <div class="flex flex-row justify-between items-start">
        <div class="flex flex-col w-full max-w-[65%]">
          <h1
            class="m-0 font-bold text-[60px] leading-[4rem]"
            style="display: block; text-overflow: ellipsis"
          >
            {{ title }}
          </h1>
          <div class="flex flex-row items-center mt-6">
            <img v-if="siteLogo" :src="siteLogo" height="50" class="mr-3" />
            <svg
              v-else
              height="40"
              width="40"
              class="mr-3"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                :fill="theme.includes('#') ? theme : `#${theme}`"
                d="M62.3,-53.9C74.4,-34.5,73.5,-9,67.1,13.8C60.6,36.5,48.7,56.5,30.7,66.1C12.7,75.7,-11.4,74.8,-31.6,65.2C-51.8,55.7,-67.9,37.4,-73.8,15.7C-79.6,-6,-75.1,-31.2,-61.1,-51C-47.1,-70.9,-23.6,-85.4,0.8,-86C25.1,-86.7,50.2,-73.4,62.3,-53.9Z"
                transform="translate(100 100)"
              />
            </svg>
            <p v-if="siteName" style="font-size: 32px" class="font-bold ml-2">
              {{ siteName }}
            </p>
          </div>
        </div>
        <div
          v-if="rightImage"
          class="relative w-[30%] flex justify-end items-start"
        >
          <img
            :src="rightImage"
            alt="Right Side"
            class="w-full h-auto object-cover"
            style="
              mask-image: linear-gradient(to left, black 80%, transparent 100%);
              -webkit-mask-image: linear-gradient(
                to left,
                black 80%,
                transparent 100%
              );
            "
          />
        </div>
        <div
          v-else-if="Boolean(icon)"
          style="width: 30%"
          class="flex justify-end"
        >
          <IconComponent
            :name="icon"
            size="250px"
            style="margin: 0 auto; opacity: 0.7"
          />
        </div>
      </div>
    </div>
  </div>
</template>
