"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { PayrollSchema } from "@/schemas";

export const editPayroll = async (
  values: z.infer<typeof PayrollSchema>,
  payrollId: number | undefined
) => {
  const validation = PayrollSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid field" };
  }

  const { dateFrom, dateTo, type } = validation.data;

  const existingPayroll = await db.payroll.findFirst({
    where: {
      id: payrollId,
    },
  });
  if (!existingPayroll) {
    return { error: "Payroll doest not exists" };
  }

  await db.payroll.update({
    where: {
      id: payrollId,
    },
    data: {
      From: new Date(dateFrom),
      To: new Date(dateTo),
      type 
    },
  });

  return { success: "Payroll updated successfully" };
};
