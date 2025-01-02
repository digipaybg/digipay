"use server";

import { notion } from "./notion";
import { defineEventHandler } from "h3";

interface Subscriber {
  email: string;
  name?: string;
  subscribed: boolean;
}

export const addSubscriber = async (subscriber: {
  email: string;
  name?: string;
}) => {
  const databaseId = process.env.NOTION_NEWSLETTER_DATABASE_ID;

  if (!databaseId) {
    throw new Error("NOTION_NEWSLETTER_DATABASE_ID is not configured");
  }

  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Email: {
          email: subscriber.email,
        },
        Name: {
          title: subscriber.name
            ? [{ text: { content: subscriber.name } }]
            : [],
        },
      },
    });
  } catch (error) {
    console.error("Failed to add subscriber to Notion:", error);
    throw new Error("Failed to add subscriber");
  }
};

export const getAllSubscribers = async (): Promise<Subscriber[]> => {
  const databaseId = process.env.NOTION_NEWSLETTER_DATABASE_ID;

  if (!databaseId) {
    throw new Error("NOTION_NEWSLETTER_DATABASE_ID is not configured");
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "subscribed",
        checkbox: {
          equals: true,
        },
      },
    });

    return response.results.map((page: any) => ({
      email: page.properties.email.email,
      name: page.properties.name?.title[0]?.plain_text,
      subscribed: page.properties.subscribed.checkbox,
    }));
  } catch (error) {
    console.error("Failed to fetch subscribers from Notion:", error);
    throw new Error("Failed to fetch subscribers");
  }
};
