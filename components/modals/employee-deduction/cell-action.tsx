"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { EmployeDeductionData } from "./employee-deduction-modal";

interface CellActionProps {
  data: EmployeDeductionData;
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
