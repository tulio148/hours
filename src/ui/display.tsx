import { timeFormatter } from "../utils/timeFormatter";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Display({
  time,
  isOn,
  hideDisplay,
  hideDisplayFunc,
  displayIsHidden,
}: {
  time: number;
  isOn: boolean;
  hideDisplay: string;
  hideDisplayFunc: () => void;
  displayIsHidden: boolean;
}) {
  return (
    <div className="relative w-11/12 mx-auto p-1 bg-zinc-100 rounded-md">
      <div
        className={`${hideDisplay} w-1/2 mx-auto p-1 text-4xl lg:text-5xl text-zinc-900 tracking-wide text-center`}
      >
        {timeFormatter(time)}
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
