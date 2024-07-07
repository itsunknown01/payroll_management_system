"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../../ui/button";
import { Edit, EyeIcon, Trash } from "lucide-react";
import { PayrollColumn } from "./column";
import { useTransition } from "react";
import { calculatePayroll } from "@/actions/payroll/calculate-payroll";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface CellActionProps {
  payroll: PayrollColumn;
}

const CellAction = ({ payroll }: CellActionProps) => {
  const [loading, startTransition] = useTransition();

  const router = useRouter()
  const { onOpen } = useModal();

  const handleCalculate = async () => {
    startTransition(() => {
      calculatePayroll(payroll.id).then((data) => {
        toast.error(data?.error);
        toast.success(data?.success);
      });
    });
  };

  return (
    <div className="flex gap-2">
      {payroll.status == "Computed" ? (
        <Button
          disabled={loading}
          onClick={() =>
            router.push(`/payroll/${payroll.id}`)
          }
        >
          <EyeIcon className="w-4 h-4" />
        </Button>
      ) : (
        <Button onClick={handleCalculate} disabled={loading} variant="outline">
          Calculate
        </Button>
      )}
      <Button
        disabled={loading}
        onClick={() =>
          onOpen("editPayroll", {
            payrollData: payroll,
          })
        }
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => onOpen("deletePayroll", { payrollData:payroll })}
        variant="destructive"
        disabled={loading}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CellAction;
