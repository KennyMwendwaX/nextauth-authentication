import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const { email, code } = req;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const isEqual = user.verificationCode === code;

    if (!isEqual)
      return NextResponse.json(
        { message: "Invalid or expired verification code" },
        { status: 400 }
      );

    // Update user's verification status and set the emailVerified field to the current date
    await prisma.user.update({
      where: { email: user.email as string },
      data: {
        verificationCode: null,
        emailVerified: new Date(Date.now()), // Use the current date and time
      },
    });

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error, try again later" },
      { status: 500 }
    );
  }
}
