"use client";

import { useActivity } from "@/providers/activityProvider";
import { hour, minutes, seconds } from "@/lib/utils/timeFormatter";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActivitySelected() {
  const { activityName, activityTime } = useActivity();

  return (
    <div className="flex justify-between mt-20 border-b w-full">
      <div>{activityName}</div>
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon
          icon={faClock}
          size="lg"
          style={{ color: "#636974" }}
        />
        <div>
          {hour(activityTime) != "0" && <span>{hour(activityTime)}:</span>}
          {hour(activityTime) != "0" && (
            <span>{minutes(activityTime).padStart(2, "0")}:</span>
          )}
          {hour(activityTime) == "0" && <span>{minutes(activityTime)}:</span>}
          <span>{seconds(activityTime)}</span>
        </div>
      </div>
    </div>
  );
}
