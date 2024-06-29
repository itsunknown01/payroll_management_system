"use client";

import { useModal } from "@/hooks/use-modal-store";
import {
  Allowance,
  Deduction,
  Department,
  Payroll,
  Position,
} from "@prisma/client";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../../ui/button";
import DataTable from "../../ui/data-table";
import { Separator } from "../../ui/separator";
import Heading from "../../ui/heading";
import { PayrollColumn, columns } from "./column";

interface PayrollClientProps {
  data: PayrollColumn[];
}

const PayrollClient = ({ data }: PayrollClientProps) => {
  const { onOpen, setData } = useModal();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6">
        <Heading
          title={`Payroll(${data.length})`}
          description="Manage payroll here"
          className="gap-y-2"
        />
        <Button onClick={() => onOpen("createPayroll")}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />
      <DataTable data={data} columns={columns} searchkey={"refNo"} />
    </div>
  );
};

export default PayrollClient;
