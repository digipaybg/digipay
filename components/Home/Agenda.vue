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
      title: "Registration",
      hours: "08:15 - 09:15",
      type: "special",
      class: "bg-green-700/40 hover:bg-green-700/50",
      icon: "i-tabler-edit",
    },
    {
      type: "keynote",
      title: "OPENING KEYNOTES",
      hours: "09:15 - 10:15",
      speakers: [
        {
          hours: "09:20 - 09:45",
          name: "Eric Ducoulombier",
          position: "DG Financial Stability, Financial Services and Capital Markets Union, European Commission",
          image: "/speakers/eric_d.jpg",
          topic:
            "Immediate payments, security of payment services, innovations and after the entry into force of PSD3, future challenges in front of open finance.",
        },
        {
          hours: "09:45 - 10:00",
          name: "Dimitar Radev",
          position: "Governer, Bulgarian National Bank, tbc",
          topic: "",
        },
      ],
    },
    {
      type: "discussion",
      title: "INSTANT PAYMENTS AND PROSPECTS FOR INNOVATION",
      hours: "10:15 - 10:45",
      moderator: {
        name: "Merdihan Ismailov",
        position: "FinTech Applications & Solutions, Sirma Group Holding",
      },
      speakers: [
        {
          name: "Stoilka Arsova",
          position: "Director National Card and Payment Scheme, Borica AD",
        },
        {
          name: "Hristiyan Prashkov",
          position: "Senior Manager Digital Banking, UniCredit Bulbank",
        },
        {
          name: "Tatyana Ivanova",
          position: "Country Innovation Leader, KBC Bulgaria",
        },
      ],
    },
    {
      type: "special",
      title: "Coffee Break",
      description: "Powered By BORICA",
      hours: "10:50 - 11:10",
      icon: "i-tabler-coffee",
      class: "bg-green-700/40 hover:bg-green-700/50",
    },
    {
      type: "keynote",
      title: "KEYNOTE SESSION",
      hours: "11:10 - 12:30",
      speakers: [
        {
          name: "Svetlin Lazarov",
          position:
            "Head of Cyber Intelligence and Digital Forensics Unit at General Directorate Combating Organized Crime (GDCOC)",
          topic: "Seven years back and forward in financial fraud",
          hours: "11:10 - 11:25",
        },
        {
          name: "Radoslav Dimitrov",
          position: `Senior Director of the „Card Business" Directorate at BORICA+Guest Municipal Bank`,
          topic: "Financial Crime Prevention as a service- Fraud Monitoring and Sanction Screening",
          hours: "11:25 - 11:40",
        },
        {
          name: "Goran Angelov",
          position: "Founder and CEO, IBS Bulgaria",
          topic:
            "What are the elements that give us a holistic solution for protection and, what are the main challenges and how to meet them if we are a bank or fintech",
          hours: "11:25 - 11:40",
        },
      ],
    },
    {
      type: "discussion",
      title: "PANEL DISCUSSION",
      hours: "11:55 - 12:30",
      description: "Practical aspects of preventing and dealing with financial fraud",
      speakers: [
        {
          name: "Radoslav Dimitrov",
          position: `Senior Director of the „Card Business" Directorate at BORICA+Guest Municipal Bank`,
        },
        {
          name: "Goran Angelov",
          position: "Founder and CEO, IBS Bulgaria",
        },
        {
          name: "Pavel Georgiev",
          position: "Founder of Cyber Security Talks Bulgaria",
        },
      ],
      moderator: {
        name: "Boris Goncharov",
        position: "Chief Visionary Officer, AMATAS",
      },
    },
    {
      type: "keynote",
      title: "KEYNOTE SPEECH",
      hours: "12:30 - 12:40",
      speakers: [
        {
          name: "Ivan Vulev",
          position: "Chief Technology Officer & Technical Sales Leader, IBM Central Eastern Europe Territory",
          topic: "Quantum Computing and its Impact on Digital Security in the Financial Industry",
        },
      ],
    },
    {
      type: "special",
      title: "LUNCH TIME",
      hours: "12:40 - 13:40",
      icon: "i-tabler-apple",
      class: "bg-green-700/40 hover:bg-green-700/50",
    },
    {
      type: "keynote",
      title: "KEYNOTE SPEECH",
      hours: "13:40 - 14:05",
      speakers: [
        {
          name: "Anastasiia Zhdanova",
          position: "Head of AI practice, Infopulse Bulgaria",
          topic: "AI in banking and financial sector",
          hours: "13:40 - 14:05",
        },
      ],
      moderator: {
        name: "Alexander Krastev",
        position: "Co-Founder, Bookmark",
      },
    },
    {
      type: "discussion",
      title: "DISCUSSION",
      hours: "14:05 - 14:45",
      description:
        "Croatia's successful strategies in navigating the banking and financial sector in the changeover to the euro",
      speakers: [
        {
          name: "Ivana Rosančić",
          position: "Business Intelligence Consultant, KOIOS Croatia",
        },
        {
          name: "Deyan Radev",
          position: "PhD, European University Institute,  Founder and Director of CEE Centre for Digital Finance",
        },
      ],
    },
    {
      type: "special",
      title: "COFFEE BREAK",
      hours: "14:45 - 15:00",
      icon: "i-tabler-coffee",
      class: "bg-green-700/40 hover:bg-green-700/50",
    },
    {
      type: "keynote",
      title: "KEYNOTE SPEECH",
      hours: "15:00 - 16:00",
      description: "Solutions against financial crime and anti-money laundering on focus",
      speakers: [
        {
          name: "Chrystalla Kazara",
          position: "Vice-President, Association of Certified Fraud Examiners (ACFE), Cyprus",
          hours: "15:00 - 15:25",
        },
        {
          name: "Anestis Dimopoulos",
          position: "Director, Head of Regional Digital and Risk Advisory Services",
          topic: "Use of Machine Learning and AI for AML controls",
          hours: "15:25 - 15:35",
        },
      ],
    },
    {
      type: "discussion",
      title: "PANEL DISCUSSION",
      hours: "15:35 - 16:10",
      description: "Solutions against financial crime and anti-money laundering on focus",
      speakers: [
        {
          name: "Chrystalla Kazara",
          position: "Vice-President, Association of Certified Fraud Examiners (ACFE), Cyprus",
        },
        {
          name: "Anestis Dimopoulos",
          position: "Director, Head of Regional Digital and Risk Advisory Services",
        },
        {
          name: "Stoyan Lozanov",
          position: "Founder, CEO, Omnio",
        },
      ],
      moderator: {
        name: "Miglen Evlogiev",
        position: "Senior Vice President of Information Security, Payhawk",
      },
    },
    {
      type: "keynote",
      title: "FIRECHAT SESSION",
      hours: "16:10 - 16:30",
      description: "Convenient or secure digital payments",
      speakers: [
        {
          name: "Marina Shideroff",
          position: "Founder and CEO, FRAM CREATIVE SOLUTIONS",
          topic: "Thesis: Protects convenient payments",
        },
        {
          name: "Tsvetomir Doskov",
          position: "Senior Vice President, Sirma Financial Industry",
          topic: "Thesis: Protects secure payments",
        },
      ],
    },
    {
      type: "special",
      title: "CLOSING COCKTAIL",
      hours: "16:30 - 18:30",
      icon: "i-tabler-glass-cocktail",
      class: "bg-green-700/40 hover:bg-green-700/50",
    },
  ];
