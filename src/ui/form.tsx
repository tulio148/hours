"use client";

import { useForm } from "react-hook-form";
import { useActivity } from "@/providers/activityProvider";
import { faClock, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { hour, minutes, seconds } from "@/utils/timeFormatter";
import ControlButton from "./control_button";

export default function Form() {
  const { name, setName, activityTime, setActivityTime } = useActivity();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (data: any) => {
    setName(data.name);
    reset();
  };

  const create = async () => {
    try {
      const response = await fetch("api/activity/create", {
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
    } finally {
      setName("");
      setActivityTime(0);
    }
  };
  return (
    <div className="flex flex-col gap-4 p-3">
      {name != "" && (
        <div className="flex justify-between">
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            className="border-b pt-2 focus:outline-none"
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
      {name != "" && (
        <ControlButton className="self-center" onClick={create}>
          Save
        </ControlButton>
      )}
    </div>
  );
}
