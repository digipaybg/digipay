import { Client } from "@notionhq/client";

// if (!process.env.NUXT_PUBLIC_NOTION_TOKEN) {
//   throw new Error("NUXT_PUBLIC_NOTION_TOKEN is not set");
// }

export const notion = new Client({
  auth: process.env.NUXT_PUBLIC_NOTION_TOKEN,
});
