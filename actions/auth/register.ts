"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/services/user";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }

  const { name, email, password } = validation.data;
  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  //   TODO: Verification Token

  return { success: "Confirmation email sent" };
};
