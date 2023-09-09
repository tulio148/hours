"use client";
import { useEffect } from "react";
import { useTime } from "@/providers/timerProvider";
import { useActivity } from "@/providers/activityProvider";
import Display from "./display";
import Controls from "./controls";

export default function Timer() {
  const { time, setTime, isOn, setIsOn, displayIsHidden, setDisplayIsHidden } =
    useTime();
  const { name, setActivityTime } = useActivity();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOn) {
      interval = setInterval(() => setTime((p) => p + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOn, time]);

  useEffect(() => {
    const savedTime = localStorage.getItem("time");
    if (savedTime) {
      setTime(JSON.parse(savedTime));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("time", JSON.stringify(time));
  }, [time]);

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

  const hideDisplayFunc = () => {
    setDisplayIsHidden(!displayIsHidden);
  };

  return (
    <>
      {name != "" && (
        <div className="flex flex-col gap-5">
          <Display
            time={time}
            isOn={isOn}
            hideDisplayFunc={hideDisplayFunc}
            displayIsHidden={displayIsHidden}
          />
          <Controls start={start} reset={reset} end={end} />
        </div>
      )}
    </>
  );
}
