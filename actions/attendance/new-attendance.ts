"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { AttendanceSchema } from "@/schemas";

export const newAttendance = async (
  values: z.infer<typeof AttendanceSchema>[]
) => {
  const validation = z.array(AttendanceSchema).safeParse(values);

  if (!validation.success) {
    return {
      error: "Invalid fields",
    };
  }

  const promise = values.map(async (value) => {
    await db.attendance.create({
      data: {
        employeeId: Number(value.employeeId),
        logType: value.type,
        datetimeLog: new Date(value.date),
      },
    });
  });

  await Promise.all(promise);

  return { success: "Attendance Created Successfully" };
};
