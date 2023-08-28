import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

async function index(request: Request) {
  const activities = await prisma.activity.findMany();
  return NextResponse.json(activities);
}

async function store(request: Request) {
  try {
    const json = await request.json();

    const activity = await prisma.activity.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(activity), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("User with email already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}

export { index as GET, store as POST };
