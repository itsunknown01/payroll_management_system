"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../../ui/button";
import { EmployeeColumn } from "./column";

interface CellActionProps {
  employee: EmployeeColumn;
}

const CellAction = ({ employee }: CellActionProps) => {
  const { onOpen,data } = useModal();

  return (
    <div className="flex gap-2">
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
