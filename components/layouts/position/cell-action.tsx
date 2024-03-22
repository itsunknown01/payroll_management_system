"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../../ui/button";
import { PositionColumn } from "./column";

interface CellActionProps {
  data: PositionColumn;
}

const CellAction = ({ data }: CellActionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex gap-2">
      <Button onClick={() => onOpen("editPosition", { postion: data })}>
        Edit
      </Button>
      <Button onClick={() => onOpen("deletePosition", {postion: data})} variant="destructive">
        Delete
      </Button>
    </div>
  );
};

export default CellAction;
