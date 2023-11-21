"use client";

import { useTime } from "@/providers/timerProvider";
import { hour, minutes, seconds } from "../lib/utils/timeFormatter";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

export default function Display() {
  const { time, isOn, displayIsHidden, setDisplayIsHidden } = useTime();

  const hideDisplayFunc = () => {
    setDisplayIsHidden(!displayIsHidden);
  };
  return (
    <div className="relative w-full  mx-auto p-3 bg-gradient-to-br from-white via-slate-200/50 to-white rounded-xl shadow-md">
      <div
        className={clsx(
          "flex justify-center transition-opacity duration-1000  w-1/2 mx-auto text-4xl lg:text-5xl text-zinc-700 tracking-wide text-center",
          { "opacity-0": displayIsHidden }
        )}
      >
        <div>
          {hour(time) != "0" && <span>{hour(time)}:</span>}
          {hour(time) != "0" && <span>{minutes(time).padStart(2, "0")}:</span>}
          {hour(time) == "0" && <span>{minutes(time)}:</span>}
          <span>{seconds(time)}</span>
        </div>
      </div>

      {isOn && (
        <button
          onClick={hideDisplayFunc}
          className="absolute top-1/2 transform -translate-y-1/2 right-5 w-5 transition-opacity duration-300 opacity-20 hover:opacity-100"
        >
          {!displayIsHidden ? (
            <FontAwesomeIcon
              icon={faEye}
              size="lg"
              style={{ color: "black" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              size="lg"
              style={{ color: "black" }}
            />
          )}
        </button>
      )}
    </div>
  );
}
