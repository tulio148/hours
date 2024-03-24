"use client";
import { useActivity } from "@/providers/activityProvider";
import { hour, minutes, seconds } from "@/lib/utils/timeFormatter";
import { faHourglassEnd, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteActivity } from "@/app/_actions";
import { ActivityType, CategoryType, UserType } from "@/lib/types/prisma";

export default function Activity({ activity }: { activity: ActivityType }) {
  const { setActivityName, activitySelected, setActivitySelected } =
    useActivity();

  return (
    <div className="w-full py-2 flex justify-between items-center">
      <button
        onClick={() => {
          if (activitySelected !== activity.id) {
            setActivitySelected(activity.id);
            setActivityName(activity.name);
          }
        }}
        className={`font-${
          activitySelected === activity.id ? "medium" : "normal"
        }`}
      >
        {activity.name}
      </button>
      <div className="flex gap-4 items-center">
        <div
          className={`ml-auto border border-black/20 px-3 py-1 rounded-lg opacity-${
            activitySelected === activity.id ? "100" : "0"
          } transition-opacity duration-1000 flex items-center gap-2 text-zinc-700`}
        >
          <FontAwesomeIcon
            icon={faHourglassEnd}
            size="sm"
            style={{ color: "#000000" }}
            className="opacity-60"
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

        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete this activity?")) {
              deleteActivity(activity.name);
              setActivitySelected(0);
              setActivityName("");
            }
          }}
          className={`ml-auto opacity-${
            activitySelected === activity.id ? "100" : "0"
          } transition-opacity duration-1000`}
        >
          <FontAwesomeIcon
            icon={faX}
            size="sm"
            style={{ color: "grey" }}
            className="opacity-50"
          />
        </button>
      </div>
    </div>
  );
}
