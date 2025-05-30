import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { fetchSpeakers } from "~/utils/speakers";

export default defineEventHandler(async (event) => {
  const language = getRouterParam(event, "locale");

  if (language === undefined) {
    return {
      status: 404,
    };
  }

  try {
    const speakers = await fetchSpeakers(language);

    // Filter out any null or invalid results
    const validResults =
      speakers.results?.filter((result): result is PageObjectResponse => {
        if (!result || !("properties" in result)) return false;

        // Check for name property (lowercase)
        const nameProperty = result.properties.name;
        if (!nameProperty || !("title" in nameProperty)) return false;

        const nameArray = nameProperty.title;
        if (!Array.isArray(nameArray) || nameArray.length === 0) return false;

        const firstName = nameArray[0];
        if (!firstName || !("plain_text" in firstName)) return false;

        return !!firstName.plain_text;
      }) || [];

    return {
      locale: language,
      status: 200,
      results: validResults,
    };
  } catch (error) {
    console.error("Error fetching speakers:", error);
    return {
      locale: language,
      status: 500,
      results: [],
    };
  }
});
