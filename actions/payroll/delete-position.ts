"use server";

import { db } from "@/lib/db";

export const deletePayroll = async (payrollId: number | undefined) => {
  const existingPayroll = await db.payroll.findFirst({
    where: { id: payrollId },
  });

  if (!existingPayroll) {
    return { error: "Payroll already deleted" };
  }

  await db.payroll.delete({
    where: {
      id: payrollId,
    },
  });

  return { success: "Payroll deleted successfully" };
};
