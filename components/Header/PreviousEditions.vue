<script lang="ts" setup>
  import { breakpointsTailwind } from "@vueuse/core";

  const years = [2023, 2022, 2021, 2020];
  defineProps({
    htmlClasses: {
      type: String,
      default: "bg-transparent font-semibold uppercase shadow-none",
    },
  });

  const breakPoints = useBreakpoints(breakpointsTailwind);
  const localePath = useLocalePath();
</script>

<template>
  <Dialog>
    <DialogTrigger
      :class="{
        'w-full p-8 text-2xl': breakPoints.smaller('xl').value,
      }"
      class="bg-transparent font-semibold uppercase shadow-none"
    >
      <Button
        variant="ghost"
        :class="{
          'w-full p-8 text-2xl': breakPoints.smaller('xl').value,
        }"
        class="bg-transparent font-semibold uppercase shadow-none"
        @click="(e: Event) => e.preventDefault()"
        >{{ $t("previousEditions") }}
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle class="text-2xl">{{ $t("previousEditions") }}</DialogTitle>
      <div class="flex w-full cursor-pointer flex-wrap">
        <PresenceGroup class="">
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
            <NuxtLink class="cursor-pointer" :href="`https://old.digipay.bg/digipay-${year}`">
              <Button variant="link">DIGIPAY {{ year }}</Button>
            </NuxtLink>
          </Motion>
        </PresenceGroup>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style lang="scss"></style>
