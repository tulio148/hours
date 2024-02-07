"use client";
import { useActivity } from "@/providers/activityProvider";
import { useTime } from "@/providers/timerProvider";
import { hour, minutes, seconds } from "@/lib/utils/timeFormatter";
import { faHourglassEnd, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActivityType } from "@/lib/types/activity.types";
import { deleteActivity } from "@/app/_actions";

export default function Activity({ activity }: { activity: ActivityType }) {
  const { setActivityName, activitySelected, setActivitySelected } =
    useActivity();

  const { time, setTime, isOn, setIsOn, displayIsHidden, setDisplayIsHidden } =
    useTime();
  console.log(activitySelected);
  return (
    <div className="w-full py-2 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <button
          onClick={() => {
            if (activitySelected !== activity.id) {
              setActivitySelected(activity.id);
              setActivityName(activity.name);
            }
          }}
          className={`font-${
            activitySelected === activity.id ? "bold" : "extrathin"
          }`}
        >
          {activity.name}
        </button>
        <div
          className={`ml-auto opacity-${
            activitySelected === activity.id ? "100" : "0"
          } transition-opacity duration-700 flex items-center gap-3 text-zinc-700`}
        >
          <FontAwesomeIcon
            icon={faHourglassEnd}
            size="sm"
            style={{ color: "#000000" }}
          />
          <div>
            {hour(activity.hours) !== "0" && (
              <span>{hour(activity.hours)}:</span>
            )}
            {hour(activity.hours) !== "0" && (
              <span>{minutes(activity.hours).padStart(2, "0")}:</span>
            )}
            {hour(activity.hours) === "0" && (
              <span>{minutes(activity.hours)}:</span>
            )}
            <span>{seconds(activity.hours)}</span>
          </div>
        </div>
      </div>
      {activitySelected === activity.id && (
        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete this activity?")) {
              deleteActivity(activity.name);
              setActivitySelected(0);
              setActivityName("");
            }
          }}
        >
          <FontAwesomeIcon icon={faX} size="lg" style={{ color: "red" }} />
        </button>
      )}
    </div>
  );
}
