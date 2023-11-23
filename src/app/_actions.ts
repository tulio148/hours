"use server";

import { revalidatePath } from "next/cache";
import { ActivityType } from "@/types/activity";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export async function getActivities(): Promise<ActivityType[]> {
  const user = await currentUser();
  if (user) {
    return await prisma.activity.findMany({
      where: {
        userId: user!.id,
      },
    });
  }
  return [];
}

export async function getActivity(name: string) {
  return await prisma.activity.findFirst({
    where: {
      name: name,
    },
  });
}

export async function upsertActivity(name: string, hours: number) {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }

  const data = {
    name: name,
    userId: user.id,
    hours: hours,
  };

  const existingActivity = await prisma.activity.findUnique({
    where: { name_userId: { name: name, userId: user.id } },
  });

  if (existingActivity) {
    await prisma.activity.update({
      where: { id: existingActivity.id },
      data: {
        hours: {
          increment: hours,
        },
      },
    });
  } else {
    await prisma.activity.create({
      data: data,
    });
  }
  revalidatePath("/");
}

export async function upsertUser() {
  const user = await currentUser();
  return await prisma.user.upsert({
    where: {
      id: user!.id,
    },
    create: {
      id: user!.id,
      email: user?.emailAddresses[0].emailAddress!,
      firstName: user?.firstName!,
      lastName: user?.lastName!,
    },
    update: {
      email: user?.emailAddresses[0].emailAddress!,
    },
  });
}
