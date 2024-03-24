"use server";

import { db } from "@/lib/db";
import { getPositionById } from "@/services/position";

export const deletePosition = async (
  positionId: number | undefined
) => {
  const existingPosition = await getPositionById(positionId);
  if (!existingPosition) {
    return { error: "Position already deleted" };
  }

  await db.position.delete({
    where: {
        id: positionId
    }
  })

  return {success: "Position deleted successfully"}
};
