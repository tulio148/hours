"use client";
import { createContext, useContext, useState } from "react";

type ActivityContextType = {
  name: string;
  setName: (value: string) => void;
  activityTime: number;
  setActivityTime: (value: number) => void;
};

export const ActivityContext = createContext<ActivityContextType>({
  name: "",
  setName: () => {},
  activityTime: 0,
  setActivityTime: () => {},
});

export const ActivityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState("");
  const [activityTime, setActivityTime] = useState(0);
  return (
    <ActivityContext.Provider
      value={{
        name,
        setName,
        activityTime,
        setActivityTime,
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
