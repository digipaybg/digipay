interface Contact {
  name: string;
  email: string;
  message: string;
}

export const addContact = async (contact: Contact) => {
  const config = useRuntimeConfig();
  const databaseId = config.public.contactsDatabaseId as string;

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