</script>

<template>
  <div class="w-full py-10">
    <li
      v-for="item in agenda"
      :class="cn('flex min-h-[13vh] items-center p-4 transition-all duration-200 hover:bg-card/20', item.class)"
    >
      <template v-if="item.type === 'special'">
        <div class="flex w-full items-center gap-10 px-10">
          <div class="flex flex-col items-center">
            <span class="text-xl font-semibold text-primary">{{ item.hours }}</span>
          </div>
          <div class="flex flex-col items-start justify-center">
            <span class="font-mono text-2xl font-bold">{{ item.title }}</span>
            <span class="text-sm text-muted-foreground">{{ item.description }}</span>
          </div>
          <div v-if="item.icon" class="flex flex-1 justify-end">
            <span
              class="flex aspect-square h-16 w-16 items-center justify-center rounded-full p-4 text-xl font-semibold"
            >
              <Icon :name="item.icon" class="aspect-square h-14 w-14 text-primary" />
            </span>
          </div>
        </div>
      </template>

      <template v-else-if="item.type === 'keynote'">
        <div class="flex w-full gap-10 px-10">
          <div class="flex flex-col items-center">
            <span class="text-xl font-semibold text-primary">{{ item.hours }}</span>
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="font-mono text-2xl font-bold capitalize">{{ item.title }}</h3>
            <div v-for="speaker in item.speakers" class="flex gap-4">
              <NuxtImg
                format="webp"
                v-if="speaker.image"
                :src="speaker.image"
                :alt="speaker.name"
                class="aspect-square h-16 w-16 rounded-full object-cover"
              />
              <div v-else class="aspect-square h-16 w-16 rounded-full"></div>
              <div class="flex flex-col">
                <span class="text-lg text-primary">{{ speaker.hours }}</span>
                <span class="text-lg font-semibold">{{ speaker.name }}</span>
                <span class="text-sm text-muted-foreground">{{ speaker.position }}</span>
                <p v-if="speaker.topic" class="mt-1 text-lg">{{ speaker.topic }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="item.type === 'discussion'">
        <div class="flex w-full gap-10 px-10">
          <div class="flex flex-col items-center">
            <span class="text-xl font-semibold text-primary">{{ item.hours }}</span>
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="font-mono text-2xl font-bold uppercase">{{ item.title }}</h3>
            <div class="flex flex-col gap-2">
              <div>
                <span class="text-lg font-semibold text-primary">Speakers:</span>
                <ul class="ml-4 mt-1 space-y-2">
                  <li v-for="speaker in item.speakers" class="flex flex-col">
                    <span class="text-lg font-semibold">{{ speaker.name }}</span>
                    <span class="text-sm text-muted-foreground">{{ speaker.position }}</span>
                  </li>
                </ul>
              </div>
              <div v-if="item.moderator" class="mb-2">
                <span class="text-lg font-semibold text-primary">Moderator:</span>
                <div class="ml-4">
                  <span class="text-lg font-semibold">{{ item.moderator.name }}</span>
                  <span class="block text-sm text-muted-foreground">{{ item.moderator.position }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </li>
  </div>
</template>
