"use client";
import { useActivity } from "@/providers/activityProvider";
import ControlButton from "./control_button";
import { useTime } from "@/providers/timerProvider";
import { createActivity, updateActivityTime } from "@/app/_actions";

export default function Controls() {
  const { time, setTime, isOn, setIsOn, setDisplayIsHidden } = useTime();
  const { activityName, activityTime, setActivityTime, activitySelected } =
    useActivity();

  const start = () => {
    setIsOn(!isOn);
    if (isOn === true) {
      setDisplayIsHidden(false);
    }
  };

  const reset = () => setTime(0);

  const end = () => {
    setActivityTime(time);
    setTime(0);
  };

  const save = async () => {
    // INSERT ACTIVITYTIME CONTEXT INSIDE CREATE ACTIVITY
    await createActivity(activityName);
    await updateActivityTime(activityTime, activitySelected);
  };

  const hideBtn = isOn || time === 0 ? "hidden" : "";

  return (
    <div className="flex flex-col">
      <div className="flex justify-around gap-6 p-3">
        <ControlButton onClick={reset} className={hideBtn}>
          reset
        </ControlButton>
        <ControlButton onClick={start}>
          {isOn ? "pause" : "start"}
        </ControlButton>
        <ControlButton className={hideBtn} onClick={end}>
          end
        </ControlButton>
      </div>

      {activityName != "" && (
        <ControlButton className="self-center" onClick={save}>
          Save
        </ControlButton>
      )}
    </div>
  );
}
