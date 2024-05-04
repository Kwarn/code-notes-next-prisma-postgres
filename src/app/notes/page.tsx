import Table from "@/components/table";
import { Row } from "@/types/types";

export default function NotesPage() {
  const tableData: Row[] = [
    {
      name: "note 1",
      description: "testing",
      priority: 1,
      dueDate: "22/08/2025",
    },
  ];
  return (
    <div className="w-full h-screen">
      <h1 className="text-white">Notes</h1>
      <div className="flex flex-row w-full">
        <Table rows={tableData} />
      </div>
    </div>
  );
}
