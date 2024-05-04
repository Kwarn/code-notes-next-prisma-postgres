import { Row } from "@/types/types";

interface TableProps {
  rows: Row[];
}

export default function Table({ rows }: Readonly<TableProps>) {
  const cell = (text: string | undefined, removeXBoarders: boolean = false) => {
    if (!text) return;
    return (
      <div
        className={`flex border-black border-solid w-full h-10 items-center p-3 ${
          removeXBoarders ? "border-t-2 border-b-2" : "border-2"
        }`}
      >
        <p>{text}</p>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-row p-5">
      {rows.map((row, index) => (
        <div className="w-full flex flex-row" key={`${row.name}${index}`}>
          {cell(row.name)}
          {cell(row.description, true)}
          {cell(row.dueDate)}
        </div>
      ))}
    </div>
  );
}
