import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export interface PositionColumn {
    id: number
    name: string
    departmentId: number
}

export const columns: ColumnDef<PositionColumn>[] = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "name",
        header: "Position"
    },
    {
        id: "action",
        cell: ({row}) => <CellAction data={row.original} />,
        header: "Action"
    }
]