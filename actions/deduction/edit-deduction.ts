"use server";

import { db } from "@/lib/db";
import { DeductionSchema } from "@/schemas";
// import { getDeductionByName } from "@/services/deduction";
import * as z from "zod";

export const editDeduction = async (
  values: z.infer<typeof DeductionSchema>,
  deductionId: number | undefined
) => {
  const validation = DeductionSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid field" };
  }

  const { deduction,description } = validation.data;

//   const existingDeduction = await getDeductionByName(name);

  const existingDeduction = await db.deduction.findFirst({
    where: {
        deduction
    }
  })
  if (existingDeduction) {
    return { error: "Deduction already exists" };
  }

  await db.deduction.update({
    where: {
      id: deductionId,
    },
    data: {
      deduction,
      description,
    },
  });

  return { success: "Deduction updated successfully" };
};
