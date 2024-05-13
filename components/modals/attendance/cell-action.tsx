"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { AttendanceData } from "./columns";

interface CellActionProps {
  onDelete: () => void;
}

const CellAction = ({ onDelete }: CellActionProps) => {
  const handleDelete = () => {
    onDelete();
  };
  return (
    <Button variant="destructive">
      <Trash className="w-4 h-4" onClick={handleDelete} />
    </Button>
  );
};

export default CellAction;