import { updateNoteMutation } from "@/graphql/mutations/notes";
import { CustomError } from "@/types/types";
import { revalidatePath } from "next/cache";

export const updateNote = async (formData: FormData, noteId: String) => {
  "use server";
  const category = formData.get("category");
  const content = formData.get("content");

  if (!category || !content || !noteId) {
    console.error("Missing category, content or id");
    return { success: false, error: "Missing category, content or id" };
  }

  try {
    const response = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: updateNoteMutation,
        variables: { id: noteId, content, category },
      }),
    });

    const responseData = await response.json();

    if (response.ok && responseData.data) {
      return { success: true, noteId: responseData.data.updateNote.id };
    } else {
      console.error("Failed to update note:", responseData.errors);
      return { success: false, error: responseData.errors };
    }
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error updating note:", customError);
    return { success: false, error: customError.message };
  } finally {
    revalidatePath("/notes");
  }
};
