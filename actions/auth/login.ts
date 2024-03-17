"use server";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/services/next-auth/auth";
import { getUserByEmail } from "@/services/auth-services/user";
import { AuthError } from "next-auth";
import * as z from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

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

  // if (!existingUser.emailVerified) {
  //   // TODO email verification
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });
  } catch (error) {
    console.log("Login action", error);
    if(error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {error: "Invalid credentials"}
        default:
          return {error: "Something went wrong"}
      }
    }

    throw error
  }

  return {
    success: "Logged in successfully",
  };
};
