import PayrollListClient from "@/components/layouts/payroll/payroll_list/client";
import { PayrollListColumn } from "@/components/layouts/payroll/payroll_list/columns";
import { db } from "@/lib/db";

export default async function PayrollListPage({
  params,
}: {
  params: { payrollId: number };
}) {
  const payrollList = await db.payrollList.findMany({
    where: {
      payrollId: Number(params.payrollId),
    },
    include: {
      payroll: true,
      employee: true,
    },
  });

  const payroll = await db.payroll.findFirst({
    where: {
      id: Number(params.payrollId),
    },
  });

  const formattedData: PayrollListColumn[] = payrollList.map((item) => ({
    refNo: item.payroll.refNo,
    employeeName: `${item.employee.lastName}, ${item.employee.firstName} ${item.employee.middleName}`,
    absent: item.absent,
    late: item.late,
    totalAllowance: item.allowanceAmount,
    tottalDeduction: item.deductionAmount,
    net: item.net,
    payroll: item.payroll,
    employee: item.employee,
    allowances: JSON.parse(item.allowances),
    deductions: JSON.parse(item.deductions),
  }));

  const allowances = await db.allowance.findMany();
  const deductions = await db.deduction.findMany();

  return (
    <div className="w-full">
      <div className="flex-1 space-y-2 pt-6 p-8 w-full">
        <PayrollListClient
          data={formattedData}
          payroll={payroll}
          allowances={allowances}
          deductions={deductions}
        />
      </div>
    </div>
  );
}
