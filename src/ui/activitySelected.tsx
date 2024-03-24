"use client";
import { useActivity } from "@/providers/activityProvider";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTime } from "@/providers/timerProvider";
import { CategoryType } from "@/lib/types/prisma";

export default function ActivitySelected() {
  const { isOn } = useTime();
  const { activityName, activitySelected } = useActivity();

  return (
    <>
      <div className="flex justify-between mt-20 w-full py-2">
        <div>{activityName}</div>
        {activityName && (
          <div className="flex gap-3 items-center transition-opacity duration-1000">
            <FontAwesomeIcon
              icon={faHourglassEnd}
              size="xl"
              style={{ color: "black" }}
              className={
                isOn ? "animate-pulse-slow ani mr-8" : "mr-8 opacity-0"
              }
            />
          </div>
        )}
      </div>
      <div
        className={`w-full border-t border-db-pink/30 border-slate-400 transition-transform duration-500 transform origin-left ${
          activitySelected != 0 ? "scale-x-100" : "scale-x-0"
        }`}
      ></div>
    </>
  );
}
