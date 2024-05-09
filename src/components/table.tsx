import { formatDate } from "@/utils/utils";
import { NoteWithAuthorType } from "@/types/types";
import Button from "./serverActionButton";
import { deleteNote } from "@/actions/deleteNote";

interface TableProps {
  rows: NoteWithAuthorType[];
}

export default function Table({ rows }: Readonly<TableProps>) {
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
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="py-2 px-3 text-left">{name}</td>
                <td className="py-2 px-3">{category}</td>
                <td className="py-2 px-3">{content}</td>
                <td className="py-2 px-3 text-right">
                  {formatDate(Number(createdAt))}
                </td>
                <td className="py-2 px-3">
                  <Button id={id} text="delete" callback={deleteNote}></Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
