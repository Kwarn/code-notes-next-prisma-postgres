import { createNoteMutation } from "@/graphql/mutations/notes";

export const createNote = async (formData: FormData) => {
  "use server";
  const category = formData.get("category");
  const content = formData.get("content");

  if (!category || !content) return;

  try {
    const response = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: createNoteMutation,
        variables: { content, category },
      }),
      cache: "no-store",
    });

    const responseData = await response.json();

    if (response.ok) {
      return { success: true, noteId: responseData.data.createNoteForUser.id };
    } else {
      console.error("Failed to create note:", responseData.errors);
      return { success: false };
    }
  } catch (error) {
    console.error("Error creating note:", error);
    return;
  }
};
