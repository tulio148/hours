"use client";

import { useEffect, useState } from "react";
import { useActivity } from "@/providers/activityProvider";
import { hour, minutes, seconds } from "@/lib/utils/timeFormatter";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActivitySelected() {
  const { activityName, activityTime, activitySelected } = useActivity();
  console.log(activitySelected);

  return (
    <>
      <div className="flex justify-between mt-20 w-full py-2">
        <div>{activityName}</div>
        {activityName && (
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon
              icon={faClock}
              size="sm"
              style={{ color: "#000000" }}
            />
            <div>
              {hour(activityTime) != "0" && <span>{hour(activityTime)}:</span>}
              {hour(activityTime) != "0" && (
                <span>{minutes(activityTime).padStart(2, "0")}:</span>
              )}
              {hour(activityTime) == "0" && (
                <span>{minutes(activityTime)}:</span>
              )}
              <span>{seconds(activityTime)}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
