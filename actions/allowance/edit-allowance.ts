"use server";

import { db } from "@/lib/db";
import { AllowanceSchema } from "@/schemas";
// import { getAllowanceByName } from "@/services/allowance";
import * as z from "zod";

export const editAllowance = async (
  values: z.infer<typeof AllowanceSchema>,
  allowanceId: number | undefined
) => {
  const validation = AllowanceSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid field" };
  }

  const { allowance,description } = validation.data;

//   const existingAllowance = await getAllowanceByName(name);

  const existingAllowance = await db.allowance.findFirst({
    where: {
        allowance
    }
  })
  if (existingAllowance) {
    return { error: "Allowance already exists" };
  }

  await db.allowance.update({
    where: {
      id: allowanceId,
    },
    data: {
      allowance,
      description,
    },
  });

  return { success: "Allowance updated successfully" };
};
