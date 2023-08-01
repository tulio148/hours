"use client";
import { useState, useEffect } from "react";
import Display from "./display";
import Controls from "./controls";

export default function Timer() {
  const [time, setTime] = useState(0);
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
   } , []);

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

  const hideResetBtn =
    isOn || time === 0
      ? "hidden"
      : "text-2xl border-2 m-2 p-2 w-1/5 rounded-md";

  const hideDisplay = 
    !displayIsHidden
      ? "flex-col p-3 m-2 text-center text-8xl text-zinc-900 bg-zinc-100 rounded-md"
      : "flex-col p-3 m-2 text-center text-8xl text-zinc-900 bg-zinc-100 rounded-md transition-opacity duration-1000 opacity-0";

  return (
    <div className="flex-col m-2 p-2 border-double border-2 w-1/2 border-zinc-500 rounded-lg">
      <Display time={time} hideDisplay={hideDisplay} />
      <Controls
        start={start}
        reset={reset}
        isOn={isOn}
        hideResetBtn={hideResetBtn}
        hideDisplayFunc={hideDisplayFunc}
        displayIsHidden={displayIsHidden}
      />
    </div>
  );
}
