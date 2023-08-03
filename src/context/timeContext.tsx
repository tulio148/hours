"use client";
import { createContext, useContext, useState } from "react";

type TimeContextType = {
  time: number;
  setTime: (value: number) => void;
};

export const TimeContext = createContext<TimeContextType>({
  time: 0,
  setTime: () => {},
});

export const TimeProvider = ({ children }: { children: React.ReactNode }) => {
  const [time, setTime] = useState(0);
  return (
    <TimeContext.Provider value={{ time, setTime }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error(
      "useTime has to be used within <TimeContext.Provider>"
    )
}
  return context;
}
