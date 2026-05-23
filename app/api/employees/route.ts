import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany();

    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const employee = await prisma.employee.create({
      data: {
        name: body.name,
        email: body.email,
        mobile: body.mobile,
        salary: body.salary,
      },
    });

    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    await prisma.employee.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete employee" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const updatedEmployee =
      await prisma.employee.update({
        where: {
          id: body.id,
        },
        data: {
          name: body.name,
          email: body.email,
          mobile: body.mobile,
          salary: body.salary,
        },
      });

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update employee" },
      { status: 500 }
    );
  }
}