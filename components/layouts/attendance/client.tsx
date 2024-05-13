"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Attendance, Employee } from "@prisma/client";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../../ui/button";
import DataTable from "../../ui/data-table";
import Heading from "../../ui/heading";
import { Separator } from "../../ui/separator";
import { AttendanceColumn, columns } from "./column";

interface AttendanceClientProps {
  data: AttendanceColumn[];
  employees: Employee[];
}

const AttendanceClient = ({ data, employees }: AttendanceClientProps) => {
  const { onOpen, setData } = useModal();

  useEffect(() => {
    if (employees) {
      setData({
        employees,
      });
    }
  }, [employees, setData]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6">
        <Heading
          title={`Attendance(${data.length})`}
          description="Manage attendance here"
          className="gap-y-2"
        />
        <Button onClick={() => onOpen("createAttendance", { employees })}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />
      <DataTable data={data} columns={columns} searchkey={"firstName"} />
    </div>
  );
};

export default AttendanceClient;
