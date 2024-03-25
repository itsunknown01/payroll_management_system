"use server";

import { db } from "@/lib/db";

export const deleteAllowance = async (allowanceId: number | undefined) => {
  const existingAllowance = await db.allowance.findFirst({
    where: { id: allowanceId },
  });
  if (!existingAllowance) {
    return { error: "Allowance already deleted" };
  }

  await db.allowance.delete({
    where: {
      id: allowanceId,
    },
  });

  return { success: "Allowance deleted successfully" };
};
