import { prisma } from "@/utils/db";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

type MyCredentials = {
  email: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
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
        if (!checkPassword) throw new Error("Email or password doesn't match");

        // Generate access token
        const accessToken = sign(
          { userId: user.id },
          `${process.env.ACCESS_TOKEN_SECRET}`,
          {
            expiresIn: "1h",
          }
        );

        // Generate refresh token
        const refreshToken = sign(
          { userId: user.id },
          `${process.env.REFRESH_TOKEN_SECRET}`,
          {
            expiresIn: "7d",
          }
        );

        // Generate session state
        const sessionState = sign(
          { userId: user.id },
          `${process.env.SESSION_STATE_SECRET}`
        );

        // Update Account model
        const account = await prisma.account.update({
          where: { userId: user.id },
          data: {
            access_token: accessToken,
            refresh_token: refreshToken,
            session_state: sessionState,
            token_type: "Bearer",
          },
        });

        // Create Session model
        const session = await prisma.session.create({
          data: {
            userId: user.id,
            expires: new Date(), // Set the expiration date for the session
          },
        });

        return {
          ...user,
          name: user.name,
          accessToken,
          sessionState,
          account,
          session,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
