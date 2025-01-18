import { fetchBySlug, fetchPageBlocks } from "~/utils/blog";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const language = getRouterParam(event, "locale");

  if (slug === undefined || language === undefined) {
    return {
      status: 404,
    };
  }

  const page = await fetchBySlug(language, slug);
  if (!page) {
    return {
      status: 404,
    };
  }

  const blocks = await fetchPageBlocks(page?.id);
  return [...blocks];
});
