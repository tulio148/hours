"use client";

import { useForm } from "react-hook-form";

export default function Form() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-3 border"
      >
        <label htmlFor="Name">Name</label>
        <input
          className="border p-2"
          type="text"
          placeholder=""
          {...register("name", {})}
        />

        <label htmlFor="Description">Description</label>
        <input
          className="border p-2"
          type="text"
          placeholder=""
          {...register("description", {})}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
