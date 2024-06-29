import AttendanceClient from "@/components/layouts/attendance/client";
import { AttendanceColumn } from "@/components/layouts/attendance/column";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Attendance, Logs } from "@prisma/client";
import React from "react";
import { date } from "zod";

const AttendancePage = async () => {
  const attendances = await db.attendance.findMany({
    include: {
      employee: true,
    },
    orderBy: {
      datetimeLog: "asc",
    },
  });

  const employees = await db.employee.findMany();

  return (
    <div className="w-full">
      <div className="flex-1 space-y-2 pt-6 p-8 w-full">
        <AttendanceClient
          data={attendances}
          employees={employees}
        />
      </div>
    </div>
  );
};

export default AttendancePage;
