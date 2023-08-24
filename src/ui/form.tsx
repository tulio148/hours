"use client";

import { useForm } from "react-hook-form";
import { useTime } from "@/context/timerContext";
import { timeFormatter } from "@/utils/timeFormatter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Form() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      first_name: "",
      name: "",
    },
  });
  const onSubmit = async (data: any) => {
    // console.log(data);
    try {
      await prisma.user.create({
        data: {
          
        },
      });
      console.log('Data inserted successfully.');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
  

  const { time } = useTime();

  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-center" htmlFor="first_name">
          Name
        </label>
        <input
          className="border"
          type="text"
          placeholder=""
          {...register("first_name", {})}
        />
        <label className="text-center" htmlFor="name">
          Activity
        </label>
        <input
          className="border"
          type="text"
          placeholder=""
          {...register("name", {})}
        />
        <input type="submit" />
        <h1>{timeFormatter(time)}</h1>
      </form>
    </div>
  );
  }
