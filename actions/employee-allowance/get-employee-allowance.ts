"use server";

import { AllowanceCardData } from "@/components/cards/allowance-card";
import { db } from "@/lib/db";

export const getEmployeeAllowance = async (employeeId: number) => {
  try {
    const data = await db.employeeAllowance.findMany({
      where: {
        employeeId,
      },
      include: {
        allowance: true,
      },
    });

    const formattedData: AllowanceCardData[] = data.map((item) => ({
      id: item.id,
      allowance: item.allowance.allowance,
      description: item.allowance.description,
    }));

    return formattedData;
  } catch (error) {
    return error;
  }
};