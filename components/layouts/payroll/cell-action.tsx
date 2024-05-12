"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../../ui/button";
import { EyeIcon } from "lucide-react";
import { Payroll } from "@prisma/client";
import { PayrollColumn } from "./column";

interface CellActionProps {
  payroll: PayrollColumn;
}

const CellAction = ({ payroll }: CellActionProps) => {
  const { onOpen, data } = useModal();

  return (
    <div className="flex gap-2">
      {payroll.status == "Computed" ? (
        <Button
        // onClick={() =>
        //   onOpen("payrollDetail", {
        //     payroll,
        //     allowances: data.allowances,
        //     deductions: data.deductions,
        //   })
        // }
        >
          <EyeIcon className="w-4 h-4" />
        </Button>
      ) : (
        <Button variant="outline">Calculate</Button>
      )}
      <Button
      // onClick={() =>
      //   onOpen("editPayroll", {
      //     payroll,
      //     departments: data.departments,
      //     positions: data.positions,
      //   })
      // }
      >
        Edit
      </Button>
      <Button
        // onClick={() => onOpen("deletePayroll", { payroll })}
        variant="destructive"
      >
        Delete
      </Button>
    </div>
  );
};

export default CellAction;
