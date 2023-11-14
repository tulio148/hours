"use client";
import { useActivity } from "@/providers/activityProvider";
import { useTime } from "@/providers/timerProvider";
import { hour, minutes, seconds } from "@/lib/utils/timeFormatter";
import { faCircleH, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActivityType } from "@/lib/types/activity.types";

export default function Activity({ activity }: { activity: ActivityType }) {
  const {
    setActivityTime,
    setActivityName,
    activitySelected,
    setActivitySelected,
  } = useActivity();
  const { time, setTime, isOn, setIsOn, setDisplayIsHidden } = useTime();

  const selectActivity = (id: number) => {
    setActivitySelected(id);
  };

  // if (activitySelected === id) {
  //   setActivityName(activity.name), setActivitySelected(activity.id);
  // }

  return (
    <div className="w-full">
      {activitySelected != activity.id && (
        <button
          onClick={() => {
            selectActivity(activity.id);
            setActivityName(activity.name);
            setActivityTime(0);
          }}
        >
          {activity.name}
        </button>
      )}

      {activitySelected === activity.id && (
        <div className="w-full">
          <button onClick={() => selectActivity(activity.id)}>
            {activity.name}
          </button>
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
