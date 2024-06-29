"use client";

import { useModal } from "@/hooks/use-modal-store";
import { EyeIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { PayrollListColumn } from "./columns";

interface CellActionProps {
  payroll: PayrollListColumn;
}

const CellAction = ({ payroll }: CellActionProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex gap-2">
        <Button
          onClick={() =>
            onOpen("viewPayroll")
          }
        >
          <EyeIcon className="w-4 h-4 mr-2" /> View
        </Button>
    </div>
  );
};

export default CellAction;
