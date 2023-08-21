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

        {/* <button className={hideResetBtn} onClick={reset}>
          Reset
        </button>
        <button
          className="text-2xl border-2 m-2 p-2 w-1/5 rounded-md"
          onClick={start}
        >
          {isOn ? "Pause" : "Start"}
        </button>
        <button className={hideResetBtn} onClick={reset}>
          Finish
        </button>
        <button onClick={hideDisplayFunc} className="float-right m-2">
          {isOn ? (
            !displayIsHidden ? (
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
            )
          ) : (
            ""
          )}
        </button> */}
      </div>
    </>
  );
}
