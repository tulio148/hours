'use client'
import { useState, useEffect } from "react"
import Display from "./display"
import Controls from "./controls"

export default function Timer() { 

const [time, setTime] = useState(0)
const [isOn, setIsOn] = useState(false)

useEffect (() => {
    let interval: NodeJS.Timeout 
    if (isOn) {
    interval = setInterval(() => setTime(p => p + 1), 1000)
    }
    return () => clearInterval(interval)
}, [isOn, time])

const start = () => setIsOn(!isOn)
const reset = () => setTime(0)
const hiddenReset = isOn || time === 0 ? "hidden" : "text-2xl"



return(
    <div className="flex-col m-2 p-3 border-double border-2 border-zinc-500">
        <Display time={time}/>
        <Controls start={start} reset={reset} isOn={isOn} hiddenReset={hiddenReset}/>
    </div>


    )
   }