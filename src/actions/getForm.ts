import { getAddNoteForm } from "@/graphql/queries/forms";

export const getForm = async () => {
  "use server";

  try {
    const formResponse = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: getAddNoteForm,
      }),
    });
    const { data } = await formResponse.json();
    if (data?.errors) throw new Error("Error fetching form");

    return data?.form;
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};
