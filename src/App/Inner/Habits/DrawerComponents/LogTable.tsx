import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Checkbox } from "../../../../Components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../Components/ui/table";
import { cn } from "../../../../lib/utils";
import { deleteLogFromDB, type HabitLog } from "../../../../store/habitSlice";
import { IconFilter, IconTrash } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store/store";
import { Button } from "../../../../Components/ui/button";

interface LogTableProps {
  habitLogs: HabitLog[];
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogTable = ({ habitLogs, setShouldRefetch }: LogTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedRows, setSelectedRows] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [allChecked, setAllChecked] = useState(false);
  const cellClass = "w-[50px] text-center border-r-1";
  const otherCells = "text-center border-r-1";
  const checkBoxClass =
    "cursor-pointer bg-[hsl(0,0%,90%)] border-[hsl(0,0%,70%)]";

  const [filterHabit, setFilterHabit] = useState<string>("");

  const handleCheckboxChange = (checked: boolean, rowIndex: number) => {
    setSelectedRows((prev) => ({
      ...prev,
      [rowIndex]: checked,
    }));
  };

  const handleAllChecked = (checked: boolean) => {
    setAllChecked(checked);
    if (checked) {
      const allSelected = habitLogs.reduce((acc, _, index) => {
        acc[index] = true;
        return acc;
      }, {} as { [key: number]: boolean });
      setSelectedRows(allSelected);
    } else {
      setSelectedRows({});
    }
    console.log("Checkbox is now:", checked);
  };

  const setRowClass = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-500/20 hover:bg-red-500/40";
      case "green":
        return "bg-green-500/20 hover:bg-green-500/30";
      case "blue":
        return "bg-blue-500/20 hover:bg-blue-500/30";
      case "yellow":
        return "bg-yellow-500/20 hover:bg-yellow-500/30";
      case "purple":
        return "bg-purple-500/20 hover:bg-purple-500/30";
      default:
        return "bg-transparent";
    }
  };

  const handleSelectedRows = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-500/50 hover:bg-red-500/20";
      case "green":
        return "bg-green-500/50 hover:bg-green-500/30";
      case "blue":
        return "bg-blue-500/50 hover:bg-blue-500/30";
      case "yellow":
        return "bg-yellow-500/50 hover:bg-yellow-500/30";
      case "purple":
        return "bg-purple-500/50 hover:bg-purple-500/30";
      default:
        return "bg-transparent";
    }
  };

  const deleteSelectedCell = (log: HabitLog) => {
    console.log(log);
    dispatch(deleteLogFromDB(log))
      .unwrap()
      .then((res) => {
        console.log("✅ Log deleted:", res);
        setShouldRefetch((prev) => !prev);
      })

      .catch((err) => {
        console.error("❌ Failed to delete log:", err);
      });
  };

  const handleFilter = (habitName: string) => {
    console.log(habitName);
    setFilterHabit(habitName);
    console.log(filterHabit);
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
    <>
      <div className="w-full flex items-center justify-start ">
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
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <Table className="log-table rounded-md border-separate border-spacing-y-[1px] border-1 overflow-hidden z-0 check-z">
        <TableHeader className="bg-gray-50 z-0">
          {habitLogs.length > 0 && (
            <TableRow className="">
              <TableHead className={cellClass}>
                <Checkbox
                  id="check-all"
                  checked={allChecked}
                  onCheckedChange={handleAllChecked}
                  className={checkBoxClass}
                />
              </TableHead>
              <TableHead className={otherCells}>
                <div>Habit</div>
              </TableHead>
              <TableHead className="text-center">
                <div>Log Time</div>
              </TableHead>
              <TableHead className="text-center w-[100px]"></TableHead>
            </TableRow>
          )}
        </TableHeader>
        <TableBody>
          {habitLogs.map((log, index) => {
            if (log.log_date) {
              return (
                <TableRow
                  key={index}
                  id={index.toString()}
                  className={cn(
                    setRowClass(log.color),
                    "border-t-1 border-black/10 border-b-1 hover:scale-101 transition-all duration-300 ease-in-out",
                    selectedRows[index] ? handleSelectedRows(log.color) : ""
                  )}
                >
                  <TableCell className={cn(cellClass)}>
                    <Checkbox
                      id={"index"}
                      checked={!!selectedRows[index]}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(checked as boolean, index)
                      }
                      className={checkBoxClass}
                    />
                  </TableCell>
                  <TableCell className={otherCells}>{log.habit_name}</TableCell>
                  <TableCell className="text-center border-r-1">
                    {log.log_date || "—"}
                  </TableCell>
                  <TableCell className="text-center w-[100px] flex justify-center items-center min-w-[100px] max-w-[100px]">
                    <IconTrash
                      size={16}
                      className="hover:cursor-pointer hover:text-red-500"
                      onClick={() => deleteSelectedCell(log)}
                    />
                  </TableCell>
                </TableRow>
              );
            }
            return null;
          })}
        </TableBody>
      </Table>
    </>
  );
};
