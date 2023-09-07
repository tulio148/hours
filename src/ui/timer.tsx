"use client";
import { useEffect } from "react";
import { useTime } from "@/providers/timerProvider";
import { useActivity } from "@/providers/activityProvider";
import Display from "./display";
import Controls from "./controls";

export default function Timer() {
  const { time, setTime, isOn, setIsOn, displayIsHidden, setDisplayIsHidden } =
    useTime();
  const { name } = useActivity();

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

  const end = async () => {
    const finishTime = time;
    try {
      const response = await fetch("/activity/[id]", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finishTime),
      });
      if (response.status === 200) {
        console.log("Activity updated successfully");
      } else {
        console.log("Error updating");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <Controls
        start={start}
        reset={reset}
        end={end}
        isOn={isOn}
        hideBtn={hideBtn}
      />
    </div>
  );
}
