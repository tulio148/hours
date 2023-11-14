"use client";
import { useActivity } from "@/providers/activityProvider";
import { hour, minutes, seconds } from "@/lib/utils/timeFormatter";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActivityType } from "@/lib/types/activity.types";

export default function Activity({ activity }: { activity: ActivityType }) {
  const { setActivityName, activitySelected, setActivitySelected } =
    useActivity();

  const selectActivity = (id: number) => {
    setActivitySelected(id);
  };

  const id = activity.id;

  if (activitySelected === id) {
    setActivityName(activity.name), setActivitySelected(activity.id);
  }

  return (
    <div className="w-full">
      {activitySelected != activity.id && (
        <button onClick={() => selectActivity(id)}>{activity.name}</button>
      )}

      {activitySelected === activity.id && (
        <div className="w-full">
          <button onClick={() => selectActivity(0)}>{activity.name}</button>
          <div className="float-right flex gap-2 items-center ">
            <FontAwesomeIcon
              icon={faClock}
              size="lg"
              style={{ color: "#636974" }}
            />
            <div>
              {hour(activity.hours) != "0" && (
                <span>{hour(activity.hours)}:</span>
              )}
              {hour(activity.hours) != "0" && (
                <span>{minutes(activity.hours).padStart(2, "0")}:</span>
              )}
              {hour(activity.hours) == "0" && (
                <span>{minutes(activity.hours)}:</span>
              )}
              <span>{seconds(activity.hours)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
