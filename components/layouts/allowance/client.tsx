"use client";

import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import Heading from "../../utils/heading";
import { Separator } from "../../ui/separator";
import DataTable from "../../ui/data-table";
import { AllowanceColumn, columns } from "./column";
import { Allowance } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";

interface AllowanceClientProps {
  data: AllowanceColumn[];
}

const AllowanceClient = ({ data }: AllowanceClientProps) => {
  const { onOpen } = useModal();
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6">
        <Heading
          title={`Allowance(${data.length})`}
          description="Manage allowance here"
          className="gap-y-2"
        />
        <Button onClick={() => onOpen("createAllowance")}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />
      <DataTable data={data} columns={columns} searchkey="info" />
    </div>
  );
};

export default AllowanceClient;
