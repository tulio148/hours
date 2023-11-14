"use client";

import Activity from "./activity";
import AddActivity from "./addActivity";
import ActivitySelected from "./activitySelected";
import { ActivityType } from "@/lib/types/activity.types";

export default function Activities({
  activities,
}: {
  activities: ActivityType[];
}) {
  console.log(activities);
  return (
    <div className="flex flex-col p-4">
      {activities.map((activity) => (
        <Activity key={activity.id} activity={activity} />
      ))}
      <AddActivity />
      <ActivitySelected />
    </div>
  );
}
