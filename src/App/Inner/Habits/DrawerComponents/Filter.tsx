import { IconFilter } from "@tabler/icons-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "../../../../Components/ui/button";
import type { HabitLog } from "../../../../store/habitSlice";
import { cn } from "../../../../lib/utils";
import { setRowClass } from "./Functions";

interface FilterProps {
  habitLogs: HabitLog[];
  setFilterHabit: (value: string) => void;
}

export const Filter = ({ habitLogs, setFilterHabit }: FilterProps) => {
  const handleFilter = (habitName: string) => {
    console.log(habitName);
    setFilterHabit(habitName);
  };

  const uniqueHabits = (() => {
    const habitPairs = habitLogs.map((habit) => ({
      habit_name: habit.habit_name,
      color: habit.color,
    }));

    const uniqueMap = new Map();
    habitPairs.forEach(({ habit_name, color }) => {
      const key = `${habit_name}-${color}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, { habit_name, color });
      }
    });

    const habits = Array.from(uniqueMap.values());
    habits.sort((a, b) => a.habit_name.localeCompare(b.habit_name));
    return habits;
  })();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">
          Filter <IconFilter size={16} className="ml-1" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align="start"
        side="bottom"
        className="z-50 mt-2 w-[140px] rounded-md bg-white p-2 shadow-md flex flex-col gap-1"
      >
        {uniqueHabits.map(({ habit_name, color }, idx) => (
          <DropdownMenu.Item
            key={idx}
            onSelect={() => handleFilter(habit_name)}
            className={cn(
              "cursor-pointer rounded px-2 py-2 text-sm hover:bg-gray-100 text-center ",
              setRowClass(color)
            )}
          >
            {habit_name}
          </DropdownMenu.Item>
        ))}
        <DropdownMenu.Item
          onSelect={() => handleFilter("")}
          className="cursor-pointer rounded px-2 py-2 text-sm hover:bg-gray-100 text-center "
        >
          All
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
