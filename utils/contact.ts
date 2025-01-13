interface Contact {
  name: string;
  email: string;
  message: string;
}

import { Client, LogLevel } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NUXT_PUBLIC_NOTION_TOKEN,
  logLevel: LogLevel.DEBUG,
});

export const getClient = () => {
  const config = useRuntimeConfig();
  const token = config.public.token;

  if (!token)
    throw new Error(
      "The NUXT_PUBLIC_NOTION_TOKEN environment variable is required",
    );

  return notion;
};

export const addContact = async (contact: Contact) => {
  const config = useRuntimeConfig();

  const databaseId = config.public.contactsDatabaseId;

  if (!databaseId) {
    throw new Error(
      "NUXT_PUBLIC_NOTION_CONTACTS_DATABASE_ID is not configured",
    );
  }

  const notion = getClient();

  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: { content: contact.name },
            },
          ],
        },
        Email: {
          email: contact.email,
        },
        Message: {
          rich_text: [
            {
              text: { content: contact.message },
            },
          ],
        },
        CreatedAt: {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to add contact to Notion:", error);
    throw new Error("Failed to submit contact form");
  }
};
