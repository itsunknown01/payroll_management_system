import AttendanceClient from "@/components/layouts/attendance/client";
import { AttendanceColumn } from "@/components/layouts/attendance/column";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { auth } from "@/services/next-auth/auth";
import { Attendance, Logs } from "@prisma/client";
import React from "react";
import { date } from "zod";

const AttendancePage = async () => {
  const session = await auth();
  const userId = session?.user.id;

  const attendances = await db.attendance.findMany({
    where: {
      userId,
    },
    include: {
      employee: true,
    },
    orderBy: {
      datetimeLog: "asc",
    },
  });

  const employees = await db.employee.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="w-full">
      <div className="flex-1 space-y-2 pt-6 p-8 w-full">
        <AttendanceClient data={attendances} employees={employees} />
      </div>
    </div>
  );
};

export default AttendancePage;
