"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { DepartmentSchema } from "@/schemas";

export const newDepartment = async (
  values: z.infer<typeof DepartmentSchema>
) => {
  const validation = DepartmentSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid field" };
  }

  const { name } = validation.data;

  const existingDepartment = await db.department.findFirst({
    where: {
      name,
    },
  });

  if (existingDepartment) {
    return { error: "Department already exists" };
  }

  await db.department.create({
    data: {
      name,
    },
  });

  return { success: "Department created successfully" };
};
