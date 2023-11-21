"use client";

import Activity from "./activity";
import AddActivity from "./addActivity";
import ActivitySelected from "./activitySelected";
import { ActivityType } from "@/lib/types/activity.types";
import { useActivity } from "@/providers/activityProvider";

export default function Activities({
  activities,
}: {
  activities: ActivityType[];
}) {
  const {
    activityName,
    setActivityName,
    activitySelected,
    setActivitySelected,
  } = useActivity();

  return (
    <div className="flex flex-col gap-4 max-w-5xl  m-4 mt-10 p-6 border-b bg-gradient-to-br from-white  via-slate-200/50  to-white rounded-xl shadow-md font-light text-xl text-slate-500">
      {activities.map((activity) => (
        <div key={activity.id}>
          <Activity activity={activity} />
          <div
            className={`w-full border-t border-slate-400 transition-transform duration-500 transform origin-left ${
              activitySelected === activity.id ? "scale-x-100" : "scale-x-0"
            }`}
          ></div>
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
