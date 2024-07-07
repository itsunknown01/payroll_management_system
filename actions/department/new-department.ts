"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { DepartmentSchema } from "@/schemas";
import { getDepartmentByName } from "@/services/department";
import { auth } from "@/services/next-auth/auth";

export const newDepartment = async (
  values: z.infer<typeof DepartmentSchema>
) => {
  const validation = DepartmentSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid field" };
  }

  const { name } = validation.data;

  const existingDepartment = await getDepartmentByName(name);

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
