"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../../ui/button";
import { DepartmentColumn } from "./column";

interface CellActionProps {
  data: DepartmentColumn;
}

const CellAction = ({ data }: CellActionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex gap-2">
      <Button onClick={() => onOpen("editDepartment", { department: data })}>
        Edit
      </Button>
      <Button onClick={() => onOpen("deleteDepartment", {department: data})} variant="destructive">
        Delete
      </Button>
    </div>
  );
};

export default CellAction;
