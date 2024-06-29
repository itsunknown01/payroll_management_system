import PayrollListClient from "@/components/layouts/payroll_list/client";
import { PayrollListColumn } from "@/components/layouts/payroll_list/columns";
import { db } from "@/lib/db";

export default async function PayrollListPage({params}: {params: {payrollId: number}}) {
  const payroll = await db.payrollList.findMany({
    where: {
      id: Number(params.payrollId)
    },
    include: {
      payroll: true,
      employee: true
    }
  })

  const formattedData: PayrollListColumn[] = payroll.map(item => ({
    refNo: item.payroll.refNo,
    employeeName: `${item.employee.lastName}, ${item.employee.firstName} ${item.employee.middleName}`,
    absent: item.absent,
    late: item.late,
    totalAllowance: item.allowanceAmount,
    tottalDeduction: item.deductionAmount,
    net: item.net,
    payroll: item.payroll
  }))
  return (
    <div className="w-full">
      <div className="flex-1 space-y-2 pt-6 p-8 w-full">
        <PayrollListClient data={formattedData} />
      </div>
    </div>
  );
}