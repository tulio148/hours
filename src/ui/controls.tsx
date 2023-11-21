"use client";
import { useActivity } from "@/providers/activityProvider";
import ControlButton from "./control_button";
import { useTime } from "@/providers/timerProvider";
import { upsertActivity } from "@/app/_actions";

export default function Controls() {
  const { time, setTime, isOn, setIsOn, setDisplayIsHidden } = useTime();
  const { activityName, setActivityName, setActivitySelected } = useActivity();

  const start = () => {
    setIsOn(!isOn);
    if (isOn === true) {
      setDisplayIsHidden(false);
    }
  };

  const reset = () => setTime(0);

  const save = async () => {
    await upsertActivity(activityName, time);
    setActivityName("");
    setActivitySelected(0);
    setTime(0);
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
        {time != 0 && !isOn && (
          <ControlButton className="self-center" onClick={save}>
            save
          </ControlButton>
        )}
      </div>
    </div>
  );
}
