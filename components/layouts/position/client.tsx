"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Department, Position } from "@prisma/client";
import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import DataTable from "../../ui/data-table";
import { Separator } from "../../ui/separator";
import Heading from "../../utils/heading";
import { columns } from "./column";

interface PositionClientProps {
  data: Position[];
  departments: Department[]
}

const PositionClient = ({ data,departments }: PositionClientProps) => {
  const { onOpen } = useModal();
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6">
        <Heading
          title={`Position(${data.length})`}
          description="Manage position here"
          className="gap-y-2 items-start"
        />
        <Button onClick={() => onOpen("createPosition", {departments})}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />
      <DataTable data={data} columns={columns} searchkey="name" />
    </div>
  );
};

export default PositionClient;
