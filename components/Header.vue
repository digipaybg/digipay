<script lang="ts" setup>
  const { locale, locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  const availableLocales = computed(() => {
    return locales.value;
  });

  const themes = ["system", "dark", "light"];
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
          <div
            v-for="(locale, index) in availableLocales"
            :key="locale.code"
            v-motion
            :initial="{
              opacity: 0,
              scale: 0.7,
              y: -20,
              filter: 'blur(10px)',
            }"
            :enter="{
              filter: 'blur(0px)',
              scale: 1,

              opacity: 1,
              y: 0,
              transition: {
                delay: index * 100 + 100,
              },
            }"
            :leave="{
              opacity: 0,
              y: -10,
            }"
          >
            <NuxtLink :to="switchLocalePath(locale.code)" class="text-lg">
              <DropdownMenuItem>
                {{ locale.name }}
              </DropdownMenuItem>
            </NuxtLink>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu v-if="$colorMode.value !== 'system'">
        <DropdownMenuTrigger>
          <Button size="icon" variant="ghost">
            <Icon :name="`${$colorMode.value === 'system' ? 'carbon:moon' : 'carbon:sun'}`" size="24" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div
            v-for="(theme, index) in themes"
            :key="theme"
            v-motion
            :initial="{
              opacity: 0,
              scale: 0.7,
              y: -20,
              filter: 'blur(10px)',
            }"
            :enter="{
              filter: 'blur(0px)',
              scale: 1,
              opacity: 1,
              y: 0,
              transition: {
                delay: index * 100 + 100,
              },
            }"
            :leave="{
              opacity: 0,
              y: -10,
            }"
          >
            <DropdownMenuItem
              @click="
                () => {
                  $colorMode.preference = theme;
                }
              "
              class="capitalize"
            >
              {{ theme }}
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>

<style lang="scss"></style>
