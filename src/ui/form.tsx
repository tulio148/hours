"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

export default function Form() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      await fetch(`/api/activity/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const { data: session, status } = useSession();

  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-center" htmlFor="Activity">
          Activity
        </label>
        <input
          className="border"
          type="text"
          placeholder=""
          {...register("name", {})}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
