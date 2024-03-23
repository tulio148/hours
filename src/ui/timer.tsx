"use client";
import { useEffect } from "react";
import { useTime } from "@/providers/timerProvider";
import { useActivity } from "@/providers/activityProvider";
import Display from "./display";
import Controls from "./controls";
import { useUser } from "@clerk/nextjs";

export default function Timer() {
  const {
    startTime,
    time,
    displayTime,
    setDisplayTime,
    setTime,
    isOn,
    setIsOn,
    setStartTime,
  } = useTime();

  const { activityName, activitySelected, setActivitySelected } = useActivity();
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOn) {
      interval = setInterval(() => {
        setDisplayTime(time + (Date.now() - startTime) / 1000);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOn, time, displayTime]);

  useEffect(() => {
    if (userId) {
      const userPrefix = `user-${userId}-`;
      const loadIsOn = localStorage.getItem(userPrefix + "isOn");
      const loadStartTime = localStorage.getItem(userPrefix + "startTime");
      const loadTime = localStorage.getItem(userPrefix + "time");
      const loadActivitySelected = localStorage.getItem(
        userPrefix + "activitySelected"
      );

      try {
        if (loadIsOn) {
          setIsOn(JSON.parse(loadIsOn));
        }
        if (loadStartTime) {
          setStartTime(JSON.parse(loadStartTime));
        }
        if (loadTime) {
          setTime(JSON.parse(loadTime));
        }
        if (loadActivitySelected) {
          setActivitySelected(JSON.parse(loadActivitySelected));
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const userPrefix = `user-${userId}-`;

      localStorage.setItem(userPrefix + "isOn", JSON.stringify(isOn));

      localStorage.setItem(userPrefix + "startTime", JSON.stringify(startTime));
      localStorage.setItem(
        userPrefix + "activitySelected",
        JSON.stringify(activitySelected)
      );
      localStorage.setItem(userPrefix + "time", JSON.stringify(time));
    }
  }, [isOn, startTime, activitySelected, userId]);

  return (
    <>
      {(activityName != "" || activitySelected != 0) && (
        <div className="flex flex-col gap-5 mt-10 min-w-[300px] max-w-5xl">
          <Display />
          <Controls />
        </div>
      )}
    </>
  );
}
