<script lang="ts" setup>
  import { formatDate } from "@vueuse/core";

  const { locale } = useI18n();

  const route = useRoute();
  const path = computed(() => {
    return route.path
      .split("/")
      .filter((x) => !x.endsWith(locale.value))
      .join("/");
  });

  function getImagePath(authorName: string) {
    const translatedName = authorName
      .toLowerCase()
      .replaceAll("а", "a")
      .replaceAll("б", "b")
      .replaceAll("в", "v")
      .replaceAll("г", "g")
      .replaceAll("д", "d")
      .replaceAll("е", "e")
      .replaceAll("ж", "zh")
      .replaceAll("з", "z")
      .replaceAll("и", "i")
      .replaceAll("й", "y")
      .replaceAll("к", "k")
      .replaceAll("л", "l")
      .replaceAll("м", "m")
      .replaceAll("н", "n")
      .replaceAll("о", "o")
      .replaceAll("п", "p")
      .replaceAll("р", "r")
      .replaceAll("с", "s")
      .replaceAll("т", "t")
      .replaceAll("у", "u")
      .replaceAll("ф", "f")
      .replaceAll("х", "h")
      .replaceAll("ц", "ts")
      .replaceAll("ч", "ch")
      .replaceAll("ш", "sh")
      .replaceAll("щ", "sht")
      .replaceAll("ъ", "y")
      .replaceAll("ь", "y")
      .replaceAll("ю", "yu")
      .replaceAll("я", "ya")
      .replaceAll(" ", "-");

    console.log(translatedName);

    return `/authors/${translatedName}.jpg`;
  }

  definePageMeta({
    layout: "blog",
  });
</script>

<template>
  <ContentDoc v-slot="{ doc }" :locale="locale" :path="path" :head="true" class="">
    <article class="px-96 py-24">
      <NuxtImg id="speakerImage" class="mx-auto my-10 w-full rounded-2xl" :src="doc.image" :alt="doc.title" />
      <div class="flex flex-col gap-5">
        <h1 class="text-3xl font-bold">{{ doc.title }}</h1>

        <div class="flex items-center gap-3">
          <NuxtImg class="rounded-full" :src="getImagePath(doc.author)" :alt="doc.author" width="50" height="50" />
          <div class="flex flex-col">
            <h2 class="font-sans text-lg">{{ doc.author }}</h2>
            <div class="flex gap-3">
              <h3 class="font-sans text-sm">
                {{ $t("readingTime", { minutes: Math.round(doc.readingTime.minutes) }) }}
              </h3>
              <h3 class="font-sans text-sm">{{ formatDate(new Date(doc.date as EpochTimeStamp), "DD/MM/YYYY") }}</h3>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <ContentRenderer id="bodyText" class="tracking-lg font-sans text-lg" :value="doc" />
    </article>
  </ContentDoc>
</template>

<style lang="scss">
  hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #11e7ed, rgba(0, 0, 0, 0));
    margin: 2rem 0;
  }

  #bodyText {
    * {
      font-family: "Arial", sans-serif;
    }

    h1 {
      font-size: 20px;
    }

    h2 {
      font-size: 25px;
      padding-top: 30px;
      color: #e1faff;
    }

    p {
      font-size: 16px;
      padding-block: 10px;
    }

    h3 {
      font-size: 14px;
    }
  }
</style>
