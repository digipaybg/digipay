import { fetchPages } from "~/utils/blog";

export default defineEventHandler(async (event) => {
  const blogs = await fetchPages("en");

  return {
    ...blogs,
  };
});
