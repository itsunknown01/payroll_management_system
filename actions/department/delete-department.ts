"use server";

import { db } from "@/lib/db";
import { DepartmentSchema } from "@/schemas";
import { getDepartmentById } from "@/services/department";
import * as z from "zod";

export const deleteDepartment = async (
  departmentId: number | undefined
) => {
  const existingDepartment = await getDepartmentById(departmentId);
  if (!existingDepartment) {
    return { error: "Department already deleted" };
  }

  await db.department.delete({
    where: {
        id: departmentId
    }
  })

  return {success: "Department deleted successfully"}
};
