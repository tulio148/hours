"use client";
import { createContext, useContext, useState } from "react";

type ActivityContextType = {
  name: string;
  setName: (value: string) => void;
};

export const ActivityContext = createContext<ActivityContextType>({
  name: "",
  setName: () => {},
});

export const ActivityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState("");
  return (
    <ActivityContext.Provider
      value={{
        name,
        setName,
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
