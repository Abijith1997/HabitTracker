import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { AddNew } from "./AddNew";
import type { User } from "@supabase/supabase-js";

interface Props {
  user: User;
  userHasHabits: boolean;
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Create = ({ user, userHasHabits, setShouldRefetch }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const Button =
    "flex items-center gap-2 focus:outline-none bg-stone-800 py-2 px-3 rounded-md text-white shadow-md hover:bg-stone-700 cursor-pointer";

  useEffect(() => {
    console.log(userHasHabits);
  }, [userHasHabits]);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="w-full py-5 px-3">
      <div className="w-full create flex items-center justify-between">
        <div className="left-text font-extrabold text-xl">
          {userHasHabits ? "Habits" : "Hi"}
        </div>
        <button className={Button} onClick={toggleAccordion}>
          <IconPlus size={16} />
          Create
        </button>
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
