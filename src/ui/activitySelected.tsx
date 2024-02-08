"use client";

import { useActivity } from "@/providers/activityProvider";
import { hour, minutes, seconds } from "@/lib/utils/timeFormatter";
import { faClock, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTime } from "@/providers/timerProvider";
import clsx from "clsx";

export default function ActivitySelected() {
  const { isOn } = useTime();
  const { activityName, activitySelected } = useActivity();
  console.log(activitySelected);

  return (
    <>
      <div className="flex justify-between mt-20 w-full py-2">
        <div>{activityName}</div>
        {activityName && (
          <div
            className={clsx(
              "flex gap-3 items-center transition-opacity duration-1000"
            )}
          >
            <FontAwesomeIcon
              icon={faHourglassEnd}
              size="xl"
              style={{ color: "red" }}
              className={isOn ? "animate-pulse-slow mr-8" : "mr-8 opacity-0"}
            />
          </div>
        )}
      </div>
    </>
  );
}
