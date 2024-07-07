"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { formatDate } from "@/lib/utils";
import { Allowance } from "@prisma/client";
import { useEffect, useState } from "react";

export default function ViewPayrollModal() {
  const { isOpen, type, data, onClose } = useModal();
  const { payrollList, allowances, deductions } = data;

  const [allowancesData, setAllowances] = useState<Record<string, string>>({});
  const [deductionsData, setDeductions] = useState<Record<string, string>>({});

  useEffect(() => {
    if (allowances) {
      const allowanceMap: Record<string, string> = {};
      allowances?.forEach(
        (allowance) => (allowanceMap[allowance.id] = allowance.allowance)
      );
      setAllowances(allowanceMap);
    }

    if (deductions) {
      const deductionMap: Record<string, string> = {};
      deductions?.forEach(
        (deduction) => (deductionMap[deduction.id] = deduction.deduction)
      );
      setDeductions(deductionMap);
    }
  }, [deductions, allowances]);

  const isModalOpen = isOpen && type === "viewPayroll";

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose} title="Employee Payslip" className="max-w-3xl">
      <div className="flex flex-col space-y-2 px-6">
        <h2>Employee ID {payrollList?.employee?.employee_no}</h2>
        <h2>Name {payrollList?.employeeName}</h2>
        <Separator className="h-[2px]" />
        <div className="flex items-start justify-between px-2">
          <div className="flex flex-col">
            <h2>Payroll Ref: {payrollList?.refNo}</h2>
            <h2>
              Payroll Range:{" "}
              {`${formatDate(
                payrollList?.payroll?.From as Date
              )} - ${formatDate(payrollList?.payroll?.To as Date)}`}
            </h2>
            <h2>Payroll Type: {payrollList?.payroll?.type}</h2>
          </div>
          <div className="flex flex-col">
            <h2>Days of Absent: {payrollList?.absent}</h2>
            <h2>Tardy/Undertime(mins): {payrollList?.late}</h2>
            <h2>Total Allowance Amount: {payrollList?.totalAllowance}</h2>
            <h2>Total Deduction Amount: {payrollList?.tottalDeduction}</h2>
            <h2>Net Pay: {payrollList?.net}</h2>
          </div>
        </div>
        <Separator className="h-[2px]" />
        <CardContent className="flex items-center justify-between gap-x-8 py-4">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between bg-zinc-100">
              <CardTitle className="text-md">Allowances</CardTitle>
            </CardHeader>
            <CardContent>
                {payrollList?.allowances?.map(allowance => (
              <Card key={allowance.aid} className="mt-4 w-full flex flex-col items-center justify-between px-6 py-4 gap-y-4">
                {allowancesData[allowance.aid]} allowances - {allowance.amount}
              </Card>
                ))}
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between bg-zinc-100">
              <CardTitle className="text-md">Deductions</CardTitle>
            </CardHeader>
            <CardContent>
            {payrollList?.deductions?.map(deduction => (
              <Card key={deduction.did} className="mt-4 w-full flex flex-col items-center justify-between px-6 py-4 gap-y-4">
                {deductionsData[deduction.did]} deductions - {deduction.amount}
              </Card>
                ))}
            </CardContent>
          </Card>
        </CardContent>
      </div>
    </Modal>
  );
}