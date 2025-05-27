import { fetchPages } from "~/utils/blog";
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

        const titleProperty = result.properties.title;
        if (!titleProperty || !("title" in titleProperty)) return false;

        const titleArray = titleProperty.title;
        if (!Array.isArray(titleArray) || titleArray.length === 0) return false;

        const firstTitle = titleArray[0];
        if (!firstTitle || !("text" in firstTitle)) return false;

        return !!firstTitle.text?.content;
      }) || [];

    return {
      locale: language,
      status: 200,
      results: validResults,
    };
  } catch (error) {
    console.error("Error fetching blog pages:", error);
    return {
      locale: language,
      status: 500,
      results: [],
    };
  }
});
