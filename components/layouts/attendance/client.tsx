"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Employee, Logs } from "@prisma/client";
import { Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Button } from "../../ui/button";
import DataTable from "../../ui/data-table";
import Heading from "../../ui/heading";
import { Separator } from "../../ui/separator";
import { AttendanceColumn, columns } from "./column";

interface AttendanceClientProps {
  data: any[];
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

  const formattedData = useMemo(() => {
    const logTypeMap: Record<Logs, string> = {
      [Logs.AM_IN]: "Time-in AM",
      [Logs.PM_IN]: "Time-in PM",
      [Logs.AM_OUT]: "Time-out AM",
      [Logs.PM_OUT]: "Time-out PM",
    };
    const processedData: any = [];

    data.forEach((row) => {
      const date = new Date(row.datetimeLog).toISOString().split("T")[0];
      const existingRecord = processedData.find(
        (record) => record.eid === row.employeeId && record.date === date
      );

      if (existingRecord) {
        if (!existingRecord.log.some((log) => log.logType === row.logType)) {
          existingRecord.log.push({
            id: row.id,
            datetimeLog: row.datetimeLog,
            logType: row.logType,
          });
        }
      } else {
        processedData.push({
          id: row.id,
          eid: row.employeeId,
          name: `${row.employee.lastName}, ${row.employee.firstName} ${row.employee.middleName}`,
          eno: row.employee.employee_no,
          date: date,
          log: [
            {
              id: row.id,
              datetimeLog: row.datetimeLog,
              logType: row.logType,
            },
          ],
        });
      }
    });

    return processedData.map((record) => ({
      date: new Date(record.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      employeeNo: record.eno,
      employeeName: record.name,
      logTime: record.log.map((log) => ({
        time: new Date(log.datetimeLog).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: logTypeMap[log.logType],
      })),
      eid: record.eid,
      id: record.id,
    }));
  }, [data]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6">
        <Heading
          title={`Attendance(${formattedData.length})`}
          description="Manage attendance here"
          className="gap-y-2"
        />
        <Button onClick={() => onOpen("createAttendance", { employees })}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />
      <DataTable
        data={formattedData}
        columns={columns}
        searchkey={"employeeName"}
      />
    </div>
  );
};

export default AttendanceClient;
