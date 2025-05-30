import { fetchSpeakerBySlug, fetchBlogsBySpeaker } from "~/utils/speakers";

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
    const blogs = await fetchBlogsBySpeaker(language, slug);
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs by speaker:", error);
    return [];
  }
});
