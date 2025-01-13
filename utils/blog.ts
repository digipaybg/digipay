import type {
  BlockObjectResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import { Client, LogLevel } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NUXT_PUBLIC_NOTION_TOKEN,
  logLevel: LogLevel.DEBUG,
});

export const getClient = () => {
  const config = useRuntimeConfig();
  const token = config.public.token;

  if (!token)
    throw new Error(
      "The NUXT_PUBLIC_NOTION_TOKEN environment variable is required",
    );

  return notion;
};

export const fetchPages = async (language: string) => {
  const config = useRuntimeConfig();
  const databaseId = config.public.databaseId;

  if (!databaseId) {
    throw new Error(
      "The NUXT_PUBLIC_NOTION_DATABASE_ID environment variable is required.",
    );
  }

  const args: QueryDatabaseParameters = {
    database_id: databaseId,
    filter: {
      property: "language",
      select: { equals: language },
    },
  };

  return await notion.databases.query(args);
};

// Check cache
export const fetchBySlug = (language: string, slug: string) => {
  const config = useRuntimeConfig();
  const databaseId = config.public.databaseId;

  if (!databaseId) {
    throw new Error(
      "The NUXT_PUBLIC_NOTION_DATABASE_ID environment variable is required.",
    );
  }

  return notion.databases
    .query({
      database_id: databaseId,
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
