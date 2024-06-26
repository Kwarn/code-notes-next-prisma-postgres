"use client";

import Table from "@/components/table";
import { NoteWithAuthorType } from "@/types/types";
import { useOptimistic } from "react";
import ExportNotes from "@/components/exportNotes";

interface NotePageProps {
  notes: NoteWithAuthorType[] | undefined | null;
  deleteNote: (formData: FormData) => void;
  updateNote: (formData: FormData) => void;
}

export default function NotesComponent({
  notes,
  deleteNote,
  updateNote,
}: Readonly<NotePageProps>) {
  const [optimisticNotes, deleteOptimisticNote] = useOptimistic(
    notes,
    (state, noteId: string) => {
      const updatedState = state?.filter((note) => note.id !== noteId);
      return updatedState;
    },
  );
  return (
    <div className="w-full h-screen">
      <ExportNotes notes={notes} />
      <div className="flex flex-row w-full">
        {optimisticNotes && (
          <Table
            rows={optimisticNotes}
            deleteOptimisticNote={deleteOptimisticNote}
            deleteNote={deleteNote}
            updateNote={updateNote}
          />
        )}
      </div>
    </div>
  );
}
