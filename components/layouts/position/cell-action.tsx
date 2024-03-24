"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../../ui/button";
import { PositionColumn } from "./column";

interface CellActionProps {
  position: PositionColumn;
}

const CellAction = ({ position }: CellActionProps) => {
  const { onOpen, data } = useModal();

  return (
    <div className="flex gap-2">
      <Button
        onClick={() =>
          onOpen("editPosition", { position, departments: data.departments })
        }
      >
        Edit
      </Button>
      <Button
        onClick={() => onOpen("deletePosition", { position })}
        variant="destructive"
      >
        Delete
      </Button>
    </div>
  );
};

export default CellAction;
