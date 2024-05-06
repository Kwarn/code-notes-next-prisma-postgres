import { Note } from "@/types/types";

interface TableProps {
  rows: Note[];
}

export default function Table({ rows }: Readonly<TableProps>) {
  return (
    <div className="overflow-x-auto w-full p-10">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase">
            <th className="py-2 px-3 text-left">Category</th>
            <th className="py-2 px-3 text-left">Notes</th>
            <th className="py-2 px-3 text-right">Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {rows?.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="py-2 px-3">{row.category}</td>
              <td className="py-2 px-3">{row.content}</td>
              <td className="py-2 px-3 text-right">
                {new Date(parseInt(row.createdAt)).toISOString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
