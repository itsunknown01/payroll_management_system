import { Logs } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export interface AttendanceData {
  employeeId: string;
  name: string;
  type: Logs;
  date: string;
}

export const columns: ColumnDef<AttendanceData>[] = [
    {
      accessorKey: "id",
      header: "#",
    },
    {
      accessorKey: "name",
      header: "Employee",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
  ];
  