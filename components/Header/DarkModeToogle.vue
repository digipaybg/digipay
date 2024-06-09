<script lang="ts" setup>
  const themes = ["system", "dark", "light"];
</script>

<template>
  <DropdownMenu v-if="$colorMode.value !== 'system'">
    <DropdownMenuTrigger>
      <Button size="icon" variant="ghost">
        <Icon
          :name="`${$colorMode.value !== 'system' && $colorMode.value === 'dark' ? 'carbon:moon' : 'carbon:sun'}`"
          size="24"
        />
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
          {{ $t(theme) }}
        </DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style lang="scss"></style>
