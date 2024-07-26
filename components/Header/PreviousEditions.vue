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
      <NuxtLink v-for="(year, index) in years" :key="index" :href="`https://digipay.bg/digipay-${year}`">
        <DropdownMenuItem>DIGIPAY {{ year }} </DropdownMenuItem>
      </NuxtLink>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style lang="scss"></style>
