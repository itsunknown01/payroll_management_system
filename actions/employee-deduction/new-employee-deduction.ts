"use server";

import { db } from "@/lib/db";
import { EmployeeDeductionSchema } from "@/schemas";
import * as z from "zod";

export const newEmployeeDeduction = async (
  values: z.infer<typeof EmployeeDeductionSchema>[],
  employeeID: number
) => {
  const validation = z.array(EmployeeDeductionSchema).safeParse(values);

  if (!validation.success) {
    return { error: "Invalid field" };
  }

  const promise = values.map(async (data) => {
    await db.employeeDeduction.create({
      data: {
        employeeId: employeeID,
        deductionId: parseInt(data.deductionId),
        deductionDate: new Date(),
        salaryType: data.salaryType,
        amount: parseInt(data.amount),
      },
    });
  });

  await Promise.all(promise);

  return { success: "Employees deductions Created Successfully" };
};
