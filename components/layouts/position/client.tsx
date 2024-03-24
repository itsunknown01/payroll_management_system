"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Department, Position } from "@prisma/client";
import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import DataTable from "../../ui/data-table";
import { Separator } from "../../ui/separator";
import Heading from "../../utils/heading";
import { PositionColumn, columns } from "./column";
import { useEffect } from "react";

interface PositionClientProps {
  data: {
    departments: Department[];
    position: PositionColumn[];
  };
}

const PositionClient = ({ data }: PositionClientProps) => {
  const { onOpen, setData } = useModal();

  useEffect(() => {
    if (data.departments) {
      setData({ departments: data.departments });
    }
  }, [data.departments, setData]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6">
        <Heading
          title={`Position(${data.position.length})`}
          description="Manage position here"
          className="gap-y-2 items-start"
        />
        <Button
          onClick={() =>
            onOpen("createPosition", { departments: data.departments })
          }
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />
      <DataTable data={data.position} columns={columns} searchkey="name" />
    </div>
  );
};

export default PositionClient;
