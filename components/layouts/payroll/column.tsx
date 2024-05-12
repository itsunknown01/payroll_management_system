import { StatusType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export interface PayrollColumn {
    id:number
    refNo: string;
    From: string;
    To: string;
    status: StatusType;
} 

export const columns: ColumnDef<PayrollColumn>[] = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "refNo",
        header: "Ref No"
    },
    {
        accessorKey: "From",
        header: "Date From"
    },
    {
        accessorKey: "To",
        header: "Date To"
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "action",
        cell: ({row}) => <CellAction payroll={row.original} />,
        header: "Action"
    }
]