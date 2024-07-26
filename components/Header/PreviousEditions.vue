<script lang="ts" setup>
  const years = [2023, 2022, 2021, 2020];
  defineProps({
    htmlClasses: {
      type: String,
      default: "bg-transparent font-semibold uppercase shadow-none",
    },
  });
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" :class="htmlClasses" @click="(e: Event) => e.preventDefault()"
        >{{ $t("previousEditions") }}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <PresenceGroup>
        <Motion
          v-for="(year, index) in years"
          :key="index"
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
          <NuxtLink class="cursor-pointer" :href="`https://digipay.bg/digipay-${year}`">
            <DropdownMenuItem>DIGIPAY {{ year }}</DropdownMenuItem>
          </NuxtLink>
        </Motion>
      </PresenceGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style lang="scss"></style>
