import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash Password
    const hashedPassword =
      await bcrypt.hash(
        body.password,
        10
      );

    // Create User
    const user =
      await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password:
            hashedPassword,
          role: "employee",
        },
      });

    // Send Welcome Email
    await sendEmail(
      body.email,

      "Welcome to HRMS",

      `Hello ${body.name},

Welcome to the HRMS Platform.

Your account has been created successfully.

Regards,
HR Team`
    );

    return NextResponse.json(
      user
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Registration failed",
      },
      { status: 500 }
    );
  }
}