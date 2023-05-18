import { prisma } from "@/utils/db";
import {
  JsonWebTokenError,
  TokenExpiredError,
  sign,
  verify,
} from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

// API route for refreshing the access token
export default async function refresh(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { refreshToken } = req.body;

  if (!refreshToken || typeof refreshToken !== "string") {
    return res.status(400).json({ error: "Invalid refresh token" });
  }

  try {
    // Verify and decode the refresh token
    const decodedToken = verify(
      refreshToken,
      `${process.env.REFRESH_TOKEN_SECRET}`
    ) as { userId: string };

    // Get the user based on the decoded user ID
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a new access token
    const accessToken = sign(
      { userId: user.id },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ accessToken });
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ error: "Refresh token expired" });
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
}
