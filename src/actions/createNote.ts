import { createNoteMutation } from "@/graphql/mutations/createNote";

export const createNote = async (formData: FormData) => {
  console.log(formData.get("content"));
  //   try {
  //     const response = await fetch("http://localhost:3000/api/graphql", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         query: createNoteMutation, // Use 'query' field for mutations
  //         variables: { content, category }, // Provide mutation variables
  //       }),
  //       cache: "no-store",
  //     });

  //     const responseData = await response.json();

  //     if (response.ok) {
  //       console.log("Note created successfully:", responseData.data.createNote);
  //     } else {
  //       console.error("Failed to create note:", responseData.errors);
  //     }
  //     return;
  //   } catch (error) {
  //     console.error("Error creating note:", error);
  //     return;
  //   }
};
