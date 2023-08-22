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
    <div className="w-11/12 mx-auto p-3 antialiased bg-zinc-100 rounded-md grid grid-cols-3 gap-4">
      <div className="col-span-1"></div>
      <div className="col-span-1 flex justify-center items-center">
        <p
          className={`${hideDisplay} text-center text-4xl lg:text-5xl text-zinc-900 tracking-wide`}
        >
          {timeFormatter(time)}
        </p>
      </div>

      {/* Right Column */}
      {isOn && (
        <div className="col-span-1 flex items-center">
          <button
            onClick={hideDisplayFunc}
            className="ml-auto w-6 transition-opacity duration-300 opacity-20 hover:opacity-100"
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
        </div>
      )}
    </div>
  );
}
