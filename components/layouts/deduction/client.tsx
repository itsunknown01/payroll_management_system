"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import DataTable from "../../ui/data-table";
import { Separator } from "../../ui/separator";
import Heading from "../../ui/heading";
import { DeductionColumn, columns } from "./column";

interface DeductionClientProps {
  data: DeductionColumn[];
}

const DeductionClient = ({ data }: DeductionClientProps) => {
  const { onOpen } = useModal();
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6">
        <Heading
          title={`Deduction(${data.length})`}
          description="Manage deduction here"
          className="gap-y-2"
        />
        <Button onClick={() => onOpen("createDeduction")}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />
      <DataTable data={data} columns={columns} searchkey="name" />
    </div>
  );
};

export default DeductionClient;
