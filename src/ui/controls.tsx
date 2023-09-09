"use client";
import { useActivity } from "@/providers/activityProvider";
import ControlButton from "./control_button";
import { useTime } from "@/providers/timerProvider";

export default function Controls({
  start,
  reset,
  end,
}: {
  start: () => void;
  reset: () => void;
  end: () => void;
}) {
  const { time, setTime, isOn } = useTime();
  const { name, setName, setActivityTime } = useActivity();

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

      {name != "" && (
        <ControlButton className="self-center" onClick={create}>
          Save
        </ControlButton>
      )}
    </div>
  );
}
