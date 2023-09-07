import ControlButton from "./control_button";

export default function Controls({
  isOn,
  start,
  reset,
  end,
  hideBtn,
}: {
  start: () => void;
  reset: () => void;
  isOn: boolean;
  hideBtn: string;
  end: () => Promise<void>;
}) {
  return (
    <div className="flex justify-around gap-6 p-3">
      <ControlButton onClick={reset} className={hideBtn}>
        reset
      </ControlButton>
      <ControlButton onClick={start}>{isOn ? "pause" : "start"}</ControlButton>
      <ControlButton className={hideBtn} onClick={end}>
        end
      </ControlButton>
    </div>
  );
}
