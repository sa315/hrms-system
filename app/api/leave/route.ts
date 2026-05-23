import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET LEAVES
export async function GET() {
  try {
    const leaves =
      await prisma.leave.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(leaves);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to fetch leaves",
      },
      { status: 500 }
    );
  }
}

// APPLY LEAVE
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const leave =
      await prisma.leave.create({
        data: {
          employeeId:
            body.employeeId,

          employeeName:
            body.employeeName,

          reason: body.reason,

          startDate:
            body.startDate,

          endDate:
            body.endDate,
        },
      });

    return NextResponse.json(
      leave
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to apply leave",
      },
      { status: 500 }
    );
  }
}

// UPDATE LEAVE STATUS
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const updatedLeave =
      await prisma.leave.update({
        where: {
          id: body.id,
        },

        data: {
          status: body.status,
        },
      });

    return NextResponse.json(
      updatedLeave
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to update leave",
      },
      { status: 500 }
    );
  }
}