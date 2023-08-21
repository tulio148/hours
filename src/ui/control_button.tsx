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
  const classes = `${className} text-base border-2 m-2 p-6 w-1/5 rounded-md`;

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
