import { NextResponse } from "next/server";
import connectDB from "@/db/db";
import { User } from "@/db/schema/user.schema";
import { v4 as uuid } from "uuid";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { userName, email, password } = await req.json();
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const user = await User.create({
      userId: uuid(),
      userName,
      email,
      password,
    });

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
