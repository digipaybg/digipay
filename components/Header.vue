<script lang="ts" setup>
  const { locale, locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  const availableLocales = computed(() => {
    return locales.value;
  });

  const colorMode = useColorMode();

  let currentColorMode = ref("");
  onMounted(() => {
    currentColorMode.value = localStorage.getItem("nuxt-color-mode")!;
  });
</script>

<template>
  <div class="absolute top-3 flex w-screen justify-around">
    <NuxtImg preload class="rounded-full" src="/logo.jpg" format="webp" quality="50" :height="50" />
    <div class="space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon" variant="ghost">
            <Icon name="carbon:language" size="24" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <NuxtLink v-for="locale in availableLocales" :to="switchLocalePath(locale.code)" class="text-lg">
            <DropdownMenuItem>
              {{ locale.name }}
            </DropdownMenuItem>
          </NuxtLink>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu v-if="$colorMode.value !== 'system'">
        <DropdownMenuTrigger>
          <Button size="icon" variant="ghost">
            <Icon :name="`${$colorMode.value === 'system' ? 'carbon:moon' : 'carbon:sun'}`" size="24" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            @click="
              () => {
                $colorMode.preference = 'system';
              }
            "
            >System</DropdownMenuItem
          >
          <DropdownMenuItem
            @click="
              () => {
                $colorMode.preference = 'dark';
              }
            "
            >Dark</DropdownMenuItem
          >
          <DropdownMenuItem
            @click="
              () => {
                $colorMode.preference = 'light';
              }
            "
            >Light</DropdownMenuItem
          >
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>

<style lang="scss"></style>
