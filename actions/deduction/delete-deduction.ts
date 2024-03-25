"use server";

import { db } from "@/lib/db";

export const deleteDeduction = async (deductionId: number | undefined) => {
  const existingDeduction = await db.deduction.findFirst({
    where: { id: deductionId },
  });
  if (!existingDeduction) {
    return { error: "Deduction already deleted" };
  }

  await db.deduction.delete({
    where: {
      id: deductionId,
    },
  });

  return { success: "Deduction deleted successfully" };
};
