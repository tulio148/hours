import { createActivity, updateActivityTime } from "@/app/_actions";
import { ReactNode } from "react";

export default function ControlButton({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  const classes = `${className} text-center text-base border-2 m-1 p-1 w-1/4 rounded-md`;

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
