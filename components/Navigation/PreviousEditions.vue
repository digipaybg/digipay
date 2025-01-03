<script lang="ts" setup>
const { t } = useI18n();

const previousEditions = [
  {
    year: 2024,
    href: "https://2024.digipay.bg",
  },
  {
    year: 2023,
    href: "https://old.digipay.bg/digipay-2023/",
  },
  {
    year: 2022,
    href: "https://old.digipay.bg/digipay-2022/",
  },
  {
    year: 2021,
    href: "https://old.digipay.bg/digipay-2021/",
  },
  {
    year: 2020,
    href: "https://old.digipay.bg/digipay-2020/",
  },
];
</script>

<template>
  <Dialog>
    <DialogTrigger :as-child="true">
      <Button variant="link" class="text-lg">
        {{ t("Navigation.previousEditions") }}
      </Button>
    </DialogTrigger>

    <DialogContent class="p-4">
      <DialogHeader class="p-3">
        <DialogTitle class="font-bold text-xl">
          {{ t("Navigation.previousEditions") }}
        </DialogTitle>
      </DialogHeader>

      <div class="flex flex-wrap w-full gap-4">
        <NuxtLink
          v-for="edition in previousEditions"
          :key="edition.year"
          :to="edition.href"
        >
          <Button variant="link" class="text-lg">
            DIGIPAY {{ edition.year }}
          </Button>
        </NuxtLink>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style lang="scss"></style>
