import { useEffect, useState } from "react";
import type { habitProps } from "../Main";
import { cn } from "../../../lib/utils";
import { CreateTracker } from "./CreateTracker";

interface TrackerProps {
  habits: habitProps[];
}

export const Tracker = ({ habits }: TrackerProps) => {
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    if (habits.length > 0 && habits[0]?.logs) {
      const logs = habits[0].logs; // e.g., ["2025-06-19", "2025-06-20", ...]

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
  }, [habits]);

  return (
    <div className="w-full">
      {habits.map((habit) => (
        <div
          className="w-full overflow-x-auto gap-1 shadow-md p-5 flex items-center justify-center tracker rounded-md"
          key={habit.habit_name}
        >
          <CreateTracker />
          {Array.from({ length: Math.ceil(365 / 7) }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const blockIndex = weekIndex * 7 + dayIndex + 1;
                if (blockIndex >= 365) return null;
                const isActive = days.includes(blockIndex);
                return (
                  <div
                    key={blockIndex}
                    className={cn(
                      "w-3 h-3 border border-black rounded-[3px]",
                      isActive ? "bg-black" : ""
                    )}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
