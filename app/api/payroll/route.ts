import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET PAYROLLS
export async function GET() {
  try {
    const payrolls =
      await prisma.payroll.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      payrolls
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to fetch payrolls",
      },
      { status: 500 }
    );
  }
}

// CREATE PAYROLL
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payroll =
      await prisma.payroll.create({
        data: {
          employeeId:
            body.employeeId,

          employeeName:
            body.employeeName,

          amount: body.amount,

          month: body.month,
        },
      });

    return NextResponse.json(
      payroll
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to create payroll",
      },
      { status: 500 }
    );
  }
}

// UPDATE PAYROLL STATUS
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const updatedPayroll =
      await prisma.payroll.update({
        where: {
          id: body.id,
        },

        data: {
          status: body.status,
        },
      });

    return NextResponse.json(
      updatedPayroll
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Failed to update payroll",
      },
      { status: 500 }
    );
  }
}