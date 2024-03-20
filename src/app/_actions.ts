"use server";

import { revalidatePath } from "next/cache";
import { ActivityType, CategoryType, UserType } from "@/lib/types/prisma";
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
      data: {
        name,
        userId: user.id,
        hours,
      },
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

export async function deleteActivity(name: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be signed in to delete an activity");
  }

  await prisma.activity.deleteMany({
    where: {
      userId: user.id,
      name: name,
    },
  });

  revalidatePath("/");
}

export async function getCategories(): Promise<CategoryType[]> {
  const user = await currentUser();
  if (user) {
    return await prisma.category.findMany({
      where: {
        userId: user.id,
      },
    });
  }
  return [];
}

export async function upsertCategory(name: string): Promise<CategoryType> {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }

  const data = {
    name: name,
    userId: user.id,
  };

  const existingCategory = await prisma.category.findUnique({
    where: { name_userId: { name: name, userId: user.id } },
  });

  if (existingCategory) {
    return existingCategory;
  } else {
    const newCategory = await prisma.category.create({
      data: data,
    });
    revalidatePath("/");
    return newCategory;
  }
}

export async function deleteCategory(name: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be signed in to delete a category");
  }

  await prisma.category.deleteMany({
    where: {
      userId: user.id,
      name: name,
    },
  });

  revalidatePath("/");
}

export async function addActivityToCategory(
  activityName: string,
  categoryName: string
): Promise<void> {
  const user = await currentUser();

  const activity = await prisma.activity.findUnique({
    where: { name_userId: { name: activityName, userId: user!.id } },
  });

  const category = await prisma.category.findUnique({
    where: { name_userId: { name: categoryName, userId: user!.id } },
  });

  if (!activity || !category) {
    throw new Error("Activity or category not found.");
  }

  await prisma.activity.update({
    where: { id: activity.id },
    data: {
      category: { connect: { id: category.id } },
    },
  });

  revalidatePath("/");
}
