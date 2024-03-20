"use client";
import { useEffect } from "react";
import { useTime } from "@/providers/timerProvider";
import { useActivity } from "@/providers/activityProvider";
import Display from "./display";
import Controls from "./controls";

export default function Timer() {
  const { time, setTime, isOn } = useTime();
  const { activityName } = useActivity();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOn) {
      interval = setInterval(() => setTime(time + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOn, time, setTime]);

  useEffect(() => {
    const savedTime = localStorage.getItem("time");
    if (savedTime) {
      setTime(JSON.parse(savedTime));
    }
  }, [setTime]);

  useEffect(() => {
    localStorage.setItem("time", JSON.stringify(time));
  }, [time]);

  return (
    <>
      {activityName != "" && (
        <div className="flex flex-col gap-5 mt-10 min-w-[300px] max-w-5xl">
          <Display />
          <Controls />
        </div>
      )}
    </>
  );
}
