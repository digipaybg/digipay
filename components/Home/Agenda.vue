<script lang="ts" setup>
  const agenda: { hour: string; title: string; description: string; topic: string | undefined }[] = [
    {
      hour: "8:15-9:15",
      title: "REGISTRATION",
      description: "Powered by DAIS",
      topic: undefined,
    },
    {
      hour: "9:20 - 9:45",
      title: "Eric Ducoulombier",
      description: "DG Financial Stability, Financial Services and Capital Markets Union, European Commission",
      topic:
        "Immediate payments, security of payment services, innovations and after the entry into force of PSD3, future challenges in front of open finance.",
    },
    {
      hour: "9:45 - 10:00",
      title: "Dimitar Radev",
      description: "Governer, Bulgarian National Bank, tbc",
      topic: undefined,
    },
    {
      hour: "10:00 - 10:15",
      title: "Chrystalla Kazara",
      description: "Vice-President, Association of Certified Fraud Examiners (ACFE)",
      topic: undefined,
    },

    {
      hour: "10:15 - 10:30",
      title: "Hristiyan Prashkov",
      description: "Senior Manager, Digital Banking, UnicreditBulbank",
      topic: undefined,
    },
    {
      hour: "10:30 - 10:45",
      title: "Tatyana Ivanova",
      description: "Country Innovation Leader, KBC Bulgaria",
      topic: undefined,
    },
    {
      hour: "10:45 - 11:00",
      title: "COFFEE BREAK",
      description: "Powered by BORICA",
      topic: undefined,
    },
    {
      hour: "11:05 - 11:30",
      title: "Anastasiia Zhdanova",
      description: "Head of AI practice, Infopulse Bulgaria",
      topic: "AI in banking and financial sector",
    },
    {
      hour: "11:30 - 11:40",
      title: "KEYNOTE SPEECH",
      description: "Bulgaria’s reality: Digitization of DSK.",
      topic: undefined,
    },
    // {
    //   hour: "11:40 - 12:10",
    //   title: "DISCUSSION",
    //   description:
    //     "Croatia's successful strategies in navigating the banking and financial sector during the changeover to the euro.",
    //   topic: undefined,
    // },
    {
      hour: "11:40 - 11:55",
      title: "Ivana Rosančić",
      description: "Business Intelligence Consultant, KOIOS Croatia",
      topic:
        "Croatia's successful strategies in navigating the banking and financial sector in the changeover to the euro",
    },
    {
      hour: "11:55 - 12:10",
      title: "Deyan Radev",
      description: "PhD, European University Institute, Founder and Director of CEE Centre for Digital Finance",
      topic:
        "Croatia's successful strategies in navigating the banking and financial sector in the changeover to the euro",
    },
    {
      hour: "12:30 - 13:30",
      title: "LUNCH TIME",
      description: "",
      topic: undefined,
    },
    {
      hour: "13:30 - 14:00",
      title: "Emil Radev",
      description: "MEP, ECON Committee on Economic and Monetary Affairs, tbc",
      topic: "Fraud and Financial Crime Prevention",
    },
    {
      hour: "14:00 - 14:10",
      title: "Svetlin Lazarov",
      description:
        "Head of Cyber Intelligence and Digital Forensics Unit at General Directorate Combating Organized Crime (GDCOC)",
      topic: "Seven years back and forward in financial fraud",
    },
    {
      hour: "14:10 - 14:20",
      title: "Radoslav Dimitrov",
      description: 'Senior Director of the "Card Business" Directorate at BORICA',
      topic: "Financial Crime Prevention as a service- Fraud Monitoring and Sanction Screening",
    },
    {
      hour: "14:20 - 14:30",
      title: "Goran Angelov",
      description: 'Senior Director of the "Card Business" Directorate at BORICA',
      topic: "Financial Crime Prevention as a service- Fraud Monitoring and Sanction Screening",
    },
    {
      hour: "14:30 - 14:40",
      title: "Pavel Georgiev",
      description: 'Senior Director of the "Card Business" Directorate at BORICA',
      topic: "Financial Crime Prevention as a service- Fraud Monitoring and Sanction Screening",
    },
    {
      hour: "14:40 - 14:50",
      title: "Ivan Vulev",
      description: 'Senior Director of the "Card Business" Directorate at BORICA',
      topic: "Financial Crime Prevention as a service- Fraud Monitoring and Sanction Screening",
    },
    {
      hour: "15:00 - 15:20",
      title: "COFFEE BREAK",
      description: "Powered by IBS",
      topic: undefined,
    },
    {
      hour: "15:20 - 15:35",
      title: "Vladimir Dimitrov",
      description: "Director, Cybercrime Directorate, GDBOP",
      topic: "Current cyber frauds facing the financial sector, the revelations and the solutions",
    },
    {
      hour: "15:35 - 15:35",
      title: "Vladimir Dimitrov",
      description: "Director, Cybercrime Directorate, GDBOP",
      topic: "Current cyber frauds facing the financial sector, the revelations and the solutions",
    },
    {
      hour: "15:35 - 16:10",
      title: "PANEL DISCUSSION",
      description: "Solutions against anti-money laundering on focus.",
      topic: undefined,
    },
    {
      hour: "16:10 - 16:30",
      title: "FIRECHAT SESSION",
      description: "Convenient or secure digital payments.",
      topic: undefined,
    },
    {
      hour: "17:00 - 18:30",
      title: "CLOSING COCKTAIL",
      description: "Closing event cocktail.",
      topic: undefined,
    },
  ];
</script>

<template>
  <div class="mt-8 divide-y divide-green-500">
    <div
      v-for="(item, index) in agenda"
      :key="index"
      class="relative grid min-h-72 gap-8 px-12 py-12 lg:grid-cols-5 lg:py-16"
      :class="index % 2 !== 0 ? 'backdrop-saturate-[1.5]' : ''"
    >
      <div
        class="flex items-center justify-between lg:sticky lg:top-5 lg:-mt-24 lg:flex-col lg:items-start lg:self-center lg:pt-24"
      >
        <h2 class="text-xl font-bold capitalize text-gray-900 dark:text-white lg:text-2xl">{{ $t(item.hour) }}</h2>
      </div>
      <div class="flex flex-col items-center justify-between gap-20 lg:col-span-4 lg:flex-row">
        <div class="flex flex-1 flex-col items-start">
          <h1 class="font-mono text-3xl">{{ item.title }}</h1>
          <h2 class="text-sm">{{ item.description }}</h2>
          <p class="pt-5 text-xl" v-if="item.topic">{{ item.topic }}</p>
        </div>
        <div class="flex-[0.2] items-start" :class="index % 2 === 0 && index !== 0 ? 'flex' : 'hidden'">
          <NuxtImg
            src="/speakers/eric_d.jpg"
            format="webp"
            quality="30"
            class="aspect-square w-36 rounded-full object-cover shadow-[0px_0px_10px_0px] shadow-green-500"
            alt="Agenda"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
