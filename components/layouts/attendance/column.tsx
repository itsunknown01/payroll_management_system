import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { Attendance, Department, Employee } from "@prisma/client"

export interface AttendanceColumn {
    id: number;
   date: string
   employeeNo: string;
   employeeName: string;
   logTime?: string
}

export const columns: ColumnDef<AttendanceColumn>[] = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "date",
        header: "Date"
    },
    {
        accessorKey: "employeeNo",
        header: "Employee No"
    },
    {
        accessorKey: "employeeName",
        header: "Name"
    },
    {
        accessorKey: "logTime",
        header: "Time Record"
    },
    {
        id: "action",
        cell: ({row}) => <CellAction employee={row.original} />,
        header: "Action"
    }
]