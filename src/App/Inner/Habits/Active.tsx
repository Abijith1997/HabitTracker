import type { User } from "@supabase/supabase-js";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../store/store";
import { addHabitToDB, deleteHabitFromDB } from "../../../store/habitSlice";
import type { habitProps } from "../Main";
import { IconPlus, IconTrashFilled } from "@tabler/icons-react";
import { cn } from "../../../lib/utils";

interface ActiveProps {
  userHasHabits: boolean;
  habits: habitProps[];
  user: User;
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Active = ({
  userHasHabits,
  habits,
  user,
  setShouldRefetch,
}: ActiveProps) => {
  const dispatch = useDispatch<AppDispatch>();

  if (!userHasHabits) {
    return <div className="flex w-full p-10">No active habits</div>;
  }

  const AddLog = (habit: habitProps) => {
    console.log(habit);
    const today = new Date().toISOString().split("T")[0]; // e.g., "2025-06-19"

    const newLog = {
      uid: user?.id,
      habit_name: habit.habit_name,
      log_date: today,
      created_at: new Date().toISOString(),
      color: habit.color,
    };
    console.log(newLog);
    dispatch(addHabitToDB(newLog))
      .unwrap()
      .then((res) => {
        console.log("✅ Log added:", res);
        setShouldRefetch((prev) => !prev);
      })

      .catch((err) => {
        console.error("❌ Failed to add log:", err);
      });
  };

  const deleteHabit = (habit: habitProps) => {
    console.log(habit);
    dispatch(deleteHabitFromDB(habit))
      .unwrap()
      .then((res) => {
        console.log("✅ Habit deleted:", res);
        setShouldRefetch((prev) => !prev);
      })

      .catch((err) => {
        console.error("❌ Failed to delete habit:", err);
      });
  };

  const setBgColor = (color: string) => {
    console.log(color);
    switch (color) {
      case "red":
        return "bg-red-500/10";
      case "green":
        return "bg-green-500/20";
      case "blue":
        return "bg-blue-500/20";
      case "yellow":
        return "bg-yellow-500/20";
      case "purple":
        return "bg-purple-500/20";
      default:
        return "bg-transparent";
    }
  };

  const setButtonBorder = (color: string) => {
    console.log(color);
    switch (color) {
      case "red":
        return "border-red-400/50";
      case "green":
        return "border-green-400/50";
      case "blue":
        return "border-blue-400/50";
      case "yellow":
        return "border-yellow-400/50";
      case "purple":
        return "border-purple-400/50";
      default:
        return "border-transparent";
    }
  };

  const setButtonColor = (color: string) => {
    console.log(color);
    switch (color) {
      case "red":
        return "bg-red-400/50";
      case "green":
        return "bg-green-400/50";
      case "blue":
        return "bg-blue-400/50";
      case "yellow":
        return "bg-yellow-400/50";
      case "purple":
        return "bg-purple-400/50";
      default:
        return "border-transparent";
    }
  };

  return (
    <div className="flex w-full p-10">
      <div className="flex justify-start items-center gap-x-10 gap-y-5 flex-wrap">
        {habits.map((habit, index) => (
          <div
            className={cn(
              "flex flex-col border-1 rounded-md hover:scale-102 shadow-md px-5 py-5 gap-5 sm:w-[200px] items-end justify-between transition-all duration-150 ease-in-out flex-wrap",
              setBgColor(habit.color)
            )}
            key={index}
          >
            <div className="w-full flex items-center justify-between">
              <span className="text-lg font-extrabold">{habit.habit_name}</span>
              <div className="delete">
                <IconTrashFilled
                  size={16}
                  className="hover:scale-110 transition-all duration-150 ease-in-out cursor-pointer hover:text-red-500 focus:not-enabled:"
                  onClick={() => {
                    deleteHabit(habit);
                  }}
                />
              </div>
            </div>
            <div className="flex ">
              <button
                className={cn(
                  "border-1 p-2 rounded-md shadow-md text-sm font-bold hover:scale-101 transition-all duration-150 ease-in-out cursor-pointer flex items-center justify-center gap-3",
                  setButtonBorder(habit.color),
                  setButtonColor(habit.color)
                )}
                id={"index"}
                onClick={() => {
                  AddLog(habit);
                }}
              >
                <IconPlus size={16} />
                Add log
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
