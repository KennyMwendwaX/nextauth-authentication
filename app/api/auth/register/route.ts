import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const { name, email, password } = res;
  return NextResponse.json({ name });
}
