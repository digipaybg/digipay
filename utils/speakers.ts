// import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
// import { notion } from "./notion";

// export const fetchSpeakers = async (language: string) => {
//   if (!process.env.NOTION_SPEAKERS_DATABASE_ID) {
//     throw new Error(
//       "The NOTION_SPEAKERS_DATABASE_ID environment variable is required.",
//     );
//   }

//   const args: QueryDatabaseParameters = {
//     database_id: process.env.NOTION_SPEAKERS_DATABASE_ID,
//     filter: {
//       property: "language",
//       select: { equals: language },
//     },
//   };

//   return notion.databases.query(args);
// };
