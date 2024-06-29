import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import DeductionInfo from "./deduction-info"

export interface DeductionColumn {
    id: number
    name: string
    info: {
        deduction: string
        description: string
    }
}

export const columns: ColumnDef<DeductionColumn>[] = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "name",
        header: "Deduction",
    },
    {
        accessorKey: "info",
        header: "Deduction Information",
        cell: ({row}) => <DeductionInfo data={row.original} />
    },
    {
        id: "action",
        cell: ({row}) => <CellAction data={row.original} />,
        header: "Action"
    }
]