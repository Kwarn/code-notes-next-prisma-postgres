import { deleteNoteMutation } from "@/graphql/mutations/notes";

export const deleteNote = async (formData: FormData) => {
  "use server";

  const id = formData.get("id");
  console.log('delete note action id', id)
  try {
    const response = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: deleteNoteMutation,
        variables: { id },
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
  }
};
