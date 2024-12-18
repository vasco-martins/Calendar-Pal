"use client";
import { useFormContext } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { addMonths, format } from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Settings = () => {
  const { register, watch } = useFormContext();
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const starterDate = watch("startDate");
  const endDate = watch("startDate");

  useEffect(() => {
    // Get today's date and format it using date-fns
    const today = new Date();
    const fourMonths = addMonths(today, 3);
    const formattedToday = format(today, "yyyy-MM-dd");
    const formattedFourMonths = format(fourMonths, "yyyy-MM-dd");
    setMinDate(formattedToday); // Set formatted date as the minimum date
    setMaxDate(formattedFourMonths);
  }, [starterDate, endDate]);

  return (
    <div className="bg-white w-96 p-8 shadow-md rounded-lg">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h1 className="text-xl font-bold mb-4">Settings</h1>
        <div className="mb-4">
          <Label htmlFor="color">Page Title Colour</Label>
          <Input
            {...register("color")}
            type="color"
            id="color"
            placeholder="Color"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="title">Title</Label>
          <Input
            {...register("title")}
            type="string"
            id="title"
            placeholder="Title"
            maxLength={30}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            {...register("startDate", {
              required: true,
            })}
            type="date"
            id="startDate"
            min={minDate}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            {...register("endDate", {
              required: true,
            })}
            type="date"
            id="endDate"
            min={minDate}
            max={maxDate}
          />
        </div>
        <Button type="submit">Print</Button>
        <a
          href="https://www.buymeacoffee.com/menoahmartj"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            style={{
              height: "60px",
              width: "217px",
            }}
          />
        </a>
      </div>
    </div>
  );
};

export default Settings;
