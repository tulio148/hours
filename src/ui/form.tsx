"use client";

import { useForm } from "react-hook-form";
import { useActivity } from "@/providers/activityProvider";
import { faClock, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { hour, minutes, seconds } from "@/utils/timeFormatter";
import { createActivity } from "@/app/_actions";

export default function Form() {
  const { name, setName, activityTime, setActivityTime } = useActivity();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (data: any) => {
    // setName(data.name);
    // reset();
    console.log(data);
    createActivity(data);
  };

  return (
    <div className="flex flex-col gap-4 p-3 w-full">
      {name != "" && (
        <div className="flex justify-between mt-5 border-b">
          <div>{name}</div>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon
              icon={faClock}
              size="lg"
              style={{ color: "#636974" }}
            />
            <div>
              {hour(activityTime) != "0" && <span>{hour(activityTime)}:</span>}
              {hour(activityTime) != "0" && (
                <span>{minutes(activityTime).padStart(2, "0")}:</span>
              )}
              {hour(activityTime) == "0" && (
                <span>{minutes(activityTime)}:</span>
              )}
              <span>{seconds(activityTime)}</span>
            </div>
          </div>
        </div>
      )}

      {name == "" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 "
        >
          <div className="flex gap-2">
            <input
              className="border-b pt-2 focus:outline-none w-full"
              type="text"
              placeholder=""
              {...register("name", {})}
            />
            <button type="submit" className="icon-button">
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ color: "#636974" }}
              />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
