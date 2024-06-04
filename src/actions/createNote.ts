'use server'
import { createNoteMutation } from "@/graphql/mutations/notes";
import { CustomError } from "@/types/types";
import { revalidatePath } from "next/cache";

export const createNote = async (formData: FormData) => {
  const category = formData.get("category");
  const content = formData.get("content");

  if (!category || !content) {
    console.error("Missing category or content.");
    return { success: false, error: "Missing category or content" };
  }

  try {
    const response = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: createNoteMutation,
        variables: { content, category },
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return { success: true, noteId: responseData.data.createNoteForUser.id };
    } else {
      console.error("Failed to create note:", responseData.errors);
      return { success: false };
    }
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error creating note:", customError);
    return { success: false, error: customError.message };
  } finally {
    revalidatePath("/notes");
  }
};
