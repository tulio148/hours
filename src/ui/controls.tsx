import ControlButton from "./control_button";

export default function Controls({
  isOn,
  start,
  reset,
  hideBtn,
}: {
  start: () => void;
  reset: () => void;
  isOn: boolean;
  hideBtn: string;
}) {
  return (
    <div className="flex justify-around gap-6 p-3">
      <ControlButton onClick={reset} className={hideBtn}>
        reset
      </ControlButton>
      <ControlButton onClick={start}>{isOn ? "pause" : "start"}</ControlButton>
      <ControlButton className={hideBtn} onClick={reset}>
        end
      </ControlButton>
    </div>
  );
}
