"use server";

interface Contact {
  name: string;
  email: string;
  message: string;
}

export const addContact = async (contact: Contact) => {
  const databaseId = process.env.NUXT_PUBLIC_NOTION_CONTACTS_DATABASE_ID;

  if (!databaseId) {
    throw new Error(
      "NUXT_PUBLIC_NOTION_CONTACTS_DATABASE_ID is not configured",
    );
  }

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
