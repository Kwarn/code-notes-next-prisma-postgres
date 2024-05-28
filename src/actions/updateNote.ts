import { updateNoteMutation } from "@/graphql/mutations/notes";
import { revalidatePath } from "next/cache";

export const updateNote = async (formData: FormData) => {
  "use server";

  const id = formData.get("id");
  const content = formData.get("content");
  const category = formData.get("category");
  try {
    const response = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: updateNoteMutation,
        variables: { id, content, category },
      }),
      cache: "no-store",
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log("Note deleted successfully:", responseData);
    } else {
      console.error("Failed to create note:", responseData.errors);
    }
    return;
  } catch (error) {
    console.error("Error creating note:", error);
    return;
  } finally {
    revalidatePath("/notes");
  }
};
