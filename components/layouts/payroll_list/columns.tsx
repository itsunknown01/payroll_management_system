import { Payroll } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cell-action";

export interface PayrollListColumn {
    refNo: string;
    employeeName: string
    absent: number
    late: string
    totalAllowance: number
    tottalDeduction: number
    net: number
    payroll?: Payroll
} 

export const columns: ColumnDef<PayrollListColumn>[] = [
    {
        accessorKey: "refNo",
        header: "#"
    },
    {
        accessorKey: "employeeName",
        header: "Name"
    },
    {
        accessorKey: "absent",
        header: "Absent"
    },
    {
        accessorKey: "late",
        header: "Late"
    },
    {
        accessorKey: "totalAllowance",
        header: "Total Allowance",
    },
    {
        accessorKey: "tottalDeduction",
        header: "Total Deduction",
    },
    {
        accessorKey: "net",
        header: "Net",
    },
    {
        id: "action",
        cell: ({row}) => <CellAction payroll={row.original} />,
        header: "Action"
    }
]