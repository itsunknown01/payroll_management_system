"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import Heading from "../utils/heading";
import { Separator } from "../ui/separator";
import DataTable from "../ui/data-table";
import { columns } from "./column";
import { Department } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";

interface DepartmentClientProps {
  data: Department[];
}

const DepartmentClient = ({ data }: DepartmentClientProps) => {
  const { onOpen } = useModal();
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6">
        <Heading
          title={`Department(${data.length})`}
          description="Manage department here"
          className="gap-y-2"
        />
        <Button onClick={() => onOpen("createDepartment")}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />
      <DataTable data={data} columns={columns} searchkey="label" />
    </div>
  );
};

export default DepartmentClient;
