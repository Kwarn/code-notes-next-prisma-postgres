import { NoteType } from "@/types/types";
import React from "react";
import ServerActionButton from "@/components/serverActionButton";

const ExportNotes = ({ notes }: { notes: NoteType[] | undefined | null }) => {
  const exportAllNotes = async () => {
    const notesToExport = notes?.map((note: NoteType) => {
      return {
        category: note.category,
        content: note.content,
      };
    });
    const data = JSON.stringify(notesToExport);
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.json";
    a.click();
  };
  return (
    <ServerActionButton
      id="exportNotesButton"
      text="Export notes"
      action={exportAllNotes}
    />
  );
};

export default ExportNotes;
