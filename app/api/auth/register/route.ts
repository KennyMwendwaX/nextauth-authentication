import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { Resend } from "resend";
import VerifyEmail from "@/components/VerifyEmailTemplate";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const req = await request.json();
  const { name, email, password } = req;

  try {
    // Check if the email is already registered
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists)
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = generateVerificationCode();

    // Create the user an account
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        verificationCode: verificationCode,
      },
    });

    // Send email for verification
    const data = await resend.emails.send({
      from: "<onboarding@resend.dev>",
      to: ["kennymwendwa67@gmail.com"], // Send the verification email to the user's email
      subject: "Account Verification",
      react: VerifyEmail({ verificationCode: verificationCode }),
    });

    // Return success message
    if (user) {
      return NextResponse.json(
        { message: "User registered successfully. Verification email sent." },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to register user" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server error, try again later" },
      { status: 500 }
    );
  }
}

function generateVerificationCode(length = 8) {
  const buffer = crypto.randomBytes(length);
  return buffer.toString("hex").toUpperCase();
}
