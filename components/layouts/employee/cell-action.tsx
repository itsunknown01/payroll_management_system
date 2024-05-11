"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../../ui/button";
import { EmployeeColumn } from "./column";
import { EyeIcon } from "lucide-react";

interface CellActionProps {
  employee: EmployeeColumn;
}

const CellAction = ({ employee }: CellActionProps) => {
  const { onOpen,data } = useModal();;

  return (
    <div className="flex gap-2">
      <Button
        onClick={() =>
          onOpen("employeeDetail", { employee, allowances:data.allowances })
        }
      >
        <EyeIcon className="w-4 h-4" />
      </Button>
      <Button onClick={() => onOpen("editEmployee", { employee, departments: data.departments, positions: data.positions })}>
        Edit
      </Button>
      <Button onClick={() => onOpen("deleteEmployee", {employee})} variant="destructive">
        Delete
      </Button>
    </div>
  );
};

export default CellAction;
