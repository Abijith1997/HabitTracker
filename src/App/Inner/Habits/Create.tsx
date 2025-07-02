import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { AddNew } from "./AddNew";
import type { User } from "@supabase/supabase-js";

import { LogDrawer } from "./DrawerComponents/LogDrawer";
import type { HabitLog } from "../../../store/habitSlice";

interface Props {
  user: User | null;
  userHasHabits: boolean;
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  habitLogs: HabitLog[];
}

export const ButtonClass =
  "flex items-center gap-2 focus:outline-none bg-stone-800 py-2 px-3 rounded-md text-white shadow-md hover:bg-stone-700 cursor-pointer";

export const Create = ({
  user,
  userHasHabits,
  setShouldRefetch,
  habitLogs,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="w-full py-5 px-3">
      <div className="w-full create flex items-center justify-between">
        <div className="left-text font-extrabold text-xl">
          {userHasHabits ? "Habits" : "Hi"}
        </div>
        <div className="group flex gap-5">
          <button className={ButtonClass} onClick={toggleAccordion}>
            <IconPlus size={16} />
            Create
          </button>
          <LogDrawer
            habitLogs={habitLogs}
            setShouldRefetch={setShouldRefetch}
          />
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="accordion">
          <AddNew
            user={user}
            setShouldRefetch={setShouldRefetch}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </div>
  );
};
