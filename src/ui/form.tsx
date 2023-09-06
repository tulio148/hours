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
    try {
      const response = await fetch("/activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        console.log("Activity created successfully");
      } else {
        console.log("Error creating user");
      }
    } catch (error) {
      console.error(error);
    }
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
