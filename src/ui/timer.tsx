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
    ? "flex-col p-3 m-2 antialiased text-center text-xl sm:text-3xl lg:text-5xl text-zinc-900 bg-zinc-100 rounded-md"
    : "flex-col p-3 m-2 antialiased text-center text-xl sm:text-3xl lg:text-5xl text-zinc-900 bg-zinc-100 rounded-md transition-opacity duration-1000 opacity-0";

  return (
    <div className="flex-col m-2 p-2 border-double border-2 w-min h-min  border-zinc-500 rounded-lg">
      <Display time={time} hideDisplay={hideDisplay} />
      <Controls
        start={start}
        reset={reset}
        isOn={isOn}
        hideBtn={hideBtn}
        hideDisplayFunc={hideDisplayFunc}
        displayIsHidden={displayIsHidden}
      />
    </div>
  );
}
