import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Controls({
  isOn,
  start,
  reset,
  hideResetBtn,
  hideDisplayFunc,
  displayIsHidden,
}: {
  start: () => void;
  reset: () => void;
  isOn: boolean;
  hideResetBtn: string;
  hideDisplayFunc: () => void;
  displayIsHidden: boolean;
  time: number;
}) {
  return (
    <>
      <div className="flex justify-around">
        <button className={hideResetBtn} onClick={reset}>
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
      </div>
      <button onClick={hideDisplayFunc} className="float-right m-2">
        {!displayIsHidden ? (
          <FontAwesomeIcon icon={faEye} size="lg" style={{color: "black"}}/>
        ) : (
          <FontAwesomeIcon icon={faEyeSlash } size="lg" style={{color: "black"}} />
        )}
      </button>
    </>
  );
}
