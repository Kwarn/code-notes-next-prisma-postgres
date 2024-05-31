import { getNoteById } from "@/graphql/queries/notes";

export const getNote = async (id: string) => {
  "use server";
  try {
    const noteResponse = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: getNoteById,
        variables: { id },
      }),
    });

    const { data } = await noteResponse.json();
    if (!data?.note) throw new Error("Error fetching note");

    return data.note;
  } catch (e) {
    console.log(e);
  }
};
