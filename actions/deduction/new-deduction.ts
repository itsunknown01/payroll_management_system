"use server";

import { db } from "@/lib/db";
import { DeductionSchema } from "@/schemas";
import { auth } from "@/services/next-auth/auth";
import * as z from "zod";

export const newDeduction = async (values: z.infer<typeof DeductionSchema>) => {
  const validation = DeductionSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }

  const { deduction, description } = validation.data;

  const existingDeduction = await db.deduction.findFirst({
    where: {
      deduction,
    },
  });

  if (existingDeduction) {
    return { error: "Deduction already exists" };
  }

  await db.deduction.create({
    data: {
      deduction,
      description,
    },
  });

  return { success: "Deduction created successfully" };
};
