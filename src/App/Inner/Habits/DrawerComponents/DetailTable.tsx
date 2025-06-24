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

import { IconTrash } from "@tabler/icons-react";
import { handleSelectedRows, setRowClass } from "./Functions";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store/store";
import { useState } from "react";

interface DetailTableProps {
  habitLogs: HabitLog[];
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRows: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  selectedRows: Record<string, boolean>;
  filterHabit: string;
}

export const DetailTable = ({
  habitLogs,
  setShouldRefetch,
  setSelectedRows,
  selectedRows,
  filterHabit,
}: DetailTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [allChecked, setAllChecked] = useState(false);
  const cellClass = "w-[50px] text-center border-r-1";
  const otherCells = "text-center border-r-1";
  const checkBoxClass =
    "cursor-pointer bg-[hsl(0,0%,90%)] border-[hsl(0,0%,70%)]";

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

  return (
    <Table className="log-table rounded-md border-separate border-spacing-y-[1px] border-1 overflow-hidden z-0">
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
          if (filterHabit === "" && log.log_date) {
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
          } else if (
            log.habit_name.toLowerCase().includes(filterHabit.toLowerCase()) &&
            log.log_date
          ) {
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
  );
};
