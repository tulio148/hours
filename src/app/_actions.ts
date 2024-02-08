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

export async function upsertActivity(
  name: string,
  hours: number,
  categoryName?: string
) {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }

  // Check if categoryName is provided
  if (categoryName) {
    // Check if the category already exists
    let category = await prisma.category.findUnique({
      where: { name_userId: { name: categoryName, userId: user.id } },
    });

    // If category doesn't exist, create a new one
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryName,
          userId: user.id,
        },
      });
    }

    // Create the activity with the specified category
    await prisma.activity.create({
      data: {
        name: name,
        userId: user.id,
        hours: hours,
        categoryId: category.id,
      },
    });
  } else {
    // If categoryName is not provided, use the default category
    // Check if the default category exists
    let defaultCategory = await prisma.category.findUnique({
      where: { name_userId: { name: "Default Category", userId: user.id } },
    });

    // If default category doesn't exist, create a new one
    if (!defaultCategory) {
      defaultCategory = await prisma.category.create({
        data: {
          name: "Default Category",
          userId: user.id,
        },
      });
    }

    // Create the activity with the default category
    await prisma.activity.create({
      data: {
        name: name,
        userId: user.id,
        hours: hours,
        categoryId: defaultCategory.id,
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
    return await prisma.category.create({
      data: data,
    });
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
