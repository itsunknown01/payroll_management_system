import { EmployeeDeduction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { EmployeDeductionData } from "./employee-deduction-modal";

export interface EmployeeDeductionColumn extends EmployeeDeduction {
  deductionName: string;
}

export const columns: ColumnDef<EmployeDeductionData>[] = [
  {
    accessorKey: "deductionName",
    header: "Deduction",
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
