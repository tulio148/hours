"use client";

import { useForm } from "react-hook-form";
import { useTime } from "@/context/timeContext"
import { timeFormatter } from "@/utils/timeFormatter";



export default function Form() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
        Activity: ""
    }
  });
  const onSubmit = (data) => {

  } 

  const {time} = useTime()


  return   (
  <div>
    <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Activity">Activity</label>
      
      <input type="text" placeholder="" {...register("Activity", {})} />
      <input type="submit" />
      <h1>{timeFormatter(time)}</h1>
    </form>
  </div>
  )
}
