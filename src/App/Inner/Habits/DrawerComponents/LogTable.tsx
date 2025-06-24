import { useState } from "react";

import { type HabitLog } from "../../../../store/habitSlice";

import { Filter } from "./Filter";

import { DetailTable } from "./DetailTable";

interface LogTableProps {
  habitLogs: HabitLog[];
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogTable = ({ habitLogs, setShouldRefetch }: LogTableProps) => {
  const [selectedRows, setSelectedRows] = useState<{ [key: number]: boolean }>(
    {}
  );

  const [filterHabit, setFilterHabit] = useState<string>("");

  return (
    <>
      <div className="w-full flex items-center justify-start mb-2">
        <Filter habitLogs={habitLogs} setFilterHabit={setFilterHabit} />
      </div>
      <div className="min-h-[300px]">
        <DetailTable
          habitLogs={habitLogs}
          setShouldRefetch={setShouldRefetch}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          filterHabit={filterHabit}
        />
      </div>
    </>
  );
};
