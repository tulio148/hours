"use client";
import { createContext, useContext, useState } from "react";

type TimerContextType = {
  time: number;
  setTime: (value: number) => void;
  isOn: boolean;
  setIsOn: (value: boolean) => void;
  displayIsHidden: boolean;
  setDisplayIsHidden: (value: boolean) => void;
};

export const TimerContext = createContext<TimerContextType>({
  time: 0,
  setTime: () => {},
  isOn: false,
  setIsOn: () => {},
  displayIsHidden: false,
  setDisplayIsHidden: () => {},
});

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [displayIsHidden, setDisplayIsHidden] = useState(false);
  return (
    <TimerContext.Provider
      value={{
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
