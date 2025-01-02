import { fetchBySlug } from "~/utils/blog";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (slug === undefined) {
    return {
      status: 404,
    };
  }

  const page = await fetchBySlug("en", slug);

  return {
    slug,
    ...page,
  };
});
