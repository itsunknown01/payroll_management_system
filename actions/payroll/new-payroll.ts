"use server";

import { db } from "@/lib/db";
import { PayrollSchema } from "@/schemas";
import { auth } from "@/services/next-auth/auth";
import * as z from "zod";

export const newPayroll = async (values: z.infer<typeof PayrollSchema>) => {
  const session = await auth();
  const userId: string = session?.user.id as string;

  const validation = PayrollSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid field " };
  }

  const { dateFrom, dateTo, type } = validation.data;

  const date = new Date();
  const presentDate = `${date.getFullYear()}-${Math.floor(
    Math.random() * 10000
  )}`;

  await db.payroll.create({
    data: {
      userId,
      refNo: presentDate,
      From: new Date(dateFrom),
      To: new Date(dateTo),
      type,
    },
  });

  return { success: "Payroll created successfully" };
};
