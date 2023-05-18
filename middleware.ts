import { NextApiRequest, NextApiResponse } from "next";
import refresh from "@/utils/refresh";

export const config = {
  matcher: "/",
};

export default function middleware(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  return refresh(req, res);
}
