<template>
  <div class="speakers-page container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Speakers</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="(speaker, index) in speakers"
        :key="speaker.id"
        :class="[
          cn(
            'flex flex-col gap-4 items-start w-full h-full hover:bg-white/15 p-4 rounded-xl transition-all duration-300 ease-out shadow-none hover:-translate-y-2 hover:shadow-[0px_5px_10px_0px] hover:shadow-border md:col-span-1',
          ),
        ]"
      >
        <img
          :src="speaker.picture"
          :alt="speaker.name"
          :class="
            cn('w-full aspect-video object-cover rounded-lg', {
              'md:aspect-auto md:h-64': index === 0,
            })
          "
        />
        <div class="flex-1 flex flex-col w-full">
          <h2
            :class="
              cn('text-xl font-semibold flex-1', { 'text-2xl': index === 0 })
            "
          >
            {{ speaker.name }}
          </h2>
          <p class="text-gray-500 dark:text-gray-400 mt-1">
            {{ speaker.role }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { cn } from "@/lib/utils";

interface Speaker {
  id: number;
  name: string;
  role: string;
  picture: string;
}

const speakers = ref<Speaker[]>([
  {
    id: 1,
    name: "Alice Wonderland",
    role: "Lead Developer, Curious Inc.",
    picture: "https://via.placeholder.com/300x200/FFC0CB/000000?text=Alice", // Placeholder image
  },
  {
    id: 2,
    name: "Bob The Builder",
    role: "Senior Architect, BuildIt Corp.",
    picture: "https://via.placeholder.com/300x200/ADD8E6/000000?text=Bob", // Placeholder image
  },
  {
    id: 3,
    name: "Charlie Chaplin",
    role: "UI/UX Designer, Silent Films Ltd.",
    picture: "https://via.placeholder.com/300x200/90EE90/000000?text=Charlie", // Placeholder image
  },
  {
    id: 4,
    name: "Diana Prince",
    role: "DevOps Engineer, Amazonia Tech",
    picture: "https://via.placeholder.com/300x200/FFFFE0/000000?text=Diana", // Placeholder image
  },
  {
    id: 5,
    name: "Evan Almighty",
    role: "Product Manager, Heaven Sent Solutions",
    picture: "https://via.placeholder.com/300x200/E6E6FA/000000?text=Evan", // Placeholder image
  },
  {
    id: 6,
    name: "Fiona Shrek",
    role: "QA Lead, Far Far Away Systems",
    picture: "https://via.placeholder.com/300x200/DDA0DD/000000?text=Fiona", // Placeholder image
  },
]);
</script>
