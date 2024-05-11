"use server";

import { db } from "@/lib/db";
import { EmployeeAllowanceSchema } from "@/schemas";
import * as z from "zod";

export const newEmployeeAllowance = async (
  values: z.infer<typeof EmployeeAllowanceSchema>[],
  employeeID: number
) => {
  const validation = z.array(EmployeeAllowanceSchema).safeParse(values);

  if (!validation.success) {
    return { error: "Invalid field" };
  }

  const promise = values.map(async (data) => {
    await db.employeeAllowance.create({
      data: {
        employeeId: employeeID,
        allowanceId: parseInt(data.allowanceId),
        allowanceDate: new Date(),
        salaryType: data.salaryType,
        amount: parseInt(data.amount),
      },
    });
  });

  await Promise.all(promise);

  return { success: "Employees allowances Created Successfully" };
};
