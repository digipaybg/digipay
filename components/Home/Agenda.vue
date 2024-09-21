<script lang="ts" setup>
  import type { HTMLAttributes } from "vue";
  import { cn } from "~/lib/utils";

  interface Speaker {
    name: string;
    position: string;
    hours?: string;
    image?: string;
    topic?: string;
  }

  interface Moderator {
    name: string;
    position: string;
    image?: string;
  }

  interface AgendaItem {
    title: string;
    hours: string;
    type: "keynote" | "discussion" | "special";
    speakers?: Speaker[];
    moderator?: Moderator;
    description?: string;
    icon?: string;
    class?: HTMLAttributes["class"];
  }

  const agenda: AgendaItem[] = [
    {
      title: "registration",
      hours: "08:15 - 09:00",
      type: "special",
      class: "bg-green-700/40 hover:bg-green-700/50",
      icon: "i-tabler-edit",
      description: "poweredByIbs",
    },
    {
      type: "keynote",
      title: "openingKeynotes",
      hours: "09:00 - 10:00",
      speakers: [
        {
          hours: "09:00 - 09:25",
          name: "ericDucoulombier",
          position: "dgFinancialStability",
          topic: "topicImmediatePayments",
          image: "/speakers/eric_d.jpg",
        },
        {
          hours: "09:25 - 9:40",
          name: "dimitarRadev",
          position: "governorBNB",
          image: "/speakers/Dimitar Radev.png",
          topic: "",
        },
        {
          hours: "09:40 - 09:50",
          name: "valeryVulchev",
          position: "fintechAssociationChairman",
          image: "/speakers/Valery Vulchev.jpeg",
        },
      ],
    },
    {
      type: "discussion",
      title: "instantPaymentsAndInnovation",
      hours: "10:00 - 10:40",
      moderator: {
        name: "merdihanIsmailov",
        position: "fintechApplications",
        image: "/speakers/Merdihan Ismailov.png",
      },
      speakers: [
        {
          name: "stoilkaArsova",
          position: "directorNationalCard",
          image: "/speakers/Stoilka Arsova.jpg",
        },
        {
          name: "tatyanaIvanova",
          position: "countryInnovationLeader",
          image: "/speakers/Tatyana Ivanova.jpg",
        },
        {
          name: "hristiyanPrashkov",
          position: "seniorManagerDigitalBanking",
          image: "/speakers/Hristian Prashkov.jfif",
        },
      ],
    },
    {
      type: "special",
      title: "coffeeBreak",
      description: "poweredByBorica",
      hours: "10:40 - 11:00",
      icon: "i-tabler-coffee",
      class: "bg-green-700/40 hover:bg-green-700/50",
    },
    {
      type: "keynote",
      title: "keynoteSession",
      hours: "11:00 - 12:20",
      speakers: [
        {
          name: "svetlinLazarov",
          position: "headCyberIntelligence",
          topic: "topicFinancialFraud",
          hours: "11:00 - 11:15",
          image: "/speakers/svetlin-l.jpg",
        },
        {
          name: "radoslavDimitrov",
          position: "seniorDirectorCardBusiness",
          topic: "topicFinancialCrimePrevention",
          hours: "11:15 - 11:30",
          image: "/speakers/Radoslav Dimitrov.jpg",
        },
        {
          name: "goranAngelov",
          position: "founderCEO",
          topic: "topicHolisticSolution",
          hours: "11:30 - 11:45",
          image: "/speakers/Goran Angelov.jpg",
        },
      ],
    },
    {
      type: "discussion",
      title: "practicalAspectsFinancialFraud",
      hours: "11:45 - 12:20",
      speakers: [
        {
          name: "svetlinLazarov",
          position: "headCyberIntelligence",
          image: "/speakers/svetlin-l.jpg",
        },
        {
          name: "radoslavDimitrov",
          position: "seniorDirectorCardBusiness",
          image: "/speakers/Radoslav Dimitrov.jpg",
        },
        {
          name: "goranAngelov",
          position: "founderCEO",
          image: "/speakers/Goran Angelov.jpg",
        },
        {
          name: "pavelGeorgiev",
          position: "founderCyberSecurityTalks",
          image: "/speakers/Pavel Georgiev.jpg",
        },
      ],
      moderator: {
        name: "borisGoncharov",
        position: "chiefVisionaryOfficer",
        image: "/speakers/Boris Goncharov.jpg",
      },
    },
    {
      type: "keynote",
      title: "keynoteSpeech",
      hours: "12:20 - 12:30",
      speakers: [
        {
          name: "ivanVulev",
          position: "chiefTechnologyOfficer",
          topic: "topicQuantumComputing",
          image: "/speakers/Ivan Vulev.jpg",
        },
      ],
    },
    {
      type: "special",
      title: "lunchTime",
      hours: "12:30 - 13:30",
      icon: "i-tabler-apple",
      class: "bg-green-700/40 hover:bg-green-700/50",
    },
    {
      type: "keynote",
      title: "keynoteSpeech",
      hours: "13:30 - 14:00",
      speakers: [
        {
          name: "anastasiiaZhdanova",
          position: "headAIPractice",
          topic: "topicAIBanking",
          hours: "13:30 - 14:00",
          image: "/speakers/anastasiia-zhdanova.jpg",
        },
      ],
      moderator: {
        name: "alexanderKrastev",
        position: "coFounder",
        image: "/speakers/Alexander Krastev.jpg",
      },
    },
    {
      type: "discussion",
      title: "discussionCroatiaEuro",
      hours: "14:00 - 14:45",
      speakers: [
        {
          name: "ivanaRosancic",
          position: "businessIntelligenceConsultant",
          topic: "topicCroatiaEuro",
          image: "/speakers/IvanaRosancic.jpg",
        },
      ],
      moderator: {
        name: "deyanRadev",
        position: "phdFounderDirector",
        image: "/speakers/Deyan Radev.jpg",
      },
    },
    {
      type: "special",
      title: "coffeeBreak",
      description: "poweredByDais",
      hours: "14:45 - 15:00",
      icon: "i-tabler-coffee",
      class: "bg-green-700/40 hover:bg-green-700/50",
    },
    {
      type: "keynote",
      title: "keynoteSpeech",
      hours: "15:00 - 16:00",
      description: "solutionsAgainstFinancialCrime",
      speakers: [
        {
          name: "chrystallaKazara",
          position: "vicePresidentACFE",
          hours: "15:00 - 15:20",
          topic: "topicBuildingCorporateCulture",
          image: "/speakers/Chrystalla Kazara.jpg",
        },
        {
          name: "anestisDimopoulos",
          position: "directorHeadRegionalDigital",
          topic: "topicMachineLearningAML",
          hours: "15:20 - 15:30",
          image: "/speakers/Anestis.png",
        },
        {
          name: "stoyanLozanov",
          position: "founderCEOOmnio",
          topic: "topicMoneyLaundering",
          hours: "15:50 - 16:00",
          image: "/speakers/Stoyan Lozanov.jfif",
        },
      ],
    },
    {
      type: "discussion",
      title: "solutionsAgainstFinancialCrime",
      hours: "16:00 - 16:25",
      speakers: [
        {
          name: "chrystallaKazara",
          position: "vicePresidentACFE",
          image: "/speakers/Chrystalla Kazara.jpg",
        },
        {
          name: "anestisDimopoulos",
          position: "directorHeadRegionalDigital",
          image: "/speakers/Anestis.png",
        },
        {
          name: "stoyanLozanov",
          position: "founderCEOOmnio",
          image: "/speakers/Stoyan Lozanov.jfif",
        },
      ],
      moderator: {
        name: "miglenEvlogiev",
        position: "seniorVicePresidentSirma",
        image: "/speakers/Miglen Evlogiev.jpg",
      },
    },
    {
      type: "discussion",
      title: "firechatSession",
      hours: "16:00 - 16:25",
      description: "convenientOrSecurePayments",
      speakers: [
        {
          name: "marinaShideroff",
          position: "founderCEOFram",
          topic: "topicConvenientPayments",
          image: "/speakers/Marina Shideroff.png",
        },
        {
          name: "tsvetomirDoskov",
          position: "seniorVicePresidentSirma",
          topic: "topicSecurePayments",
          image: "/speakers/Tsvetomir Doskov.jpg",
        },
      ],
      moderator: {
        name: "pavelKaminsky",
        position: "founderCEO7Security",
        image: "/advisory/pavel_kaminsky.jpg",
      },
    },
    {
      type: "special",
      title: "closingCocktail",
      hours: "16:45 - 18:30",
      description: "poweredByIbs2",
      icon: "i-tabler-glass-cocktail",
      class: "bg-green-700/40 hover:bg-green-700/50",
    },
  ];
