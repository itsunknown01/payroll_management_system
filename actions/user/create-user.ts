"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { UserSchema } from "@/schemas";
import { db } from "@/lib/db";

export const createUser = async (values: z.infer<typeof UserSchema>) => {
  const validation = UserSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }

  const { name, role, email, password } = validation.data;
  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findFirst({
    where: {
      name,
    },
  });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      role,
    },
  });

  return { success: "User created successfully" };
};
