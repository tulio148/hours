"use client";
import { createContext, useContext, useState } from "react";

type ActivityContextType = {
  activityName: string;
  setActivityName: (value: string) => void;
  activityTime: number;
  setActivityTime: (value: number) => void;
  activitySelected: number;
  setActivitySelected: (value: number) => void;
};

export const ActivityContext = createContext<ActivityContextType>({
  activityName: "",
  setActivityName: () => {},
  activityTime: 0,
  setActivityTime: () => {},
  activitySelected: 0,
  setActivitySelected: () => {},
});

export const ActivityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activityName, setActivityName] = useState("");
  const [activityTime, setActivityTime] = useState(0);
  const [activitySelected, setActivitySelected] = useState(0);
  return (
    <ActivityContext.Provider
      value={{
        activityName,
        setActivityName,
        activityTime,
        setActivityTime,
        activitySelected,
        setActivitySelected,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error(
      "useActivity has to be used within <ActivityContext.Provider>"
    );
  }
  return context;
};
