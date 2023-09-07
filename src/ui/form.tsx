"use client";

import { useForm } from "react-hook-form";
import { useActivity } from "@/providers/activityProvider";

export default function Form() {
  const { name, setName } = useActivity();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (data: any) => {
    setName(data.name);

    try {
      const response = await fetch("api/activity/1/add-time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
        // body: name,
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

        <input type="submit" />
      </form>
    </div>
  );
}
