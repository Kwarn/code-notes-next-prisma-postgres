import Table from "@/components/table";
import { getAllNotes } from "../../../graphql/queries/getNotes";

export default async function NotesPage() {
  let notes;
  try {
    const response = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: getAllNotes,
      }),
    });
    const { data } = await response.json();
    if (data && data.notes) {
      notes = data.notes;
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
  return (
    <div className="w-full h-screen">
      <h1 className="text-white">Notes</h1>
      <div className="flex flex-row w-full">
        <Table rows={notes} />
      </div>
    </div>
  );
}
