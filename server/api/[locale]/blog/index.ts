import { fetchPages } from "~/utils/blog";

export default defineEventHandler(async (event) => {
  const language = getRouterParam(event, "locale");

  if (language === undefined) {
    return {
      status: 404,
    };
  }

  const blogs = await fetchPages(language);

  return {
    locale: language,
    status: 200,
    ...blogs,
  };
});
