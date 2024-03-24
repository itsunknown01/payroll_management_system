import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { Department, Employee } from "@prisma/client"

export interface EmployeeColumn extends Employee {
    departmentName: string
    positionName: string
}

export const columns: ColumnDef<EmployeeColumn>[] = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "firstName",
        header: "FirstName"
    },
    {
        accessorKey: "middleName",
        header: "MiddleName"
    },
    {
        accessorKey: "lastName",
        header: "LastName"
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({row}) => row.original.departmentName
    },
    {
        accessorKey: "position",
        header: "Position",
        cell: ({row}) => row.original.positionName
    },
    {
        accessorKey: "salary",
        header: "Salary",
    },
    {
        id: "action",
        cell: ({row}) => <CellAction data={row.original} />,
        header: "Action"
    }
]