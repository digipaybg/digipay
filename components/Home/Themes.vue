<script lang="ts" setup>
  import { inView } from "#imports";
  import SplitType from "split-type";

  const themes = [
    { theme: "instantPayments", icon: "mdi:credit-card-fast" },
    { theme: "paymentScam", icon: "i-material-symbols-lock" },
    {
      theme: "cloudInnovationsForFinance",
      icon: "i-solar-server-square-cloud-bold",
    },
    {
      theme: "antiMoneyLaunderingMeasures",
      icon: "i-material-symbols-light-menu-book",
    },
    { theme: "userPaymentAI", icon: "i-hugeicons-artificial-intelligence-01" },
    { theme: "foreignQuotaEntry", icon: "i-material-symbols-euro" },
  ];

  onMounted(() => {
    const splitTitle = new SplitType("#themeTitle");
    const wrapper = document.querySelector("#themesWrapper")!;

    inView(
      ".topic-card",
      (entry) => {
        if (entry.isIntersecting) {
          wrapper.classList.remove("opacity-0");
          timeline(
            [
              [
                splitTitle.chars!,
                {
                  y: [10, 0],
                  opacity: [0, 1],
                  scale: [0.7, 1],
                },
                {
                  delay: stagger(0.035),
                  easing: spring({
                    stiffness: 100,
                    damping: 10,
                    mass: 0.5,
                  }),
                },
              ],
              [
                ".topic-card",
                {
                  scale: [0.7, 1],
                  opacity: [0, 1],
                  y: [100, 0],
                },
                {
                  easing: spring({
                    stiffness: 100,
                    damping: 15,
                  }),
                  at: 0.5,
                },
              ],
              [
                ".topic-cell",
                {
                  y: [25, 0],
                  opacity: [0, 1],
                  scale: [0.7, 1],
                  filter: ["blur(10px)", "blur(0px)"],
                },
                {
                  delay: stagger(0.15, {
                    from: "first",
                  }),
                  easing: spring({
                    stiffness: 100,
                    damping: 15,
                  }),
                  at: 0.85,
                },
              ],
            ],
            {},
          );
        }
      },
      {
        amount: "any",
      },
    );
  });
</script>

<template>
  <div id="themes" class="relative">
    <div id="themesWrapper" class="flex h-[75vh] flex-col items-center justify-center overflow-visible opacity-0">
      <h1 id="themeTitle" class="py-4 text-center text-2xl sm:text-3xl md:text-4xl">{{ $t("themes2024") }}</h1>
      <div
        :initial="{
          scale: 0.7,
          opacity: 0,
        }"
        :in-view="{
          scale: 1,
          opacity: 1,
        }"
        class="topic-card my-8 flex h-fit w-full items-center justify-center rounded-xl p-4 backdrop-blur-2xl backdrop-saturate-200 sm:my-12 sm:w-3/4 sm:p-8 md:my-20 md:w-2/3"
      >
        <div class="inline-grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div
            v-for="(theme, index) in themes"
            :key="index"
            class="topic-cell flex h-full flex-col items-start justify-between gap-2 p-2 sm:gap-4 sm:p-4"
          >
            <div
              class="flex items-center justify-center rounded-full border border-white p-2 backdrop-saturate-200 sm:p-4"
            >
              <Icon :name="theme.icon" class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
            </div>
            <h1 class="sm:text-md text-sm">{{ $t(theme.theme) }}</h1>
          </div>
        </div>
      </div>
    </div>

    <circle
      class="absolute left-[50%] top-[70%] -z-50 aspect-square w-3/4 -translate-x-1/2 rounded-full bg-[#27E076]/20 blur-[200px] sm:w-1/2 lg:top-[30%]"
    />
  </div>
</template>

<style scoped>
  /* Adjustments for text and layout on smaller screens */
  .text-center {
    text-align: center;
  }

  .inline-grid {
    display: inline-grid;
    gap: 1rem;
  }

  .cell {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
  }

  .rounded-xl {
    border-radius: 1rem;
  }

  @media (max-width: 768px) {
    .card {
      padding: 1rem;
    }

    .cell {
      padding: 0.5rem;
    }

    .text-center {
      font-size: 1.5rem;
    }

    .cell h1 {
      font-size: 1rem;
    }
  }
</style>
