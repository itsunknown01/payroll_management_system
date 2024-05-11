"use server";

import { DeductionCardData } from "@/components/cards/deduction-card";
import { db } from "@/lib/db";

export const getEmployeeDeduction = async (employeeId: number) => {
  try {
    const data = await db.employeeDeduction.findMany({
      where: {
        employeeId,
      },
      include: {
        deduction: true,
      },
    });

    const formattedData: DeductionCardData[] = data.map((item) => ({
      id: item.id,
      deduction: item.deduction.deduction,
      description: item.deduction.description,
    }));

    return formattedData;
  } catch (error) {
    return error;
  }
};