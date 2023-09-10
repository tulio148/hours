"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export async function getActivities() {
  return await prisma.activity.findMany();
}

export async function getActivity(id: number) {
  return await prisma.activity.findUnique({
    where: {
      id,
    },
  });
}

export async function createActivity(name: string) {
  return await prisma.activity.create({
    data: { name: name },
  });
}

export async function updateActivityTime(time: number, id: number) {
  return await prisma.activity.update({
    where: {
      id: 1,
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
