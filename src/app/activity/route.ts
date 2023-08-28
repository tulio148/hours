import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function index() {
  const activities = await prisma.activity.findMany();
  return NextResponse.json(activities);
}

async function store(request: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);
  try {
    const json = await request.json();
    // console.log(json);
    const activity = await prisma.activity.create({
      data: json,
    });

    if (session) {
      await prisma.user.update({
        where: {
          email: session.user!.email,
        },
        data: {
          activity: {
            connect: {
              name: json.name,
            },
          },
        },
      });
    }

    return new NextResponse(JSON.stringify(activity), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("Activity already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}

export { index as GET, store as POST };
