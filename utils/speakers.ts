import type {
  QueryDatabaseParameters,
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Client, LogLevel } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NUXT_PUBLIC_NOTION_TOKEN,
  logLevel: LogLevel.DEBUG,
});

const getClient = () => {
  const config = useRuntimeConfig();
  const token = config.public.token;

  if (!token)
    throw new Error(
      "The NUXT_PUBLIC_NOTION_TOKEN environment variable is required",
    );

  return notion;
};

export const fetchSpeakers = async (language: string) => {
  const config = useRuntimeConfig();
  const speakersDbId = config.public.notionSpeakersDbId;

  if (!speakersDbId) {
    throw new Error(
      "The NUXT_PUBLIC_NOTION_SPEAKERS_DB_ID environment variable is required.",
    );
  }

  console.log("Fetching speakers for language:", language);
  console.log("Using speakers database ID:", speakersDbId);

  try {
    // First, get ALL speakers without any filters to debug
    const args: QueryDatabaseParameters = {
      database_id: speakersDbId,
      filter: {
        property: "language",
        select: {
          equals: language,
        },
      },
      sorts: [
        {
          property: "order",
          direction: "ascending",
        },
      ],
    };

    const response = await notion.databases.query(args);
    console.log("Found speakers (total):", response.results.length);

    // Log the first speaker to see the structure
    if (response.results.length > 0) {
      console.log("First speaker structure:");
      console.log("ID:", response.results[0].id);
      if ("properties" in response.results[0]) {
        console.log("Properties:", Object.keys(response.results[0].properties));
        console.log(
          "Full first speaker:",
          JSON.stringify(response.results[0], null, 2),
        );
      }
    }

    return response;
  } catch (error) {
    console.error("Error in fetchSpeakers:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    throw error;
  }
};

export const fetchSpeakerById = async (
  language: string,
  id: string,
): Promise<PageObjectResponse | undefined> => {
  const config = useRuntimeConfig();
  const speakersDbId = config.public.notionSpeakersDbId;

  if (!speakersDbId) {
    throw new Error(
      "The NUXT_PUBLIC_NOTION_SPEAKERS_DB_ID environment variable is required.",
    );
  }

  try {
    const response = await notion.pages.retrieve({
      page_id: id,
    });

    // Verify it's a PageObjectResponse and has the right language
    if ("properties" in response) {
      const languageProp = response.properties.language as
        | Extract<PageObjectResponse["properties"][string], { type: "select" }>
        | undefined;

      const pageLanguage = languageProp?.select?.name;
      if (pageLanguage === language) {
        return response as PageObjectResponse;
      }
    }

    return undefined;
  } catch (error) {
    console.error("Error fetching speaker by ID:", error);
    return undefined;
  }
};

export const fetchSpeakerBySlug = async (
  language: string,
  slug: string,
): Promise<PageObjectResponse | undefined> => {
  const config = useRuntimeConfig();
  const speakersDbId = config.public.notionSpeakersDbId;

  if (!speakersDbId) {
    throw new Error(
      "The NUXT_PUBLIC_NOTION_SPEAKERS_DB_ID environment variable is required.",
    );
  }

  try {
    const response = await notion.databases.query({
      database_id: speakersDbId,
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

    return response.results[0] as PageObjectResponse | undefined;
  } catch (error) {
    console.error("Error fetching speaker by slug:", error);
    return undefined;
  }
};

export const fetchSpeakerBlocks = async (
  speakerId: string,
): Promise<BlockObjectResponse[]> => {
  try {
    const response = await notion.blocks.children.list({
      block_id: speakerId,
    });

    return response.results as BlockObjectResponse[];
  } catch (error) {
    console.error("Error fetching speaker blocks:", error);
    return [];
  }
};

export const fetchBlogsBySpeaker = async (
  language: string,
  speakerSlug: string,
): Promise<PageObjectResponse[]> => {
  const config = useRuntimeConfig();
  const databaseId = config.public.databaseId; // Blog database ID

  if (!databaseId) {
    throw new Error(
      "The NUXT_PUBLIC_NOTION_DATABASE_ID environment variable is required.",
    );
  }

  try {
    const response = await notion.databases.query({
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
            property: "speaker", // Assuming there's a speaker property in blog posts
            rich_text: {
              contains: speakerSlug,
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
    });

    return response.results as PageObjectResponse[];
  } catch (error) {
    console.error("Error fetching blogs by speaker:", error);
    return [];
  }
};
