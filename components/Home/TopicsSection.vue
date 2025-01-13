<script lang="ts" setup>
import { cn } from "@/lib/utils";

const topics = [
  {
    topic: "Instant Payments",
    description:
      "New technologies for instant transfers and their impact on the financial sector",
  },
  {
    topic: "Payments at the Eurozone threshold",
    description:
      "Preparation and adaptation of payment systems for Eurozone integration",
  },
  {
    topic: "Fraud Prevention",
    description:
      "Modern methods and technologies for detecting and preventing financial fraud",
  },
  {
    topic: "Cloud Technologies",
    description:
      "Using cloud solutions to enhance payment security and efficiency",
  },
  {
    topic: "Secure Identification",
    description:
      "Biometric technologies and multi-factor authentication in digital payments",
  },
  {
    topic: "Anti-money Laundering Practices",
    description:
      "Innovative approaches in combating money laundering and financial crimes",
  },
  {
    topic: "User Experience and AI",
    description:
      "Artificial Intelligence and personalization for better customer experience",
  },
];

const containerStyles =
  "flex flex-col h-full w-full bg-secondary rounded-2xl p-6 shadow-[0px_0px_0px_0px] shadow-border hover:shadow-[0px_5px_10px_0px] hover:shadow-border hover:-translate-y-[5px] transition-all duration-300 ease-out";

const topicTitleStyle = "text-3xl font-semibold";
const topicDescriptionStyle = "text-lg text-primary-foreground/70";
</script>

<template>
  <div>
    <h1
      class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mt-32 mb-10"
    >
      {{ $t("Topics.title") }}
    </h1>
    <div
      class="grid grid-cols-1 grid-rows-1 md:grid-cols-4 md:grid-rows-4 gap-2 min-h-[600px]"
    >
      <!-- Instant Payments -->
      <div :class="cn(containerStyles, 'md:row-span-3')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">{{ topics[0].topic }}</h1>
          <p :class="topicDescriptionStyle">{{ topics[0].description }}</p>
        </div>
      </div>

      <!-- Payments at the Eurozone border -->
      <div :class="cn(containerStyles, 'md:row-span-1 md:col-span-2')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">{{ topics[1].topic }}</h1>
          <p :class="topicDescriptionStyle">{{ topics[1].description }}</p>
        </div>
      </div>

      <!-- Secure Identification -->
      <div :class="cn(containerStyles, 'md:row-span-1 md:col-span-1')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">{{ topics[4].topic }}</h1>
          <p :class="topicDescriptionStyle">{{ topics[4].description }}</p>
        </div>
      </div>

      <!-- Fraud Prevention -->
      <div :class="cn(containerStyles, 'md:row-span-2 md:col-span-1')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">{{ topics[2].topic }}</h1>
          <p :class="topicDescriptionStyle">{{ topics[2].description }}</p>
        </div>
      </div>

      <!-- Cloud technologies -->
      <div :class="cn(containerStyles, 'md:row-span-2 md:col-span-2')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">{{ topics[3].topic }}</h1>
          <p :class="topicDescriptionStyle">{{ topics[3].description }}</p>
        </div>
      </div>

      <!-- Anti-money laundering -->
      <div :class="cn(containerStyles, 'md:row-span-1 md:col-span-2')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">{{ topics[5].topic }}</h1>
          <p :class="topicDescriptionStyle">{{ topics[5].description }}</p>
        </div>
      </div>

      <!-- AI and User Experience -->
      <div :class="cn(containerStyles, 'md:row-span-1 md:col-span-2')">
        <div class="flex-1"></div>
        <div class="flex-[0.2]">
          <h1 :class="topicTitleStyle">{{ topics[6].topic }}</h1>
          <p :class="topicDescriptionStyle">{{ topics[6].description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
