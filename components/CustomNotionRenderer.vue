<template>
  <div class="custom-notion-renderer">
    <template v-for="block in blocks" :key="block.id">
      <!-- Paragraph Text -->
      <p v-if="block.type === 'paragraph'" class="notion-paragraph">
        <CustomNotionRichText :rich-text="block.paragraph?.rich_text || []" />
      </p>

      <!-- Heading 1 -->
      <h1 v-else-if="block.type === 'heading_1'" class="notion-h1">
        <CustomNotionRichText :rich-text="block.heading_1?.rich_text || []" />
      </h1>

      <!-- Heading 2 -->
      <h2 v-else-if="block.type === 'heading_2'" class="notion-h2">
        <CustomNotionRichText :rich-text="block.heading_2?.rich_text || []" />
      </h2>

      <!-- Heading 3 -->
      <h3 v-else-if="block.type === 'heading_3'" class="notion-h3">
        <CustomNotionRichText :rich-text="block.heading_3?.rich_text || []" />
      </h3>

      <!-- Image -->
      <figure v-else-if="block.type === 'image'" class="notion-image-wrapper">
        <img
          :src="getImageUrl(block.image)"
          :alt="getImageCaption(block.image) || 'Blog image'"
          class="notion-image"
          loading="lazy"
        />
        <figcaption
          v-if="getImageCaption(block.image)"
          class="notion-image-caption"
        >
          {{ getImageCaption(block.image) }}
        </figcaption>
      </figure>

      <!-- Bulleted List Item -->
      <ul
        v-else-if="block.type === 'bulleted_list_item'"
        class="notion-bulleted-list"
      >
        <li class="notion-list-item">
          <CustomNotionRichText
            :rich-text="block.bulleted_list_item?.rich_text || []"
          />
        </li>
      </ul>

      <!-- Numbered List Item -->
      <ol
        v-else-if="block.type === 'numbered_list_item'"
        class="notion-numbered-list"
      >
        <li class="notion-list-item">
          <CustomNotionRichText
            :rich-text="block.numbered_list_item?.rich_text || []"
          />
        </li>
      </ol>

      <!-- Quote -->
      <blockquote v-else-if="block.type === 'quote'" class="notion-quote">
        <CustomNotionRichText :rich-text="block.quote?.rich_text || []" />
      </blockquote>

      <!-- Code Block -->
      <pre
        v-else-if="block.type === 'code'"
        class="notion-code"
      ><code>{{ getPlainText(block.code?.rich_text || []) }}</code></pre>

      <!-- Divider -->
      <hr v-else-if="block.type === 'divider'" class="notion-divider" />

      <!-- Callout -->
      <div v-else-if="block.type === 'callout'" class="notion-callout">
        <span v-if="block.callout?.icon" class="notion-callout-icon">
          {{ getIcon(block.callout.icon) }}
        </span>
        <div class="notion-callout-content">
          <CustomNotionRichText :rich-text="block.callout?.rich_text || []" />
        </div>
      </div>

      <!-- Todo -->
      <div v-else-if="block.type === 'to_do'" class="notion-todo">
        <input
          type="checkbox"
          :checked="block.to_do?.checked"
          disabled
          class="notion-checkbox"
        />
        <span class="notion-todo-text">
          <CustomNotionRichText :rich-text="block.to_do?.rich_text || []" />
        </span>
      </div>

      <!-- Unsupported block type fallback -->
      <div v-else class="notion-unsupported">
        <p class="text-sm text-gray-500">
          Block type "{{ block.type }}" is not supported yet.
        </p>
      </div>

      <!-- Render nested children -->
      <div
        v-if="block.children && block.children.length > 0"
        class="notion-children"
      >
        <CustomNotionRenderer :blocks="block.children" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

interface Props {
  blocks: (BlockObjectResponse & { children?: BlockObjectResponse[] })[];
}

const props = defineProps<Props>();

// Helper function to get plain text from rich text
const getPlainText = (richText: RichTextItemResponse[]): string => {
  return richText.map((text) => text.plain_text || "").join("");
};

// Define interfaces for image and icon types
interface NotionImage {
  type: "external" | "file";
  external?: { url: string };
  file?: { url: string };
  caption?: RichTextItemResponse[];
}

interface NotionIcon {
  type: "emoji" | "external" | "file" | "custom_emoji";
  emoji?: string;
  external?: { url: string };
  file?: { url: string };
  custom_emoji?: { url: string };
}

// Helper function to get image URL
const getImageUrl = (image: NotionImage | undefined): string => {
  if (!image) return "";

  if (image.type === "external") {
    return image.external?.url || "";
  }
  if (image.type === "file") {
    return image.file?.url || "";
  }
  return "";
};

