import Table from "@/components/table";
import { getNotes } from "../../graphql/queries/getNotes";
import { NoteWithAuthorType } from "@/types/types";

export default async function NotesPage() {
  let notes: NoteWithAuthorType[] | null = null;
  try {
    const response = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: getNotes,
      }),
      cache: "no-store", // TODO
    });

    const { data } = await response.json();
    if (!data || !data.notes) throw new Error("Error fetching notes");

    notes = data.notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
  return (
    <div className="w-full h-screen">
      <h1 className="text-white">Notes</h1>
      <div className="flex flex-row w-full">
        {notes && <Table rows={notes} />}
      </div>
    </div>
  );
}
