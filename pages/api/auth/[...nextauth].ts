import { prisma } from "@/utils/db";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

type MyCredentials = {
  email: string;
  password: string;
};

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: MyCredentials | undefined, req) {
        // Check if credentials are present
        if (!credentials) throw new Error("Credentials are required");

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
