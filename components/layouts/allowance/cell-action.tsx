"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../../ui/button";
import { Allowance } from "@prisma/client";
import { AllowanceColumn } from "./column";

interface CellActionProps {
  data: AllowanceColumn;
}

const CellAction = ({ data }: CellActionProps) => {
  const { onOpen } = useModal();

  const allowance: any = {
    id: data.id,
    allowance: data.info.allowance,
    description: data.info.description,
  };

  return (
    <div className="flex gap-2">
      <Button onClick={() => onOpen("editAllowance", { allowance })}>
        Edit
      </Button>
      <Button
        onClick={() => onOpen("deleteAllowance", { allowance })}
        variant="destructive"
      >
        Delete
      </Button>
    </div>
  );
};

export default CellAction;
