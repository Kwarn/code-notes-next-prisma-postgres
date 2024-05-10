import { formatDate } from "@/utils/utils";
import { NoteWithAuthorType } from "@/types/types";
import SeverActionButton from "./serverActionButton";
import { deleteNote } from "@/actions/deleteNote";

interface TableProps {
  activeRowId?: string;
  rows: NoteWithAuthorType[];
}

export default function Table({ activeRowId, rows }: Readonly<TableProps>) {
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
                className={
                  activeRowId === id
                    ? "bg-black"
                    : index % 2 === 0
                    ? "bg-gray-100"
                    : ""
                }
              >
                <td className="py-2 px-3 text-left">{name}</td>
                <td className="py-2 px-3">{category}</td>
                <td className="py-2 px-3">{content}</td>
                <td className="py-2 px-3 text-right">
                  {formatDate(Number(createdAt))}
                </td>
                <td className="py-2 px-3">
                  <SeverActionButton
                    id={id}
                    text="delete"
                    action={deleteNote}
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
