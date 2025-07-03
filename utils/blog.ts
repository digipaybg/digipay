import type {
  BlockObjectResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import { Client, LogLevel } from "@notionhq/client";
import { downloadAndCacheImage } from "./image-cache";

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

  // Cache cover images for all pages
  const pagesWithCachedImages = await Promise.all(
    (response.results as PageObjectResponse[]).map(async (page) => {
      const notionCoverUrl = extractCoverImageUrl(page);
      let cachedCoverUrl = "/18.png";

      if (notionCoverUrl) {
        try {
          cachedCoverUrl = await downloadAndCacheImage(notionCoverUrl);
        } catch (error) {
          console.error("Failed to cache cover image:", error);
        }
      }

      return {
        ...page,
        cached_cover_url: cachedCoverUrl,
      };
    }),
  );

  return {
    ...response,
    results: pagesWithCachedImages,
  };
};

// Helper function to extract cover image URL
function extractCoverImageUrl(page: PageObjectResponse): string | null {
  if (
    page?.cover &&
    typeof page.cover === "object" &&
    "type" in page.cover &&
    page.cover.type === "file"
  ) {
    return (page.cover as any).file?.url ?? null;
  }

  if (
    page?.cover &&
    typeof page.cover === "object" &&
    "type" in page.cover &&
    page.cover.type === "external"
  ) {
    return (page.cover as any).external?.url ?? null;
  }

  return null;
}

// Check cache
export const fetchBySlug = async (language: string, slug: string) => {
  const config = useRuntimeConfig();
  const databaseId = config.public.databaseId;

  if (!databaseId) {
    throw new Error(
      "The NUXT_PUBLIC_NOTION_DATABASE_ID environment variable is required.",
    );
  }

  const response = await notion.databases.query({
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
  });

  const page = response.results[0] as PageObjectResponse | undefined;

  if (!page) {
    return undefined;
  }

  // Extract and cache the cover image
  const notionCoverUrl = extractCoverImageUrl(page);
  let cachedCoverUrl = "/18.png"; // default fallback

  if (notionCoverUrl) {
    try {
      cachedCoverUrl = await downloadAndCacheImage(notionCoverUrl);
    } catch (error) {
      console.error("Failed to cache cover image:", error);
    }
  }

  // Return the page with a cached cover URL
  return {
    ...page,
    cached_cover_url: cachedCoverUrl,
  };
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
