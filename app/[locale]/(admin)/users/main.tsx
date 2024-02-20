"use client";
import CustomTable from "@/components/shared/CustomTable";
import { actions, columns } from "./columns";

export default function Main({ data }: any) {
  return (
    <CustomTable
      data={data}
      columns={columns}
      actions={actions}
      searchKey="lastName"
    />
  );
}
