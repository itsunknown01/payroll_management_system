import PrintPayrollClient, { PayrollPrintColumn } from "@/components/layouts/payroll/print-payroll/client";
import { db } from "@/lib/db";

export default async function PrintPayrollPage({params}: {params: {id: string}}) {
  const payroll = await db.payroll.findFirst({
    where: {
      id: Number(params.id)
    }
  })

  const payrollList = await db.payrollList.findMany({
    where: {
      payrollId: Number(params.id)
    },
    include: {
      employee: true
    }
  })

  const formattedData: PayrollPrintColumn[] = payrollList.map(item => ({
    employeId: item.employeeId,
    employeeName: `${item.employee.firstName} ${item.employee.middleName} ${item.employee.lastName}`,
    salary: item.salary,
    absent: item.absent,
    late: item.late,
    totalAllowance: item.allowanceAmount,
    totalDeduction: item.deductionAmount,
    net: item.net
  })) 

  return (
    <div className="w-full">
      <div className="flex-1 space-y-2 pt-6 p-8 w-full">
        <PrintPayrollClient data={formattedData} payroll={payroll} />
      </div>
    </div>
  );
}
