export default function Controls({start, reset, isOn, hiddenReset} : {start: () => void, reset: () => void, isOn: boolean, hiddenReset: string | undefined;
}) {
    return (
        <div className="flex justify-around m-3">
        <button className="text-4xl" onClick={start}>{isOn? "Pause" : "Start"}</button>
        <button className={hiddenReset}  onClick={reset}>Reset</button>
        </div>
        )
}