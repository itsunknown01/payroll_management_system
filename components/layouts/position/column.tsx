import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { Position } from "@prisma/client";

export interface PositionColumn extends Position {
  departmentName: string;
}

export const columns: ColumnDef<PositionColumn>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Position",
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => row.original.departmentName,
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction position={row.original} />,
    header: "Action",
  },
];
