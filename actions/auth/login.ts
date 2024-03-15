"use server";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/services/auth";
import { getUserByEmail } from "@/services/user";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validations = LoginSchema.safeParse(values);

  if (!validations.success) {
    return {
      error: "Invalid Fields",
    };
  }

  const { email, password } = validations.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  if (!existingUser.emailVerified) {
    // TODO email verification
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    console.log("Login action", error);
    throw error;
  }

  return {
    success: "Logged in successfully",
  };
};
