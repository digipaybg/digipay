import { defineEventHandler } from "h3";
import { Client, LogLevel } from "@notionhq/client";
import type {
  PageObjectResponse,
  QueryDatabaseParameters,
  RichTextItemResponse,
  TitlePropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  URLPropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

interface Speaker {
  id: string; // Use Notion page ID as the speaker ID
  name: string;
  role: string;
  picture: string;
}

// Helper function to safely extract text from Notion rich text arrays
function getPlainText(richTextArray: RichTextItemResponse[]): string {
  return richTextArray.map((richText) => richText.plain_text).join("");
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const notionToken = config.public.notionToken; // Assumes NUXT_PUBLIC_NOTION_TOKEN
  const speakersDbId = config.public.notionSpeakersDbId; // Assumes NUXT_PUBLIC_NOTION_SPEAKERS_DB_ID

  if (!notionToken) {
    throw new Error(
      "NUXT_PUBLIC_NOTION_TOKEN environment variable is missing.",
    );
  }
  if (!speakersDbId) {
    throw new Error(
      "NUXT_PUBLIC_NOTION_SPEAKERS_DB_ID environment variable is missing.",
    );
  }

  const notion = new Client({
    auth: notionToken as string,
    // You might want to remove or change logLevel for production
    logLevel:
      process.env.NODE_ENV === "development" ? LogLevel.DEBUG : undefined,
  });

  try {
    const args: QueryDatabaseParameters = {
      database_id: speakersDbId as string,
      // Add filters or sorts if needed, e.g., filter by language if your DB supports it
      // filter: { property: "language", select: { equals: locale } },
      sorts: [
        // Example sort: Sort by a 'Order' number property if you have one
        // { property: "Order", direction: "ascending" },
        // Or sort by Name
        { property: "Name", direction: "ascending" },
      ],
    };

    const response = await notion.databases.query(args);

    const speakers: Speaker[] = response.results
      .map((page): Speaker | null => {
        if (!("properties" in page)) {
          return null; // Skip if page properties are not loaded
        }

        const props = page.properties;

        // --- Adjust these property names to match your Notion DB ---
        const nameProp =
          props.Name as unknown as TitlePropertyItemObjectResponse;
        const roleProp =
          props.Role as unknown as RichTextPropertyItemObjectResponse;
        const pictureProp = props.Picture as URLPropertyItemObjectResponse;
        // --- End of properties to adjust ---

        // Basic validation
        if (
          !nameProp?.title?.[0]?.plain_text ||
          !roleProp?.rich_text?.[0]?.plain_text ||
          !pictureProp?.url
        ) {
          console.warn(
            "Skipping speaker page with missing properties:",
            page.id,
          );
          return null;
        }

        return {
          id: page.id,
          name: getPlainText(nameProp.title),
          role: getPlainText(roleProp.rich_text),
          picture: pictureProp.url,
        };
      })
      .filter((speaker): speaker is Speaker => speaker !== null); // Filter out any null results

    return speakers;
  } catch (error) {
    console.error("Error fetching speakers from Notion:", error);
    // Optionally return a more specific error status code
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch speakers",
    });
  }
});
