"use client";
import { useEffect } from "react";
import { useTime } from "@/context/timerContext";
import Display from "./display";
import Controls from "./controls";

export default function Timer() {
  const { time, setTime, isOn, setIsOn, displayIsHidden, setDisplayIsHidden } =
    useTime();

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

  const hideDisplayFunc = () => {
    setDisplayIsHidden(!displayIsHidden);
  };

  const hideBtn = isOn || time === 0 ? "hidden" : "";

  return (
    <div className="flex flex-col gap-5 m-2 p-2 w-4/5 sm:w-1/2 max-w-2xl ">
      <Display
        time={time}
        isOn={isOn}
        hideDisplayFunc={hideDisplayFunc}
        displayIsHidden={displayIsHidden}
      />
      <Controls start={start} reset={reset} isOn={isOn} hideBtn={hideBtn} />
    </div>
  );
}
