<script lang="ts" setup>
  const { locale, locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  const availableLocales = computed(() => {
    return locales.value;
  });
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button size="icon" variant="ghost">
        <Icon name="carbon:language" size="24" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <div
        v-for="(locale, index) in locales"
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
</template>

<style lang="scss"></style>
