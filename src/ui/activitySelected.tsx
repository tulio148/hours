"use client";
import { useState } from "react";
import { useActivity } from "@/providers/activityProvider";
import {
  faHourglassEnd,
  faPlus,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTime } from "@/providers/timerProvider";
import { addActivityToCategory } from "@/app/_actions";
import { CategoryType } from "@/lib/types/prisma";

export default function ActivitySelected({
  categories,
}: {
  categories: CategoryType[];
}) {
  const { isOn } = useTime();
  const { activityName } = useActivity();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddToCategory = async () => {
    if (!activityName || !selectedCategory) return;
    try {
      await addActivityToCategory(activityName, selectedCategory);
      // Add logic to add the activity to the category
    } catch (error) {
      console.error("Error adding activity to category:", error);
    }
  };

  const handleOpenActivityPage = () => {
    // Implement logic to open the activity page
    console.log("Opening activity page...");
  };

  return (
    <>
      <div className="flex justify-between mt-20 w-full py-2">
        <div>{activityName}</div>
        {activityName && (
          <div className="flex gap-3 items-center transition-opacity duration-1000">
            <FontAwesomeIcon
              icon={faHourglassEnd}
              size="xl"
              style={{ color: "red" }}
              className={isOn ? "animate-pulse-slow mr-8" : "mr-8 opacity-0"}
            />
            {/* Dropdown to select a category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm px-2 py-1 bg-blue-500 text-white rounded"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {/* Button to add to a category */}
            <button
              onClick={handleAddToCategory}
              className="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add to Category
            </button>
            {/* Button to open the activity page */}
            <button
              onClick={handleOpenActivityPage}
              className="text-sm px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <FontAwesomeIcon icon={faTasks} className="mr-1" />
              Open Activity Page
            </button>
          </div>
        )}
      </div>
    </>
  );
}
