<script lang="ts" setup>
  definePageMeta({
    layout: "default",
  });

  useSeoMeta({
    title: "Home",
    ogTitle: "Home | DIGIPAY",
    twitterTitle: "DIGIPAY",
    description: "DIGIPAY",
  });

  const scrollContainer = useState<HTMLElement | null>("scrollContainer", () => null);
</script>

<template>
  <div ref="scrollContainer" class="flex flex-col gap-20 overflow-hidden">
    <HomeHero />

    <div id="about" class="flex flex-col gap-20">
      <LazyHomeThemes />

      <LazyHomeAbout />

      <div class="pb-20">
        <LazyHomeDifferent />
      </div>

      <LazyHomeInvest />

      <LazyHomeLastYear />

      <LazyHomeVideo />

      <LazyHomePastYears />
    </div>

    <LazyHomeSpeakers />
    <!-- <LazyHomeAgenda /> -->
    <LazyHomePartners />

    <div id="advisory">
      <LazyHomeAdvisory />
    </div>

    <LazyHomeBlog />
  </div>
</template>

<style lang="scss">
  #about {
    scroll-snap-type: y mandatory;
    scroll-margin-top: 125px;
  }

  * {
    user-select: none;
  }
</style>
