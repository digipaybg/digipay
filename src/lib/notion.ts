import {
  type BlockObjectResponse,
  Client,
  type PageObjectResponse,
} from "@notionhq/client";
import React from "react";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const fetchPages = React.cache(() => {
  return notion.databases.query({
    database_id: "15795c325fa780f2939add8bb30d4b36",
    filter: {
      property: "slug",
      rich_text: {
        is_not_empty: true,
      },
    },
  });
});

export const fetchBySlug = React.cache(async (slug: string) => {
  return notion.databases
    .query({
      database_id: "15795c325fa780f2939add8bb30d4b36",
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined);
});

export const fetchPageBlocks = React.cache(async (pageId: string) => {
  return notion.blocks.children
    .list({
      block_id: pageId,
    })
    .then((res) => res.results as BlockObjectResponse[]);
});
