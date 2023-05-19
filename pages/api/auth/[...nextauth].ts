import { prisma } from "@/utils/db";
import { compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

type MyCredentials = {
  email: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
    GitHubProvider({
      clientId: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    }),
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

        // Refresh tokens
        const tokens = await getTokens(user);

        // Update Account model
        const account = await prisma.account.update({
          where: { userId: user.id },
          data: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            session_state: tokens.session_state,
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
          accessToken: tokens.access_token,
          sessionState: tokens.session_state,
          account,
          session,
        };
      },
    }),
  ],

  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secret: process.env.NEXTAUTH_SECRET,
    // other options...
  },
};

export default NextAuth(authOptions);

async function getTokens(user: { id: string }) {
  // Fetch the existing user tokens from the database
  const existingTokens = await prisma.account.findUnique({
    where: { userId: user.id },
    select: { access_token: true, refresh_token: true },
  });

  let access_token: string | null = null;
  let refresh_token: string | null = null;

  if (existingTokens) {
    access_token = existingTokens.access_token || null;
    refresh_token = existingTokens.refresh_token || null;
  }

  // Verify the access token expiration
  let decodedAccessToken: any;
  try {
    decodedAccessToken =
      access_token &&
      verify(access_token, `${process.env.ACCESS_TOKEN_SECRET}`);
  } catch (error) {
    decodedAccessToken = null;
  }

  // Verify the refresh token expiration
  let decodedRefreshToken: any;
  try {
    decodedRefreshToken =
      refresh_token &&
      verify(refresh_token, `${process.env.REFRESH_TOKEN_SECRET}`);
  } catch (error) {
    decodedRefreshToken = null;
  }

  // Generate new tokens if expired or not found
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const accessTokenExpired =
    !decodedAccessToken || decodedAccessToken.exp < currentTimestamp;
  const refreshTokenExpired =
    !decodedRefreshToken || decodedRefreshToken.exp < currentTimestamp;

  if (accessTokenExpired) {
    // Generate access token
    access_token = sign(
      { userId: user.id },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      {
        expiresIn: "1h",
      }
    );
  }

  if (refreshTokenExpired) {
    // Generate refresh token
    refresh_token = sign(
      { userId: user.id },
      `${process.env.REFRESH_TOKEN_SECRET}`,
      {
        expiresIn: "7d",
      }
    );
  }

  // Generate session state
  const session_state = sign(
    { userId: user.id },
    `${process.env.SESSION_STATE_SECRET}`
  );

  return {
    access_token,
    refresh_token,
    session_state,
  };
}
