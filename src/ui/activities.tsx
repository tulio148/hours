"use client";
import { useState } from "react";
import Activity from "./activity";
import AddActivity from "./addActivity";
import ActivitySelected from "./activitySelected";
import { ActivityType, CategoryType } from "@/lib/types/prisma";
import { useActivity } from "@/providers/activityProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { upsertCategory } from "@/app/_actions";

export default function Activities({
  activities,
  categories,
}: {
  activities: ActivityType[];
  categories: CategoryType[];
}) {
  const { activitySelected } = useActivity();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showCreateCategoryInput, setShowCreateCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const toggleCategory = (categoryId: number | null) => {
    setSelectedCategory((prevCategoryId: number | null) =>
      prevCategoryId === categoryId ? null : categoryId
    );
  };

  const handleCreateCategory = () => {
    setShowCreateCategoryInput(true);
  };

  const handleConfirmCreateCategory = async () => {
    try {
      const newCategory = await upsertCategory(newCategoryName);
      console.log("New category created:", newCategory);
      setNewCategoryName("");
      setShowCreateCategoryInput(false);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-5xl m-4 mt-10 p-6 border-b bg-gradient-to-tl from-white from-20% to-slate-200 rounded-xl shadow-md text-xl text-slate-500">
      <div>
        <div className="flex items-center justify-between cursor-pointer">
          <h2 className="text-lg font-semibold">Uncategorized</h2>
          <button
            onClick={handleCreateCategory}
            className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Create Category
          </button>
        </div>
        <div className="ml-4 mb-2">
          {activities
            .filter((activity) => !activity.categoryId)
            .map((activity) => (
              <Activity key={activity.id} activity={activity} />
            ))}
        </div>
      </div>

      {categories.map((category) => (
        <div key={category.id}>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleCategory(category.id)}
          >
            <h2 className="text-lg font-semibold">{category.name}</h2>
            <FontAwesomeIcon
              icon={faArrowRight}
              size="sm"
              style={{
                transform:
                  selectedCategory === category.id
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
              }}
            />
          </div>
          <div
            className={`ml-4 mb-2 ${
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
        <ActivitySelected categories={categories} />
        <div
          className={`w-full border-t border-db-pink/30 border-slate-400 transition-transform duration-500 transform origin-left ${
            activitySelected != 0 ? "scale-x-100" : "scale-x-0"
          }`}
        ></div>
      </div>

      {showCreateCategoryInput && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="New Category Name"
            className="border border-gray-400 px-2 py-1 rounded mr-2"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button
            onClick={handleConfirmCreateCategory}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}
