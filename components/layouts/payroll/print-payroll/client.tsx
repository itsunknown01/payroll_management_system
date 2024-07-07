"use client";

import DataTable from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Payroll } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export interface PayrollPrintColumn {
  employeId: number;
  employeeName: string;
  salary: number;
  absent: number;
  late: string;
  totalAllowance: number;
  totalDeduction: number;
  net: number;
}

export default function PrintPayrollClient({
  data,
  payroll,
}: {
  data: PayrollPrintColumn[];
  payroll: Payroll | null;
}) {
  const columns: ColumnDef<PayrollPrintColumn>[] = [
    {
      header: "Employee ID",
      accessorKey: "employeId",
    },
    {
      header: "Employee Name",
      accessorKey: "employeeName",
    },
    {
      header: "Monthly Salary",
      accessorKey: "salary",
    },
    {
      header: "Absent",
      accessorKey: "absent",
    },
    {
      header: "Tardy Undertime (mins)",
      accessorKey: "late",
    },
    {
      header: "Total Allowance",
      accessorKey: "totalAllowance",
    },
    {
      header: "Total Deduction",
      accessorKey: "totalDeduction",
    },
    {
      header: "Net Pay",
      accessorKey: "net",
    },
  ];

  return (
    <div className="w-full">
      <Heading
        title={`Payroll: ${payroll?.refNo}`}
        className="gap-y-2 items-start"
      />
      <div className="max-w-4xl flex items-center justify-center">
      <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
}
