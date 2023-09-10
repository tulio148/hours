"use client";

import { useForm } from "react-hook-form";
import { useActivity } from "@/providers/activityProvider";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function AddActivity() {
  const { setActivityName, setActivitySelected } = useActivity();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (data: any) => {
    setActivitySelected(-1);
    setActivityName(data.name);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <input
        className="border-b focus:outline-none w-full"
        type="text"
        placeholder=""
        {...register("name", {})}
      />
      <button type="submit" className="icon-button">
        <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: "#636974" }} />
      </button>
    </form>
  );
}
