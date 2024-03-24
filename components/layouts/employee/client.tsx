"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Department, Position } from "@prisma/client";
import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import DataTable from "../../ui/data-table";
import { Separator } from "../../ui/separator";
import Heading from "../../utils/heading";
import { EmployeeColumn, columns } from "./column";
import { useEffect } from "react";

interface EmployeeClientProps {
  data: EmployeeColumn[];
  positions: Position[];
  departments: Department[];
}

const EmployeeClient = ({
  data,
  positions,
  departments,
}: EmployeeClientProps) => {
  const { onOpen, setData } = useModal();

  useEffect(() => {
    if (positions && departments) {
      setData({ departments, positions });
    }
  }, [positions, departments, setData]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6">
        <Heading
          title={`Employee(${data.length})`}
          description="Manage employee here"
          className="gap-y-2"
        />
        <Button
          onClick={() => onOpen("createEmployee", { departments, positions })}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />
      <DataTable data={data} columns={columns} searchkey="name" />
    </div>
  );
};

export default EmployeeClient;
