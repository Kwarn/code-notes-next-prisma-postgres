import { deleteNoteMutation } from "@/graphql/mutations/notes";
import { revalidatePath } from "next/cache";

export const deleteNote = async (formData: FormData) => {
  "use server";

  const id = formData.get("id");
  try {
    const response = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: deleteNoteMutation,
        variables: { id },
      }),
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
