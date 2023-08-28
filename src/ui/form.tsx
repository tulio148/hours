"use client";

import { useForm } from "react-hook-form";

export default function Form() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const onSubmit = async (data: any) => {
    // console.log(data);
    try {
      await fetch("/activity/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  };

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
        <label className="text-center" htmlFor="Activity">
          description
        </label>
        <input
          className="border"
          type="text"
          placeholder=""
          {...register("description", {})}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
