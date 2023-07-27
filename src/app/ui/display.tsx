'use client'

import { useState, useEffect } from "react"
export const Timer = () => { 

const [time, setTime] = useState(0)
const [isOn, setIsOn] = useState(false)

useEffect (() => {
    let interval: string | number | NodeJS.Timeout | undefined
    if (isOn) {
    interval = setInterval(() => setTime(p => p + 1), 1000)
    }
    return () => clearInterval(interval)
}, [isOn, time])

const start = () => setIsOn(!isOn)
const reset = () => setTime(0)
const hiddenReset = isOn ? "hidden" : "text-4xl"

const timeTransform = (t: number) => {
    let hours = Math.floor(t / 3600).toString()
    let minutes = Math.floor((t % 3600) / 60).toString().padStart(2,'0')
    let seconds = Math.floor(t % 60).toString().padStart(2,'0') 
    return `${hours}:${minutes}:${seconds}`
}






    return(
        <div className="flex-col">
            <div className="w-1/4 h-1/6 text-8xl">{timeTransform(time)}</div> 
            <div className="flex justify-around">
            <button className="text-4xl" onClick={start}>{isOn? "Pause" : "Start"}</button>
            <button className={hiddenReset}  onClick={reset}>Reset</button>
            </div>
        </div>


    )
   }