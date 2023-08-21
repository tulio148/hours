import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ControlButton from "./control_button";

export default function Controls({
  isOn,
  start,
  reset,
  hideBtn,
  hideDisplayFunc,
  displayIsHidden,
}: {
  start: () => void;
  reset: () => void;
  isOn: boolean;
  hideBtn: string;
  hideDisplayFunc: () => void;
  displayIsHidden: boolean;
}) {
  return (
    <>
      <div className="flex justify-around">
        <ControlButton onClick={reset} className={hideBtn}>
          reset
        </ControlButton>
        <ControlButton onClick={start}>
          {isOn ? "pause" : "start"}
        </ControlButton>
        <ControlButton className={hideBtn} onClick={reset}>
          end
        </ControlButton>
      </div>

      {isOn ? (
        <button
          onClick={hideDisplayFunc}
          className="float-right m-2 transition-opacity duration-300 opacity-20 ease-out hover:opacity-100 "
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
      ) : (
        ""
      )}
    </>
  );
}
