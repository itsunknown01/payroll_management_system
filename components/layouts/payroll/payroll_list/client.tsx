"use client";

import { calculatePayroll } from "@/actions/payroll/calculate-payroll";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useEffect, useTransition } from "react";
import { FcPrint } from "react-icons/fc";
import { toast } from "react-toastify";
import { PayrollListColumn, columns } from "./columns";
import { Allowance, Deduction, Payroll } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";
import { useParams } from "next/navigation";

export default function PayrollListClient({
  data,
  payroll,
  allowances,
  deductions,
}: {
  data: PayrollListColumn[];
  payroll: Payroll | null;
  allowances: Allowance[];
  deductions: Deduction[];
}) {
  const params = useParams()
  const [loading, startTransition] = useTransition();

  const { setData } = useModal();

  useEffect(() => {
    if (payroll || allowances || deductions) {
      setData({ payroll, allowances, deductions });
    }
  }, [payroll, allowances, deductions, setData]);

  const dateFrom = formatDate(payroll?.From as Date);
  const dateTo = formatDate(payroll?.To as Date);

  const handleCalculate = async () => {
    startTransition(() => {
      calculatePayroll(payroll?.id as number).then((data) => {
        toast.error(data?.error);
        toast.success(data?.success);
      });
    });
  };

  const handlePrint = () => {
    const printWindow = window.open(`/print_payroll/${Number(params.payrollId)}`, '_blank', 'height=500,width=900')
    setTimeout(() =>{
      printWindow?.print()
      setTimeout(() => {
        printWindow?.close()
      },500)
    },1000)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6">
        <Heading
          title={`Payroll: ${payroll?.refNo}`}
          className="gap-y-2 items-start"
        />
        <Button onClick={handleCalculate}>
          <Plus className="mr-2 h-4 w-4" /> Re-calculate Payroll
        </Button>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <p className="mb-4">
            Payroll Range: <b>{`${dateFrom} - ${dateTo}`}</b>
          </p>
          <p>
            Payroll Type: <b>{payroll?.type}</b>
          </p>
        </div>
        <Button
          className="mt-20 bg-green-500 text-white py-2 px-10 rounded hover:bg-green-600"
          type="button"
          onClick={handlePrint}
        >
          Print <FcPrint fontSize={26} className="ml-2" />
        </Button>
      </div>

      <Separator />
      <DataTable data={data} columns={columns} searchkey={"employeeName"} />
    </div>
  );
}
