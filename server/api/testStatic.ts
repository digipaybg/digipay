import { readdir, readdirSync } from "node:fs";

export default defineEventHandler(async (event) => {
  const files = readdirSync("./public/gallery/");

  return files;
});
