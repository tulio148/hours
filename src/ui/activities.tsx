"use client";
import { useState, useEffect, useRef } from "react";
import Activity from "./activity";
import AddActivity from "./addActivity";
import ActivitySelected from "./activitySelected";
import { ActivityType, CategoryType } from "@/lib/types/prisma";
import { useActivity } from "@/providers/activityProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { upsertCategory } from "@/app/_actions";
import Modal from "./modal";

export default function Activities({
  activities,
  categories,
}: {
  activities: ActivityType[];
  categories: CategoryType[];
}) {
  const { activitySelected } = useActivity();
  const [isNoCategoryExpanded, setIsNoCategoryExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showCreateCategoryInput, setShowCreateCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const modalRef = useRef();

  const toggleCategory = (categoryId: number | null) => {
    setSelectedCategory((prevCategoryId: number | null) =>
      prevCategoryId === categoryId ? null : categoryId
    );
  };
  const handleCreateCategory = () => {
    setShowCreateCategoryInput(true);
  };
  const handleCloseCreateCategoryModal = () => {
    setShowCreateCategoryInput(false);
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
    <div className="flex flex-col gap-4 max-w-5xl m-4 mt-10 p-6 border-b bg-gradient-to-tl from-white from-20% to-slate-200 rounded-xl drop-shadow-xl text-xl tracking-wider text-slate-500">
      <button
        onClick={handleCreateCategory}
        className="text-sm rounded hover:bg-gray-300 w-fit self-end"
      >
        <FontAwesomeIcon
          icon={faPlus}
          size="sm"
          style={{ color: "grey" }}
          className="mr-1"
        />
        category
      </button>
      <div
        className={`cursor-pointer ${isNoCategoryExpanded ? "expanded" : ""}`}
        onClick={() => setIsNoCategoryExpanded(!isNoCategoryExpanded)}
      >
        <div className="flex justify-between">
          <h2 className="text-xl font-medium">No category</h2>
          <FontAwesomeIcon
            icon={faArrowRight}
            size="sm"
            style={{
              transform: isNoCategoryExpanded
                ? "rotate(90deg)"
                : "rotate(0deg)",
              color: "grey",
            }}
          />
        </div>
      </div>
      <div className={`ml-4 mb-2 ${isNoCategoryExpanded ? "block" : "hidden"}`}>
        {activities
          .filter((activity) => !activity.categoryId)
          .map((activity) => (
            <Activity key={activity.id} activity={activity} />
          ))}
      </div>

      {categories.map((category) => (
        <div key={category.id}>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleCategory(category.id)}
          >
            <h2 className="text-xl font-medium">{category.name}</h2>
            <FontAwesomeIcon
              icon={faArrowRight}
              size="sm"
              style={{
                transform:
                  selectedCategory === category.id
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                color: "grey",
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
      <ActivitySelected />
      <Modal
        isOpen={showCreateCategoryInput}
        onClose={handleCloseCreateCategoryModal}
      >
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New Category"
            className="border rounded p-2"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button onClick={handleConfirmCreateCategory}>Confirm</button>
        </div>
      </Modal>
    </div>
  );
}
