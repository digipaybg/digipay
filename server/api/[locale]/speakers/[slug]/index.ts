import { fetchSpeakerBySlug } from "~/utils/speakers";

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

  return speaker;
});
