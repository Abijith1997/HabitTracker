import { useEffect, useState } from "react";
import type { habitProps } from "../Main";
import { cn } from "../../../lib/utils";

interface TrackerProps {
  habit: habitProps;
}

export const CreateTracker = ({ habit }: TrackerProps) => {
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    if (habit?.logs) {
      const logs = habit.logs; // e.g., ["2025-06-19", "2025-06-20", ...]

      const dayNumbers = logs.map((dateStr) => {
        if (!dateStr) return 0;
        const date = new Date(dateStr);
        // Calculate day of year:
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        return dayOfYear;
      });

      console.log(dayNumbers); // e.g., [170, 171, ...]
      setDays(dayNumbers);
    }
  }, [habit]);
  const setFillColor = (days: number, color: string) => {
    let bgColor = "";

    console.log(days, "days");
    console.log(bgColor, "bgColor");

    if (days === 1) {
      switch (color) {
        case "red":
          return "bg-red-800/50";
        case "green":
          return "bg-green-800/50";
        case "blue":
          return "bg-blue-800/50";
        case "yellow":
          return "bg-yellow-800/50";
        case "purple":
          return "bg-purple-800/50";
        default:
          return "bg-black/80";
      }
    } else if (days === 2) {
      switch (color) {
        case "red":
          return "bg-red-800/60";
        case "green":
          return "bg-green-800/60";
        case "blue":
          return "bg-blue-800/60";
        case "yellow":
          return "bg-yellow-800/60";
        case "purple":
          return "bg-purple-800/60";
        default:
          return "bg-black/80";
      }
    } else if (days === 3) {
      switch (color) {
        case "red":
          return "bg-red-800/70";
        case "green":
          return "bg-green-800/70";
        case "blue":
          return "bg-blue-800/70";
        case "yellow":
          return "bg-yellow-800/70";
        case "purple":
          return "bg-purple-800/70";
        default:
          return "bg-black/80";
      }
    } else if (days >= 4) {
      switch (color) {
        case "red":
          return "bg-red-800/90";
        case "green":
          return "bg-green-800/90";
        case "blue":
          return "bg-blue-800/90";
        case "yellow":
          return "bg-yellow-800/90";
        case "purple":
          return "bg-purple-800/90";
        default:
          return "bg-black/80";
      }
    }
  };

  return (
    <div className="overflow-x-auto gap-[0.5px] shadow-md p-5 flex items-center justify-center tracker rounded-md bg-white/70">
      {Array.from({ length: Math.ceil(365 / 7) }).map((_, weekIndex) => (
        <div key={weekIndex} className="flex flex-col gap-[0.5px]">
          {Array.from({ length: 7 }).map((_, dayIndex) => {
            const blockIndex = weekIndex * 7 + dayIndex + 1;
            if (blockIndex >= 365) return null;

            const isActive = days.includes(blockIndex);
            const count = days.filter((day) => day === blockIndex).length;
            return (
              <div
                key={blockIndex}
                className={cn(
                  "w-3 h-3 border rounded-[3px]",
                  isActive ? setFillColor(count, habit.color) : "bg-black/30"
                )}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
