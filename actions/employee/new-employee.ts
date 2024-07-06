"use server";

import { db } from "@/lib/db";
import { EmployeeSchema } from "@/schemas";
import { auth } from "@/services/next-auth/auth";
import * as z from "zod";

export const newEmployee = async (values: z.infer<typeof EmployeeSchema>) => {
  const session = await auth()
  const userId = session?.user.id as string
  const validation = EmployeeSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid field " };
  }

  const { firstname, middlename, lastname, departmentId, positionId, salary } =
    validation.data;

  const date = new Date();
  const presentDate = `${date.getFullYear()}-${Math.floor(Math.random()*10000)}`;
  
  await db.employee.create({
    data: {
      userId,
      employee_no: presentDate,
      firstName: firstname,
      middleName: middlename,
      lastName: lastname,
      departmentId: Number(departmentId),
      positionId: Number(positionId),
      salary: Number(salary),
    },
  });

  return { success: "Employee created successfully" };
};
