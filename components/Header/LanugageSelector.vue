<script lang="ts" setup>
  const { locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Motion
        :initial="{
          opacity: 0,
          scale: 0.7,
          y: -20,
          filter: 'blur(10px)',
        }"
        :animate="{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            delay: 0.2,
            duration: 0.4,
            easing: spring({
              damping: 10,
              stiffness: 100,
              mass: 0.7,
              velocity: 5,
            }),
          },
        }"
      >
        <Button size="icon" variant="ghost">
          <Icon name="carbon:language" size="24" />
        </Button>
      </Motion>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <PresenceGroup>
        <Motion
          v-for="(locale, index) in locales"
          :key="locale.code"
          :initial="{
            opacity: 0,
            scale: 0.7,
            y: -20,
            filter: 'blur(10px)',
            // opacity: 0,
          }"
          :in-view="{
            // opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
              delay: index * 0.05,
              duration: 0.3,
              easing: spring({
                damping: 10,
                stiffness: 100,
                mass: 0.4,
                velocity: 5,
              }),
            },
          }"
          class="cursor-pointer"
        >
          <NuxtLink :to="switchLocalePath(locale.code)" class="text-lg">
            <DropdownMenuItem>
              {{ locale.name }}
            </DropdownMenuItem>
          </NuxtLink>
        </Motion>
      </PresenceGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style lang="scss"></style>
