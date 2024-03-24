"use server"

import { db } from "@/lib/db"

export const deleteEmployee = async (employeeId: number | undefined) => {
  const existingEmployee = await db.employee.findFirst({
    where: {
        id: employeeId
    }
  })

  if (!existingEmployee) {
    return { error: "Employee already deleted"}
  }

  await db.employee.delete({
    where: {
        id: employeeId
    }
  });

  return {success: "Employee successfully deleted"}
}