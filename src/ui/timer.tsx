"use client";
import { useState, useEffect } from "react";
import Display from "./display";
import Controls from "./controls";
import { useTime } from "@/context/timeContext";

export default function Timer() {
  const { time, setTime } = useTime();
  const [isOn, setIsOn] = useState(false);
  const [displayIsHidden, setDisplayIsHidden] = useState(false);

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

  const hideDisplay = !displayIsHidden
    ? "transition-opacity duration-1000 opacity-100"
    : "transition-opacity duration-1000 opacity-0";

  return (
    <div className="flex flex-col gap-5 m-2 p-2 w-4/5 sm:w-1/2 max-w-2xl ">
      <Display
        time={time}
        isOn={isOn}
        hideDisplay={hideDisplay}
        hideDisplayFunc={hideDisplayFunc}
        displayIsHidden={displayIsHidden}
      />
      <Controls start={start} reset={reset} isOn={isOn} hideBtn={hideBtn} />
    </div>
  );
}
