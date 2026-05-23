import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET Attendance
export async function GET() {
  try {
    const attendance =
      await prisma.attendance.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}

// CREATE Attendance
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const attendance =
      await prisma.attendance.create({
        data: {
          employeeId: body.employeeId,
          checkIn: body.checkIn,
          latitude: body.latitude,
          longitude: body.longitude,
          status: body.status,
        },
      });

    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create attendance" },
      { status: 500 }
    );
  }
}