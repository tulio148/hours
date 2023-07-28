'use client'
import { timeFormatter } from "../utils/timeFormatter"

export default function Display({time} : {time: number}) { 

return(
    <div className="flex-col p-3 m-2 text-center text-8xl text-zinc-900 bg-zinc-100 rounded-lg border-double border-2 border-zinc-500">
        {timeFormatter(time)}
    </div>
    )
   }