</script>

<template>
  <div class="w-full py-5 sm:py-10">
    <li
      v-for="item in agenda"
      :class="cn('flex min-h-[13vh] items-center p-2 transition-all duration-200 hover:bg-card/20 sm:p-4', item.class)"
    >
      <template v-if="item.type === 'special'">
        <div class="flex w-full items-center gap-2 px-2 sm:gap-10 sm:px-10">
          <div class="w-24 flex-shrink-0 sm:w-32">
            <span class="whitespace-nowrap text-sm font-semibold text-primary sm:text-xl">{{ item.hours }}</span>
          </div>
          <div class="flex flex-col items-start justify-center">
            <span class="font-mono text-lg font-bold sm:text-2xl">{{ $t(item.title) }}</span>
            <span v-if="item.description" class="text-xs text-muted-foreground sm:text-sm">{{
              $t(item.description)
            }}</span>
          </div>
          <div v-if="item.icon" class="flex flex-1 justify-end">
            <span
              class="flex aspect-square h-10 w-10 items-center justify-center rounded-full p-2 text-xl font-semibold sm:h-16 sm:w-16 sm:p-4"
            >
              <Icon :name="item.icon" class="aspect-square h-8 w-8 text-primary sm:h-14 sm:w-14" />
            </span>
          </div>
        </div>
      </template>

      <template v-else-if="item.type === 'keynote'">
        <div class="flex w-full flex-col gap-2 px-2 sm:flex-row sm:gap-10 sm:px-10">
          <div class="w-24 flex-shrink-0 sm:w-32">
            <span class="whitespace-nowrap text-sm font-semibold text-primary sm:text-xl">{{ item.hours }}</span>
          </div>
          <div class="flex flex-col gap-2 sm:gap-4">
            <h3 class="font-mono text-lg font-bold capitalize sm:text-2xl">{{ $t(item.title) }}</h3>
            <div v-for="speaker in item.speakers" class="flex gap-2 sm:gap-4">
              <NuxtImg
                format="webp"
                v-if="speaker.image"
                :src="speaker.image"
                :alt="$t(speaker.name)"
                class="aspect-square h-12 w-12 flex-shrink-0 rounded-full object-cover object-top sm:h-16 sm:w-16"
              />
              <div v-else class="aspect-square h-12 w-12 flex-shrink-0 rounded-full sm:h-16 sm:w-16"></div>
              <div class="flex flex-col">
                <span class="text-sm text-primary sm:text-lg">{{ speaker.hours }}</span>
                <span class="text-sm font-semibold sm:text-lg">{{ $t(speaker.name) }}</span>
                <span class="text-xs text-muted-foreground sm:text-sm">{{ $t(speaker.position) }}</span>
                <p v-if="speaker.topic" class="text-sm sm:text-lg">{{ $t(speaker.topic) }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="item.type === 'discussion'">
        <div class="flex w-full flex-col gap-2 px-2 sm:flex-row sm:gap-10 sm:px-10">
          <div class="w-24 flex-shrink-0 sm:w-32">
            <span class="whitespace-nowrap text-sm font-semibold text-primary sm:text-xl">{{ item.hours }}</span>
          </div>
          <div class="flex flex-col gap-2 sm:gap-4">
            <h1 class="font-mono text-lg font-bold uppercase sm:text-2xl">{{ $t(item.type) }}</h1>
            <h3 class="font-mono text-lg font-bold uppercase sm:text-2xl">{{ $t(item.title) }}</h3>
            <p v-if="item.description" class="text-sm sm:text-lg">{{ $t(item.description) }}</p>
            <div class="flex flex-col gap-2">
              <div>
                <span class="text-sm font-semibold text-primary sm:text-lg">{{ $t("speakers") }}:</span>
                <ul class="ml-4 mt-1 space-y-2 sm:space-y-4">
                  <li v-for="speaker in item.speakers" class="flex items-start gap-2 sm:gap-4">
                    <NuxtImg
                      format="webp"
                      v-if="speaker.image"
                      :src="speaker.image"
                      :alt="$t(speaker.name)"
                      class="aspect-square h-12 w-12 flex-shrink-0 rounded-full object-cover object-top sm:h-16 sm:w-16"
                    />
                    <div v-else class="aspect-square h-12 w-12 flex-shrink-0 rounded-full sm:h-16 sm:w-16"></div>
                    <div class="flex flex-col">
                      <span class="text-sm font-semibold sm:text-lg">{{ $t(speaker.name) }}</span>
                      <span class="text-xs text-muted-foreground sm:text-sm">{{ $t(speaker.position) }}</span>
                      <p v-if="speaker.topic" class="text-sm sm:text-lg">{{ $t(speaker.topic) }}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-if="item.moderator" class="mb-1 sm:mb-2">
                <span class="text-sm font-semibold text-primary sm:text-lg">{{ $t("moderator") }}:</span>
                <div class="ml-4 flex gap-2 sm:gap-4">
                  <NuxtImg
                    format="webp"
                    v-if="item.moderator.image"
                    :src="item.moderator.image"
                    :alt="$t(item.moderator.name)"
                    class="aspect-square h-12 w-12 flex-shrink-0 rounded-full object-cover object-top sm:h-16 sm:w-16"
                  />
                  <div v-else class="aspect-square h-12 w-12 flex-shrink-0 rounded-full sm:h-16 sm:w-16"></div>
                  <div class="flex flex-col justify-center">
                    <span class="text-sm font-semibold sm:text-lg">{{ $t(item.moderator.name) }}</span>
                    <span class="block text-xs text-muted-foreground sm:text-sm">{{
                      $t(item.moderator.position)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </li>
  </div>
</template>
