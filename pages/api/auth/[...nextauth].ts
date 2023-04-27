import { prisma } from "@/utils/db";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials, req) {
        // Check user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) throw new Error("This email is not registered");

        // Check password
        const checkPassword = await compare(
          credentials.password,
          user.password
        );
        if (!checkPassword)
          throw new Error("Username or password doesn't match");

        return user;
      },
    }),
  ],
});
