"use server";

import * as z from "zod";

import { EmployeeSchema } from "@/schemas";
import { db } from "@/lib/db";

export const editEmployee = async (
  values: z.infer<typeof EmployeeSchema>,
  employeeId: number | undefined
) => {
  const validation = EmployeeSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }

  const { firstname, middlename, lastname, salary, positionId, departmentId } =
    validation.data;

  await db.employee.update({
    where: {
      id: employeeId,
    },
    data: {
      firstName: firstname,
      middleName: middlename,
      lastName: lastname,
      salary: parseInt(salary),
      department: {connect: {id: parseInt(departmentId)}},
      position: {connect: {id: parseInt(positionId)}},
    },
  });

  return { success: "Employee updated successfully "}
};
