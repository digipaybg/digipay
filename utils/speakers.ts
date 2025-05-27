import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { notion } from "./blog";

export const fetchSpeakers = async (language: string) => {
  const config = useRuntimeConfig();
  const speakersDbId = config.public.notionSpeakersDbId;

  if (!speakersDbId) {
    throw new Error(
      "The NUXT_PUBLIC_NOTION_SPEAKERS_DB_ID environment variable is required.",
    );
  }

  console.log("Fetching speakers for language:", language);

  const args: QueryDatabaseParameters = {
    database_id: speakersDbId,
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
        property: "name",
        direction: "ascending",
      },
    ],
  };

  const response = await notion.databases.query(args);
  console.log("Found speakers:", response.results.length);
  return response;
};
