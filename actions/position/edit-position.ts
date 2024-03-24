"use server";

import { db } from "@/lib/db";
import { PositionSchema } from "@/schemas";
import { getPositionByName } from "@/services/position";
import * as z from "zod";

export const editPosition = async (
  values: z.infer<typeof PositionSchema>,
  positionId: number | undefined
) => {
  const validation = PositionSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid field" };
  }

  const { name } = validation.data;

  const existingPosition = await getPositionByName(name);

  if (existingPosition) {
    return { error: "Position already exists" };
  }

  await db.position.update({
    where: {
      id: positionId,
    },
    data: {
      name,
    },
  });

  return { success: "Position updated successfully" };
};
