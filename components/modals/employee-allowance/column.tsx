import { EmployeeAllowance } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { EmployeAllowanceData } from "./employee-allowance-modal";

export interface EmployeeAllowanceColumn extends EmployeeAllowance {
  allowanceName: string;
}

export const columns: ColumnDef<EmployeAllowanceData>[] = [
  {
    accessorKey: "allowanceName",
    header: "Allowance",
  },
  {
    accessorKey: "salaryType",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  }
];
