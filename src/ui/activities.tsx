"use client";

import { useState } from "react";
import Activity from "./activity";
import AddActivity from "./addActivity";
import ActivitySelected from "./activitySelected";
import { ActivityType, CategoryType, UserType } from "@/lib/types/prisma";
import { useActivity } from "@/providers/activityProvider";

export default function Activities({
  activities,
  categories,
}: {
  activities: ActivityType[];
  categories: CategoryType[];
}) {
  const {
    activityName,
    setActivityName,
    activitySelected,
    setActivitySelected,
  } = useActivity();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const toggleCategory = (categoryId: number | null) => {
    setSelectedCategory((prevCategoryId: number | null) =>
      prevCategoryId === categoryId ? null : categoryId
    );
  };

  return (
    <div className="flex flex-col gap-4 max-w-5xl  m-4 mt-10 p-6 border-b bg-gradient-to-tl from-white from-20% to-slate-200   rounded-xl shadow-md text-xl text-slate-500">
      {categories.map((category) => (
        <div key={category.id}>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleCategory(category.id)}
          >
            <h2 className="text-lg font-semibold">{category.name}</h2>
            {/* Toggle arrow icon for collapsing/expanding */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transform transition-transform duration-200"
              viewBox="0 0 20 20"
              fill="currentColor"
              // Rotate the arrow icon based on the selected category
              style={{
                transform:
                  selectedCategory === category.id
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
              }}
            >
              {/* Use an arrow icon */}
            </svg>
          </div>
          {/* Collapsible content for activities */}
          <div
            className={`ml-4 mb-2 ${
              // Show activities only if the category is selected
              selectedCategory === category.id ? "block" : "hidden"
            }`}
          >
            {activities
              .filter((activity) => activity.categoryId === category.id)
              .map((activity) => (
                <Activity key={activity.id} activity={activity} />
              ))}
          </div>
        </div>
      ))}
      <AddActivity />
      <div>
        <ActivitySelected />
        <div
          className={`w-full border-t border-db-pink/30 border-slate-400 transition-transform duration-500 transform origin-left ${
            activitySelected != 0 ? "scale-x-100" : "scale-x-0"
          }`}
        ></div>
      </div>
    </div>
  );
}
