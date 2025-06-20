import { IconLogs, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { AddNew } from "./AddNew";
import type { User } from "@supabase/supabase-js";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../Components/ui/drawer";

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
        <div className="group flex gap-5">
          <button className={Button} onClick={toggleAccordion}>
            <IconPlus size={16} />
            Create
          </button>

          <Drawer>
            <DrawerTrigger asChild>
              <button className={Button}>
                <IconLogs size={16} />
                Show Logs
              </button>
            </DrawerTrigger>
            <DrawerContent className="!pt-0 !mt-0 bg-white flex flex-col items-center justify-between max-h-[80vh] min-h-[40vh] overflow-y-auto">
              <div className="w-full flex flex-col flex-1 overflow-y-auto inner-drawer">
                <DrawerHeader>
                  <DrawerTitle>Recent Logs</DrawerTitle>
                  <DrawerDescription>Edit your logs</DrawerDescription>
                </DrawerHeader>

                <div className="p-4 pb-0 flex-1 overflow-y-auto">
                  {/* Your log items will go here */}
                </div>

                <DrawerFooter className="flex items-end px-10">
                  <DrawerClose asChild>
                    <button className="bg-red-800 px-3 py-1 text-white rounded-md shadow-md hover:scale-103 transition-all duration-300 ease-in-out hover:bg-red-700 font-extrabold cursor-pointer">
                      Close
                    </button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
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
