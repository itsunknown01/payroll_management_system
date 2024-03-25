"use server";

import { db } from "@/lib/db";
import { AllowanceSchema } from "@/schemas";
import * as z from "zod";

export const newAllowance = async (values: z.infer<typeof AllowanceSchema>) => {
  const validation = AllowanceSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }

  const { allowance, description } = validation.data;

  const existingAllowance = await db.allowance.findFirst({
    where: {
      allowance,
    },
  });

  if (existingAllowance) {
    return { error: "Allowance already exists" };
  }

  await db.allowance.create({
    data: {
      allowance,
      description,
    },
  });

  return { success: "Allowance created successfully" };
};
