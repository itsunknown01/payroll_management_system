"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { EmployeAllowanceData } from "./employee-deduction-modal";

interface CellActionProps {
  data: EmployeAllowanceData;
  onDelete: () => void;
}

const CellAction = ({ data, onDelete }: CellActionProps) => {
  const handleDelete = () => {
    onDelete();
  };
  return (
    <Button>
      <Trash className="w-4 h-4" onClick={handleDelete} />
    </Button>
  );
};

export default CellAction;
