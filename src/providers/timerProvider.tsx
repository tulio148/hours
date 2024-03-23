"use client";
import { createContext, useContext, useState } from "react";

type TimerContextType = {
  startTime: number;
  setStartTime: (value: number) => void;
  displayTime: number;
  setDisplayTime: (value: number) => void;
  time: number;
  setTime: (value: number) => void;
  isOn: boolean;
  setIsOn: (value: boolean) => void;
  displayIsHidden: boolean;
  setDisplayIsHidden: (value: boolean) => void;
};

export const TimerContext = createContext<TimerContextType>({
  startTime: 0,
  setStartTime: () => {},
  displayTime: 0,
  setDisplayTime: () => {},
  time: 0,
  setTime: () => {},
  isOn: false,
  setIsOn: () => {},
  displayIsHidden: false,
  setDisplayIsHidden: () => {},
});

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [startTime, setStartTime] = useState(0);
  const [displayTime, setDisplayTime] = useState(0);
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [displayIsHidden, setDisplayIsHidden] = useState(false);
  return (
    <TimerContext.Provider
      value={{
        startTime,
        setStartTime,
        displayTime,
        setDisplayTime,
        time,
        setTime,
        isOn,
        setIsOn,
        displayIsHidden,
        setDisplayIsHidden,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTime = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTime has to be used within <TimerContext.Provider>");
  }
  return context;
};
