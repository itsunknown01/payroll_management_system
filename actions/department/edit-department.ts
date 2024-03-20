"use server";

import { db } from "@/lib/db";
import { DepartmentSchema } from "@/schemas";
import { getDepartmentByName } from "@/services/department";
import * as z from "zod";

export const editDepartment = async (
  values: z.infer<typeof DepartmentSchema>,
  departmentId: number | undefined
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

  await db.department.update({
    where: {
      id: departmentId,
    },
    data: {
      name,
    },
  });

  return { success: "Department updated successfully" };
};
