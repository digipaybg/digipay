import { fetchSpeakerBySlug, fetchSpeakerBlocks } from "~/utils/speakers";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const language = getRouterParam(event, "locale");

  if (slug === undefined || language === undefined) {
    throw createError({
      statusCode: 404,
      statusMessage: "Speaker not found",
    });
  }

  const speaker = await fetchSpeakerBySlug(language, slug);
  if (!speaker) {
    throw createError({
      statusCode: 404,
      statusMessage: "Speaker not found",
    });
  }

  try {
    const blocks = await fetchSpeakerBlocks(speaker.id);
    return blocks;
  } catch (error) {
    console.error("Error fetching speaker blocks:", error);
    return [];
  }
});
