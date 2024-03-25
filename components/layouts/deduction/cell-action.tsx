"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../../ui/button";
import { Deduction } from "@prisma/client";
import { DeductionColumn } from "./column";

interface CellActionProps {
  data: DeductionColumn;
}

const CellAction = ({ data }: CellActionProps) => {
  const { onOpen } = useModal();

  const deduction: Deduction = {
    id: data.id,
    deduction: data.info.deduction,
    description: data.info.description,
  };

  return (
    <div className="flex gap-2">
      <Button onClick={() => onOpen("editDeduction", { deduction })}>
        Edit
      </Button>
      <Button
        onClick={() => onOpen("deleteDeduction", { deduction })}
        variant="destructive"
      >
        Delete
      </Button>
    </div>
  );
};

export default CellAction;
