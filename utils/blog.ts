import type {
  BlockObjectResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import { notion } from "./notion";

export const fetchPages = async (language: string, status = "Live") => {
  if (!process.env.NUXT_PUBLIC_NOTION_DATABASE_ID) {
    throw new Error(
      "The NUXT_PUBLIC_NOTION_DATABASE_ID environment variable is required.",
    );
  }

  const args: QueryDatabaseParameters = {
    database_id: process.env.NUXT_PUBLIC_NOTION_DATABASE_ID,
  };

  console.log("Fetching pages with status", status);
  if (status !== "All")
    args.filter = {
      property: "status",
      status: {
        equals: status,
      },
      and: [{ property: "language", select: { equals: language } }],
    };

  return notion.databases.query(args);
};

// Check cache
export const fetchBySlug = (language: string, slug: string) => {
  if (!process.env.NUXT_PUBLIC_NOTION_DATABASE_ID) {
    throw new Error(
      "The NUXT_PUBLIC_NOTION_DATABASE_ID environment variable is required.",
    );
  }

  return notion.databases
    .query({
      database_id: process.env.NUXT_PUBLIC_NOTION_DATABASE_ID,
      filter: {
        property: "slug",
        rich_text: { equals: slug },
        and: [{ property: "language", select: { equals: language } }],
      },
    })
    .then((response) => response.results[0] as PageObjectResponse | undefined);
};

async function fetchNestedBlocks(
  blockId: string,
): Promise<BlockObjectResponse[]> {
  const blocks = await notion.blocks.children
    .list({
      block_id: blockId,
    })
    .then((response) => response.results as BlockObjectResponse[]);

  const childBlocks = await Promise.all(
    blocks.map(async (block) => {
      if (block.has_children) {
        const children = await fetchNestedBlocks(block.id);
        return {
          ...block,
          children,
        };
      }
      return block;
    }),
  );

  return childBlocks;
}

export const fetchPageBlocks = (pageId: string) => {
  return fetchNestedBlocks(pageId);
};
