import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";
import * as bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only POST method is allowed
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  if (!req.body) return res.status(400).json({ message: "Missing form data" });

  const { username, email, password } = req.body;

  // Check duplicate users
  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists)
    return res.status(422).json({ message: "User already exists" });

  // Hash the password
  const hashedPassword = bcrypt.hash(password, 10);
}
