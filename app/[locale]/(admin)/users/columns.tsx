"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <FaArrowDownUpAcrossLine className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
