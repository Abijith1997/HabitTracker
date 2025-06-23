import { IconLogs } from "@tabler/icons-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../../Components/ui/drawer";
import { ButtonClass } from "../Create";
import type { HabitLog } from "../../../../store/habitSlice";
import { LogTable } from "./LogTable";

interface DrawerProps {
  habitLogs: HabitLog[];
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogDrawer = ({ habitLogs, setShouldRefetch }: DrawerProps) => {
  return (
    <div className="flex">
      <Drawer>
        <DrawerTrigger asChild>
          <button className={ButtonClass}>
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

            <div className="p-4 pb-0 flex-1 overflow-y-auto overflow-x-hidden bg-red-50 container relative">
              <div className="w-full log-table">
                <div className="rounded-md shadow-md p-2 overflow-x-hidden log-table">
                  <LogTable
                    habitLogs={habitLogs}
                    setShouldRefetch={setShouldRefetch}
                  />
                </div>
              </div>
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
  );
};
