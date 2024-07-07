"use server"

import { db } from "@/lib/db";
import { PositionSchema } from "@/schemas"
import { auth } from "@/services/next-auth/auth";
import { getPositionByName } from "@/services/position";
import * as z from "zod"

export const newPosition = async (values: z.infer<typeof PositionSchema>) => {
    const validation = PositionSchema.safeParse(values);

    if (!validation.success) {
      return { error: "Invalid field" };
    }
  
    const { name, departmentId } = validation.data;
    const deptId: number = JSON.parse(departmentId)
  
    const existingPosition = await getPositionByName(name)
  
    if (existingPosition) {
      return { error: "Position already exists" };
    }
  
    await db.position.create({
      data: {
        name,
        departmentId: deptId
      },
    });
  
    return { success: "Position created successfully" };
}