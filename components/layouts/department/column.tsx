import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { Department } from "@prisma/client"

export interface DepartmentColumn {
    id: number
    name: string
}

export const columns: ColumnDef<Department>[] = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "name",
        header: "Department"
    },
    {
        id: "action",
        cell: ({row}) => <CellAction data={row.original} />,
        header: "Action"
    }
]