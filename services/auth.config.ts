import { LoginSchema } from "@/schemas";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "./user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validation = LoginSchema.safeParse(credentials);

        if (validation.success) {
          const { email, password } = validation.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatcher = await bcrypt.compare(password, user.password);

          if (passwordMatcher) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