// Helper function to get image size
const getImageSize = (image: NotionImage | undefined): number | undefined => {
  if (!image) return undefined;

  // Assuming a default size, you can adjust this logic as needed
  return image.type === "external" ? 800 : 600;
};

// Helper function to get image caption
const getImageCaption = (image: NotionImage | undefined): string => {
  if (!image?.caption) return "";
  return getPlainText(image.caption);
};

// Helper function to get icon
const getIcon = (icon: NotionIcon | undefined): string => {
  if (!icon) return "";

  if (icon.type === "emoji") {
    return icon.emoji || "💡";
  }
  if (icon.type === "external") {
    return "🔗";
  }
  if (icon.type === "file") {
    return "📁";
  }
  if (icon.type === "custom_emoji") {
    return "🎨";
  }
  return "💡";
};
</script>

<style scoped>
.custom-notion-renderer {
  max-width: none;
  margin-bottom: 1.5rem;
}

.custom-notion-renderer > * + * {
  margin-top: 1.5rem;
}

/* Typography */
.notion-paragraph {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #e5e7eb;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  .notion-paragraph {
    font-size: 1.2rem;
  }
}

.notion-h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: #ffffff;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  line-height: 1.25;
}

.notion-h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  line-height: 1.25;
}

@media (min-width: 640px) {
  .notion-h2 {
    font-size: 2rem;
  }
}

.notion-h3 {
  font-size: 1.5rem;
  font-weight: 500;
  color: #ffffff;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  line-height: 1.25;
}

/* Images */
.notion-image-wrapper {
  margin: 2rem 0;
}

.notion-image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  object-fit: cover;
  max-height: 500px;
}

.notion-image-caption {
  font-size: 0.875rem;
  color: #9ca3af;
  text-align: center;
  margin-top: 0.75rem;
  font-style: italic;
}

/* Lists */
.notion-bulleted-list {
  list-style-type: disc;
  list-style-position: inside;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.notion-bulleted-list .notion-list-item {
  margin-bottom: 0.5rem;
}

.notion-numbered-list {
  list-style-type: decimal;
  list-style-position: inside;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.notion-numbered-list .notion-list-item {
  margin-bottom: 0.5rem;
}

.notion-list-item {
  color: #e5e7eb;
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (min-width: 640px) {
  .notion-list-item {
    font-size: 1.2rem;
  }
}

/* Quote */
.notion-quote {
  border-left: 4px solid #3b82f6;
  padding-left: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: 1.5rem 0;
  background-color: #1f2937;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  font-style: italic;
  color: #d1d5db;
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (min-width: 640px) {
  .notion-quote {
    font-size: 1.2rem;
  }
}

/* Code */
.notion-code {
  background-color: #1f2937;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.875rem;
  font-family: monospace;
  margin: 1rem 0;
  border: 1px solid #374151;
}

.notion-code code {
  color: #e5e7eb;
}

/* Divider */
.notion-divider {
  border-color: #4b5563;
  margin: 2rem 0;
}

/* Callout */
.notion-callout {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #1e3a8a;
  border: 1px solid #1d4ed8;
  border-radius: 0.5rem;
}

.notion-callout-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.notion-callout-content {
  flex: 1;
  color: #e5e7eb;
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (min-width: 640px) {
  .notion-callout-content {
    font-size: 1.2rem;
  }
}

/* Todo */
.notion-todo {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0.5rem 0;
}

.notion-checkbox {
  margin-top: 0.25rem;
  width: 1rem;
  height: 1rem;
  color: #2563eb;
  border-color: #4b5563;
  border-radius: 0.25rem;
}

.notion-todo-text {
  flex: 1;
  color: #e5e7eb;
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (min-width: 640px) {
  .notion-todo-text {
    font-size: 1.2rem;
  }
}

/* Nested children */
.notion-children {
  margin-left: 1.5rem;
  margin-top: 1rem;
  border-left: 2px solid #374151;
  padding-left: 1.5rem;
}

/* Unsupported blocks */
.notion-unsupported {
  padding: 0.75rem;
  margin: 0.5rem 0;
  background-color: #451a03;
  border: 1px solid #a16207;
  border-radius: 0.5rem;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .notion-h1 {
    font-size: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  .notion-h2 {
    font-size: 1.125rem;
    margin-top: 1rem;
    margin-bottom: 0.75rem;
  }

  .notion-h3 {
    font-size: 1.125rem;
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .notion-children {
    margin-left: 1rem;
    padding-left: 1rem;
  }

  .notion-bulleted-list,
  .notion-numbered-list {
    margin-left: 1rem;
  }
}
</style>
