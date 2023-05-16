// import { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "@/utils/db";
// import * as bcrypt from "bcrypt";

// type Data = {
//   message: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   // Only POST method is allowed
//   if (req.method !== "POST")
//     return res.status(405).json({ message: "Method not allowed" });

//   if (!req.body) return res.status(400).json({ message: "Missing form data" });

//   const { username, email, password } = req.body;

//   // Check duplicate users
//   const userExists = await prisma.user.findUnique({
//     where: {
//       email: email,
//     },
//   });

//   if (userExists)
//     return res.status(409).json({ message: "Email already registered" });

//   // Hash the password
//   const hashedPassword = bcrypt.hashSync(password, 10);

//   const user = await prisma.user.create({
//     data: {
//       name: username,
//       email: email,
//       password: hashedPassword,
//     },
//   });

//   if (user) {
//     return res.status(201).json({ message: "User registered" });
//   } else {
//     return res.status(500).json({ message: "Server error" });
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";
import { PrismaClient, ProviderEnum } from "@prisma/client";
import bcrypt from "bcrypt";

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

  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user an account
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        account: {
          create: {
            provider: ProviderEnum.CREDENTIALS,
          },
        },
      },
      include: {
        account: true,
      },
    });

    // Return success message
    if (user) {
      return res.status(201).json({ message: "User registered successfully" });
    } else {
      return res.status(500).json({ message: "Failed to register user" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error, try again later" });
  }
}
