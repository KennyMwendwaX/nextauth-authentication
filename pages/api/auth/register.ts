import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";
import * as bcrypt from "bcrypt";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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
    return res.status(409).json({ message: "Email already registered" });

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await prisma.user.create({
    data: {
      name: username,
      email: email,
      password: hashedPassword,
    },
  });

  if (user) {
    return res.status(201).json({ message: "User registered" });
  } else {
    return res.status(500).json({ message: "Server error" });
  }
}
