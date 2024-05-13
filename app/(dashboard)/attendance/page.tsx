import AttendanceClient from "@/components/layouts/attendance/client";
import { AttendanceColumn } from "@/components/layouts/attendance/column";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import React from "react";

const AttendancePage = async () => {
  const attendances = await db.attendance.findMany({
    include: {
      employee: true,
    },
  });

  const employees = await db.employee.findMany();

  let formattedData: AttendanceColumn[] = attendances.map((attendance) => ({
    id: attendance.id,
    date: formatDate(attendance.datetimeLog),
    employeeNo: attendance.employee.employee_no,
    employeeName: `${attendance.employee.lastName}, ${attendance.employee.firstName} ${attendance.employee.middleName}`,
  }));
  return (
    <div className="w-full">
      <div className="flex-1 space-y-2 pt-6 p-8 w-full">
        <AttendanceClient data={formattedData} employees={employees} />
      </div>
    </div>
  );
};

export default AttendancePage;
