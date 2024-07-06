"use server";

import { ForgotPasswordSchema } from "@/schemas";
import { generatePasswordToken } from "@/services/auth-services/token";
import { getUserByEmail } from "@/services/auth-services/user";
import { redirect } from "next/navigation";
import * as z from "zod";

export const forgot = async (values: z.infer<typeof ForgotPasswordSchema>) => {
  const validation = ForgotPasswordSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }

  const { email } = validation.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email does not exists" };
  }

  const passwordToken = await generatePasswordToken(email);

  if (passwordToken) {
    return redirect(
      `http://localhost:3000/new-password?token=${passwordToken.token}`
    );
  }
  return { success: "User found successfully" };
};
