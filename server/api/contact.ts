import { addContact } from "~/utils/contact";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    await addContact(body);
    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to submit contact form",
    });
  }
});
