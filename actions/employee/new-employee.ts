"use server";

import { db } from "@/lib/db";
import { EmployeeSchema } from "@/schemas";
import * as z from "zod";

export const newEmployee = async (values: z.infer<typeof EmployeeSchema>) => {
  const validation = EmployeeSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid field " };
  }

  const { firstname, middlename, lastname, departmentId, positionId, salary } =
    validation.data;

  const date = new Date();
  const presentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  await db.employee.create({
    data: {
      employee_no: parseInt(presentDate),
      firstName: firstname,
      middleName: middlename,
      lastName: lastname,
      department: { connect: { id: parseInt(departmentId) } },
      position: { connect: { id: parseInt(positionId) } },
      salary: parseInt(salary),
    },
  });

  return { success: "Employee created successfully" };
};
