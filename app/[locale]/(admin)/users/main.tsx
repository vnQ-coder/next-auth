import { Card } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Main({ data }: any) {
  return (
    <Card className="w-full h-[calc(100vh-120px)]">
      <DataTable columns={columns} data={data} />
    </Card>
  );
}
