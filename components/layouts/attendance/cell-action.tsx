"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Edit, EyeIcon, Trash } from "lucide-react";
import { Button } from "../../ui/button";
import { AttendanceColumn } from "./column";

interface CellActionProps {
  attendance: AttendanceColumn;
}

const CellAction = ({ attendance }: CellActionProps) => {
  const { onOpen, data } = useModal();

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => onOpen("deleteEmployee", { attendance })}
        variant="destructive"
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CellAction;
