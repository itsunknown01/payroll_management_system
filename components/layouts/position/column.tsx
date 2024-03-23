import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export interface PositionColumn {
    id: number
    name: string
    departmentName: string
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
        accessorKey: "department",
        header: "Department",
        cell: ({row}) => row.original.departmentName
    },
    {
        id: "action",
        cell: ({row}) => <CellAction data={row.original} />,
        header: "Action"
    }
]