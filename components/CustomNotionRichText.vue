<template>
  <span class="notion-rich-text">
    <template v-for="(text, index) in richText" :key="index">
      <a
        v-if="text.href"
        :href="text.href"
        target="_blank"
        rel="noopener noreferrer"
        :class="getTextClasses(text)"
        class="notion-link"
      >
        {{ text.plain_text }}
      </a>
      <span v-else :class="getTextClasses(text)">
        {{ text.plain_text }}
      </span>
    </template>
  </span>
</template>

<script setup lang="ts">
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

interface Props {
  richText: RichTextItemResponse[];
}

const props = defineProps<Props>();

const getTextClasses = (text: RichTextItemResponse): string => {
  const classes: string[] = [];

  // Apply text formatting
  if (text.annotations.bold) classes.push("font-bold");
  if (text.annotations.italic) classes.push("italic");
  if (text.annotations.strikethrough) classes.push("line-through");
  if (text.annotations.underline) classes.push("underline");
  if (text.annotations.code) classes.push("notion-inline-code");

  // Apply color if not default
  if (text.annotations.color && text.annotations.color !== "default") {
    classes.push(`notion-color-${text.annotations.color}`);
  }

  return classes.join(" ");
};
</script>

<style scoped>
.notion-rich-text {
  display: inline;
}

.notion-link {
  color: #2563eb;
  text-decoration: underline;
  transition: color 0.2s;
}

.notion-link:hover {
  color: #1d4ed8;
}

@media (prefers-color-scheme: dark) {
  .notion-link {
    color: #60a5fa;
  }

  .notion-link:hover {
    color: #93c5fd;
  }
}

.notion-inline-code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: monospace;
  border: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  .notion-inline-code {
    background-color: #1f2937;
    border-color: #374151;
  }
}

/* Notion color classes */
.notion-color-gray {
  color: #6b7280;
}
.notion-color-brown {
  color: #b45309;
}
.notion-color-orange {
  color: #ea580c;
}
.notion-color-yellow {
  color: #d97706;
}
.notion-color-green {
  color: #059669;
}
.notion-color-blue {
  color: #2563eb;
}
.notion-color-purple {
  color: #9333ea;
}
.notion-color-pink {
  color: #db2777;
}
.notion-color-red {
  color: #dc2626;
}

@media (prefers-color-scheme: dark) {
  .notion-color-gray {
    color: #9ca3af;
  }
  .notion-color-brown {
    color: #fbbf24;
  }
  .notion-color-orange {
    color: #fb923c;
  }
  .notion-color-yellow {
    color: #fbbf24;
  }
  .notion-color-green {
    color: #34d399;
  }
  .notion-color-blue {
    color: #60a5fa;
  }
  .notion-color-purple {
    color: #a78bfa;
  }
  .notion-color-pink {
    color: #f472b6;
  }
  .notion-color-red {
    color: #f87171;
  }
}

/* Background color classes */
.notion-color-gray_background {
  background-color: #f3f4f6;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}

.notion-color-brown_background {
  background-color: #fef3c7;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}

.notion-color-orange_background {
  background-color: #fed7aa;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}

.notion-color-yellow_background {
  background-color: #fef3c7;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}

.notion-color-green_background {
  background-color: #d1fae5;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}

.notion-color-blue_background {
  background-color: #dbeafe;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}

.notion-color-purple_background {
  background-color: #e9d5ff;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}

.notion-color-pink_background {
  background-color: #fce7f3;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}

.notion-color-red_background {
  background-color: #fee2e2;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}

@media (prefers-color-scheme: dark) {
  .notion-color-gray_background {
    background-color: #1f2937;
  }
  .notion-color-brown_background {
    background-color: #451a03;
  }
  .notion-color-orange_background {
    background-color: #431407;
  }
  .notion-color-yellow_background {
    background-color: #451a03;
  }
  .notion-color-green_background {
    background-color: #064e3b;
  }
  .notion-color-blue_background {
    background-color: #1e3a8a;
  }
  .notion-color-purple_background {
    background-color: #581c87;
  }
  .notion-color-pink_background {
    background-color: #831843;
  }
  .notion-color-red_background {
    background-color: #7f1d1d;
  }
}
</style>
