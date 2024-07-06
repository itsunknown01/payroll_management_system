import { UserRole } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export interface UserColumn {
    id: number
    name: string
    role: UserRole,
    password: string
}

export const columns: ColumnDef<UserColumn>[] = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "role",
        header: "Role",
      },
    {
        id: "action",
        cell: ({row}) => <CellAction data={row.original} />,
        header: "Action"
    }
]