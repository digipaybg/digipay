<script lang="ts" setup>
  const themes = ["system", "dark", "light"];
</script>

<template>
  <DropdownMenu v-if="$colorMode.value !== 'system'">
    <DropdownMenuTrigger>
      <Presence>
        <Motion
          :initial="{
            opacity: 0,
            scale: 0.7,
            y: -20,
            filter: 'blur(10px)',
            width: 0,
            // opacity: 0,
          }"
          :animate="{
            filter: 'blur(0px)',
            scale: 1,
            opacity: 1,
            y: 0,
            width: 'auto',
            transition: {
              duration: 0.3,
              easing: spring({
                damping: 10,
                stiffness: 100,
                mass: 0.4,
                velocity: 5,
              }),
            },
          }"
        >
          <Button size="icon" variant="ghost" v-if="$colorMode.value !== 'system'">
            <Icon
              :name="`${$colorMode.value !== 'system' && $colorMode.value === 'dark' ? 'carbon:moon' : 'carbon:sun'}`"
              size="24"
            />
          </Button>
        </Motion>
      </Presence>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <PresenceGroup>
        <Motion
          v-for="(theme, index) in themes"
          :key="theme"
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
        >
          <DropdownMenuItem
            @click="
              () => {
                $colorMode.preference = theme;
              }
            "
            class="capitalize"
          >
            {{ $t(theme) }}
          </DropdownMenuItem>
        </Motion>
      </PresenceGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style lang="scss"></style>
