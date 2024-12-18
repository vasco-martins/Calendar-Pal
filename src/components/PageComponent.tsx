"use client";
import { format, addMonths, startOfMonth, isBefore } from "date-fns";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Calendar } from "./ui/calendar";

const PageComponent = () => {
  const { watch } = useFormContext();
  const color = watch("color");
  const startDateRaw = watch("startDate");
  const endDateRaw = watch("endDate");
  const [months, setMonths] = useState<Date[]>([]);

  useEffect(() => {
    // Ensure startDate and endDate are valid before proceeding
    const startDate = startDateRaw ? new Date(startDateRaw) : null;
    const endDate = endDateRaw ? new Date(endDateRaw) : null;

    if (
      startDate &&
      endDate &&
      !isNaN(startDate.getTime()) &&
      !isNaN(endDate.getTime())
    ) {
      const getMonthsInRange = (startDate: Date, endDate: Date): Date[] => {
        const months: Date[] = [];
        let current = startOfMonth(startDate); // Start at the beginning of the month

        while (
          isBefore(current, endDate) ||
          current.getTime() === endDate.getTime()
        ) {
          months.push(current);
          current = addMonths(current, 1); // Move to the next month
        }

        return months;
      };

      setMonths(getMonthsInRange(startDate, endDate));
    } else {
      setMonths([]); // Clear months if startDate or endDate are invalid
    }
  }, [startDateRaw, endDateRaw]);

  return (
    <div id="print" className="w-[595px] h-[842px] bg-white shadow-md">
      {/* Header Section */}
      <div
        className="h-[150px] w-full flex justify-center items-center "
        style={{ backgroundColor: color }}
      >
        <div className="flex flex-col items-center">
          {/* Display the title */}
          <h1 className="text-3xl">{watch("title", "Quarter Life")}</h1>

          {/* Display the date range */}
          <div className="flex gap-2">
            <span>
              {startDateRaw
                ? format(new Date(startDateRaw), "dd-MM-yyyy")
                : "Start Date"}
            </span>
            <span>-</span>
            <span>
              {endDateRaw
                ? format(new Date(endDateRaw), "dd-MM-yyyy")
                : "End Date"}
            </span>
          </div>
        </div>
      </div>

      {/* Calendar Grid Section */}
      <div className="grid grid-cols-2 w-full gap-4 p-4">
        {months.map((month: Date) => (
          <Calendar
            key={month.toDateString()}
            mode="single"
            month={month}
            className="mx-auto"
            selected={
              month.getMonth() === new Date(startDateRaw).getMonth()
                ? new Date(startDateRaw)
                : new Date(endDateRaw)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default PageComponent;
