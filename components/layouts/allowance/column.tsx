import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { Allowance } from "@prisma/client"
import AllowanceInfo from "./allowance-info"

export interface AllowanceColumn {
    id: number
    name: string
    info: {
        allowance: string
        description: string
    }
}

export const columns: ColumnDef<AllowanceColumn>[] = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "name",
        header: "Allowance"
    },
    {
        accessorKey: "info",
        header: "Allowance Information",
        cell: ({row}) => <AllowanceInfo data={row.original} />
    },
    {
        id: "action",
        cell: ({row}) => <CellAction data={row.original} />,
        header: "Action"
    }
]