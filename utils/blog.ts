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

  console.log("Fetching pages for language:", language);

  const args: QueryDatabaseParameters = {
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "language",
          select: {
            equals: language,
          },
        },
        {
          property: "image",
          rich_text: {
            is_not_empty: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  };

  const response = await notion.databases.query(args);
  console.log("Found pages:", response.results.length);
  return response;
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
        and: [
          {
            property: "slug",
            rich_text: { equals: slug },
          },
          {
            property: "language",
            select: { equals: language },
          },
        ],
      },
    })
    .then((response) => {
      return response.results[0] as PageObjectResponse | undefined;
    });
};

async function fetchNestedBlocks(
  blockId: string,
): Promise<(BlockObjectResponse & { children?: BlockObjectResponse[] })[]> {
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

export const fetchPageBlocks = async (
  pageId: string,
): Promise<(BlockObjectResponse & { children?: BlockObjectResponse[] })[]> => {
  return await fetchNestedBlocks(pageId);
};
