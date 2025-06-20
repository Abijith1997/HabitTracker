import { IconX } from "@tabler/icons-react";
import { cn } from "../../../lib/utils";

interface newHabit {
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
}

export const NewHabit = ({ clicked, setClicked }: newHabit) => {
  const Button =
    "flex items-center gap-2 focus:outline-none bg-stone-800 py-1 px-2 h-8 w-8 text-white shadow-md hover:bg-stone-700 cursor-pointer";
  return (
    <div className="w-screen h-screen fixed top-0 right-0 flex items-center justify-center">
      <div className="inner h-[500px] w-[400px] bg-gray-900 rounded-md shadow-lg">
        <div className="w-full h-full bg-white/40 rounded-md p-5 ">
          <div className="button-layer w-full  flex items-center justify-end">
            <button
              className={cn(Button, "hover:scale-105 rounded-full")}
              onClick={() => {
                setClicked(!clicked);
              }}
            >
              <IconX size={16} strokeWidth={2} />
            </button>
          </div>
          <div className="group">
            <label htmlFor="activityName" className="text-md font-extrabold">
              Name
            </label>
            <input type="text" id="activityName" />
          </div>
        </div>
      </div>
    </div>
  );
};
