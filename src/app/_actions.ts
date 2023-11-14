"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export async function getActivities() {
  return await prisma.activity.findMany();
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
  console.log(existingActivity);
  if (existingActivity) {
    // Update the existing record
    return await prisma.activity.update({
      where: { id: existingActivity.id },
      data: {
        hours: {
          increment: hours,
        },
      },
    });
  } else {
    return await prisma.activity.create({
      data: data,
    });
  }
}

export async function createActivity(name: string) {
  return await prisma.activity.create({
    data: { name: name },
  });
}

export async function updateActivityTime(time: number, id: number) {
  return await prisma.activity.update({
    where: {
      id: id,
    },
    data: {
      hours: {
        increment: time,
      },
    },
  });
}

export async function createOrUpdateUser() {
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
