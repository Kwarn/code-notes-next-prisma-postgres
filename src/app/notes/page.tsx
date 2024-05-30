import { getNotes } from "../../graphql/queries/notes";
import { NoteWithAuthorType } from "@/types/types";
import NotesComponent from "@/components/notes";
import { deleteNote } from "@/actions/deleteNote";
import { formatDate } from "@/utils/utils";
import { redirect } from "next/navigation";

export default async function NotesPage() {
  let notes: NoteWithAuthorType[] | undefined | null = null;
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
    if (!data?.notes) throw new Error("Error fetching notes");

    const formattedNotes = data.notes.map((note: NoteWithAuthorType) => ({
      ...note,
      // do date format here to prevent hydration error due to mismatch between server and client date.
      createdAt: formatDate(Number(note.createdAt)),
    }));

    notes = formattedNotes;
  } catch (error) {
    console.error("Error fetching notes:", error);
  }

  const updateNote = async (formData: FormData) => {
    'use server'
    const noteId = formData.get("id");
    redirect(`/add-note/${noteId}`);
  };
  return (
    <div className="w-full h-screen">
      <NotesComponent
        notes={notes}
        deleteNote={deleteNote}
        updateNote={updateNote}
      />
    </div>
  );
}
