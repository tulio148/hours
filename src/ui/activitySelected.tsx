"use client";

import { useActivity } from "@/providers/activityProvider";
import { hour, minutes, seconds } from "@/lib/utils/timeFormatter";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTime } from "@/providers/timerProvider";
import clsx from "clsx";

export default function ActivitySelected() {
  const { time, displayIsHidden } = useTime();
  const { activityName, activitySelected } = useActivity();
  console.log(activitySelected);

  return (
    <>
      <div className="flex justify-between mt-20 w-full py-2">
        <div>{activityName}</div>
        {activityName && (
          <div
            className={clsx(
              "flex gap-3 items-center transition-opacity duration-1000",
              {
                "opacity-0": displayIsHidden,
              }
            )}
          >
            <FontAwesomeIcon
              icon={faClock}
              size="sm"
              style={{ color: "#000000" }}
            />
            <div>
              {hour(time) != "0" && <span>{hour(time)}:</span>}
              {hour(time) != "0" && (
                <span>{minutes(time).padStart(2, "0")}:</span>
              )}
              {hour(time) == "0" && <span>{minutes(time)}:</span>}
              <span>{seconds(time)}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
