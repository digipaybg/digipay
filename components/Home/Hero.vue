<script lang="ts" setup>
  import SplitType from "split-type";

  const leftIcons = ["/planet.svg", "/money.svg", "/phone.svg"];
  const rightIcons = ["/ai.svg", "/security.svg", "/lock.svg"];

  const backgroundVideo = ref<HTMLVideoElement | null>(null);

  onMounted(() => {
    if (backgroundVideo.value) {
      backgroundVideo.value.play().catch((error) => {
        console.error("Error attempting to play the video:", error);
      });
    }

    const headerText = document.querySelectorAll(".header-text")!;

    headerText.forEach((text) => {
      text.classList.remove("opacity-0");
    });

    const split = new SplitType(".header-text");

    animate(
      split.chars!,
      {
        y: [100, 0],
        opacity: [0, 1],
        scale: [0.7, 1],
      },
      {
        delay: stagger(0.1, {
          start: 0.1,
        }),
        easing: spring({
          stiffness: 100,
          damping: 15,
          mass: 1,
        }),
      },
    );
  });

  const { locale } = useI18n();

  const reasons = ["reason1", "reason2", "reason3"];
</script>

<template>
  <div class="relative h-screen select-none">
    <!-- <NuxtImg
      preload
      priority
      src="/background.png"
      alt="Hero"
      class="absolute inset-0 left-1/2 top-0 -z-[99] h-screen w-screen -translate-x-1/2 bg-background object-cover opacity-50"
      quality="70"
      format="webp"
    /> -->
    <ClientOnly>
      <video
        ref="backgroundVideo"
        muted
        autoplay
        playsinline
        loop
        preload="metadata"
        class="absolute inset-0 left-1/2 top-0 -z-[99] h-screen w-screen -translate-x-1/2 bg-background object-cover opacity-35"
      >
        <source src="/hero_video.webm" type="video/webm" />
      </video>
    </ClientOnly>

    <div
      class="relative bottom-0 flex h-screen flex-col bg-gradient-to-t from-background from-10% to-transparent to-70%"
    >
      <div class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2">
        <div class="flex flex-col items-center gap-1">
          <div class="hero-text flex flex-col items-center justify-center lg:h-80 lg:flex-row lg:gap-8">
            <Motion
              :initial="{
                scale: 0.6,
                opacity: 0,
              }"
              :animate="{
                scale: 1,
                opacity: 1,
              }"
              :transition="{
                easing: spring({
                  stiffness: 100,
                  damping: 10,
                  mass: 1,
                }),
              }"
            >
              <Logo class="h-[200px] lg:h-[250px]" />
            </Motion>
            <div ref="header" class="flex items-center">
              <h1 class="header-text text-[120px] opacity-0 lg:text-[150px] xl:text-[250px]">8</h1>
              <div class="flex flex-col">
                <h2 class="header-text h-9 text-[50px] font-bold opacity-0 lg:text-[60px] xl:h-16 xl:text-[75px]">
                  October
                </h2>
                <h3
                  class="header-text font-['Bebas Neue'] text-[70px] text-primary opacity-0 lg:text-[100px] xl:text-[130px]"
                >
                  2024
                </h3>
              </div>
            </div>
          </div>
          <Motion
            :initial="{
              opacity: 0,
              scale: 0.8,
              y: 25,
            }"
            :animate="{
              opacity: 1,
              scale: 1,
              y: 0,
            }"
            :transition="{
              delay: 0.5,
              easing: spring({
                stiffness: 100,
                damping: 10,
                mass: 1,
              }),
            }"
          >
            <h4 class="slogan text-center text-3xl font-semibold uppercase">Your secure and convenient journey</h4>
          </Motion>

          <Motion
            :initial="{
              opacity: 0,
              scale: 0.8,
              y: 25,
            }"
            :animate="{
              opacity: 1,
              scale: 1,
              y: 0,
            }"
            :transition="{
              delay: 0.7,
              easing: spring({
                stiffness: 100,
                damping: 10,
                mass: 1,
              }),
            }"
            class="mt-20 flex flex-col items-center justify-center gap-2"
          >
            <!-- <NuxtLink :href="`https://tickets.paysera.com/${locale}/event/digi-pay-0091`"> -->
            <Dialog>
              <DialogTrigger>
                <Button variant="default" class="w-64 text-lg"> {{ $t("buyTicket") }} </Button>
              </DialogTrigger>
              <DialogContent class="">
                <iframe
                  class="rounded-2xl p-2"
                  width="100%"
                  height="100%"
                  frameborder="0"
                  onload="(function () {
         var s = document.createElement('script');
         s.type = 'text/javascript';
         s.onload = function() {
             iFrameResize({ heightCalculationMethod: 'grow' });
         };
         s.src =
'https://tickets.paysera.com/compiled/2e97c63552e367ceb1b56ab27e4c2f7c.js';
         document.body.appendChild(s);
     })()"
                  src="https://tickets.paysera.com/bg/event-widget/141766a9-f129-11ee-8e30-0050562fceaa?"
                  allowtransparency="true"
                  scrolling="no"
                >
                </iframe>
              </DialogContent>
            </Dialog>
            <!-- </NuxtLink> -->
            <h4 class="text-sm">{{ $t("liveOrOnline") }}</h4>
            <h5 class="text-lg font-bold">{{ $t("whatYouGet") }}</h5>
            <ul>
              <li class="text-center" v-for="reason in reasons">{{ $t(reason) }}</li>
            </ul>
          </Motion>
        </div>
        <div class="absolute left-[-26.5%] hidden flex-col gap-4 2xl:flex">
          <Motion
            v-for="(icon, index) in leftIcons"
            :key="index"
            :initial="{
              y: -800,
            }"
            :animate="{
              y: 0,
            }"
            :transition="{
              easing: spring({
                stiffness: 50,
                damping: 15,
                mass: 1,
              }),
              delay: index * 0.2,
            }"
            class="icon-cell relative h-20 w-20 bg-center bg-no-repeat"
            :class="`left-[-${index * 150}%]`"
            :style="{
              backgroundImage: `url(${icon})`,
            }"
          />
          <!-- <img src="/planet.svg" class="icon-cell relative left-[-150%]" />
          <img src="/planet.svg" class="icon-cell relative left-[-300%]" /> -->
        </div>

        <div class="absolute right-[-70%] hidden flex-col gap-4 2xl:flex">
          <Motion
            v-for="(icon, index) in rightIcons"
            :key="index"
            :initial="{
              y: -800,
            }"
            :animate="{
              y: 0,
            }"
            :transition="{
              easing: spring({
                stiffness: 50,
                damping: 15,
                mass: 1,
              }),
              delay: index * 0.2,
            }"
            class="icon-cell-alternate relative h-20 w-20 bg-center bg-no-repeat"
            :class="`left-[-${(2 - index) * 150}%]`"
            :style="{
              backgroundImage: `url(${icon})`,
            }"
          />
          <!-- <img src="/planet.svg" class="icon-cell-alternate relative left-[-300%]" />
          <img src="/money.svg" class="icon-cell-alternate relative left-[-150%]" />
          <img src="/planet.svg" class="icon-cell-alternate relative left-[-0%]" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .hero-text {
    font-family: "Bebas Neue";
  }

  .icon-cell,
  .icon-cell-alternate {
    border: 1px solid #fff;
    border-radius: 9999px;
    background-size: 50px;

    @apply p-3 backdrop-blur-md;
  }
</style>
