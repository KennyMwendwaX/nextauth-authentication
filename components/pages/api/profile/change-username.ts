import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!req.body) return res.status(400).json({ message: "Missing form data" });

  const { email, new_username } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.username === new_username)
    return res.json({ message: "Same username" });

  const updateUsername = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      username: new_username,
    },
  });

  if (updateUsername) {
    return res.json({ message: "Username updated successfully" });
  } else {
    return res.status(500).json({ message: "Server Error" });
  }
}
