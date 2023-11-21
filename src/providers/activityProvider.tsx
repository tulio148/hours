"use client";
import { createContext, useContext, useState } from "react";

type ActivityContextType = {
  activityName: string;
  setActivityName: (value: string) => void;
  activitySelected: number;
  setActivitySelected: (value: number) => void;
};

export const ActivityContext = createContext<ActivityContextType>({
  activityName: "",
  setActivityName: () => {},
  activitySelected: 0,
  setActivitySelected: () => {},
});

export const ActivityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activityName, setActivityName] = useState("");
  const [activitySelected, setActivitySelected] = useState(0);

  return (
    <ActivityContext.Provider
      value={{
        activityName,
        setActivityName,
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
