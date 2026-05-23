import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Total Employees
    const totalEmployees =
      await prisma.employee.count();

    // Total Attendance Records
    const totalAttendance =
      await prisma.attendance.count();

    // Present Employees
    const presentToday =
      await prisma.attendance.count({
        where: {
          status: "Present",
        },
      });

    return NextResponse.json({
      totalEmployees,
      totalAttendance,
      presentToday,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to fetch dashboard data",
      },
      { status: 500 }
    );
  }
}