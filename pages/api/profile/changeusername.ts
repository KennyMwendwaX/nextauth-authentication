import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!req.body) return res.status(400).json({ message: "Missing form data" });

  const { new_username } = req.body;
}
