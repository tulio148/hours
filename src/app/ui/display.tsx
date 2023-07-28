'use client'
import { timeFormatter } from "../utils/timeFormatter"

export default function Display({time} : {time: number}) { 

return(
    <div className="flex-col m-2 p-3 border-double border-2 border-zinc-500">
        <div className="w-1/4 h-1/6 text-8xl">{timeFormatter(time)}</div> 
    </div>
    )
   }