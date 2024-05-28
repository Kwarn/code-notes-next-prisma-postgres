import { NoteWithAuthorType } from "@/types/types";
import SeverActionButton from "./serverActionButton";

interface TableProps {
  rows: NoteWithAuthorType[];
  deleteOptimisticNote: (noteId: string) => void;
  deleteNote: (formData: FormData) => void;
  updateNote: (formData: FormData) => void;
}

export default function Table({
  rows,
  deleteOptimisticNote,
  deleteNote,
  updateNote,
}: Readonly<TableProps>) {
  return (
    <div className="overflow-x-auto w-full p-10">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase">
            <th className="py-2 px-3 text-left">Author</th>
            <th className="py-2 px-3 text-left">Category</th>
            <th className="py-2 px-3 text-left">Note</th>
            <th className="py-2 px-3 text-right">Date</th>
            <th className="py-2 px-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {rows?.map(
            ({ id, createdAt, category, content, author: { name } }, index) => (
              <tr
                key={createdAt}
                className={`${index % 2 === 0 ? "bg-gray-100" : ""}`}
              >
                <td className="py-2 px-3 text-left">{name}</td>
                <td className="py-2 px-3">{category}</td>
                <td className="py-2 px-3">{content}</td>
                <td className="py-2 px-3 text-right">{createdAt}</td>
                <td className="py-2 px-3 text-right">
                  <SeverActionButton
                    optimisticCb={deleteOptimisticNote}
                    id={id}
                    text="delete"
                    action={deleteNote}
                  />
                  <SeverActionButton
                    id={id}
                    text="edit"
                    action={updateNote}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
