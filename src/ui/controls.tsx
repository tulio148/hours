export default function Controls({
  start,
  reset,
  isOn,
  hiddenReset,
}: {
  start: () => void;
  reset: () => void;
  isOn: boolean;
  hiddenReset: string | undefined;
}) {
  return (
    <div className="flex justify-around">
      <button className={hiddenReset} onClick={reset}>
        Reset
      </button>
      <button className="text-2xl border-2 m-2 p-2 w-1/5" onClick={start}>
        {isOn ? "Pause" : "Start"}
      </button>
      <button className={hiddenReset} onClick={reset}>
        Finish
      </button>
    </div>
  );
}
