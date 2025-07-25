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
  user: User | null;
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
    const today = new Date().toISOString().split("T")[0];

    const newLog = {
      uid: user?.id ?? null,
      habit_name: habit.habit_name,
      log_date: today,
      created_at: new Date().toISOString(),
      color: habit.color,
    };

    if (user) {
      // ✅ Authenticated: log to Supabase
      dispatch(addHabitToDB(newLog))
        .unwrap()
        .then((res) => {
          console.log("✅ Log added to Supabase:", res);
          setShouldRefetch((prev) => !prev);
        })
        .catch((err) => {
          console.error("❌ Failed to add log:", err);
        });
    } else {
      // ✅ Guest: log to localStorage
      try {
        const guestLogs = JSON.parse(
          localStorage.getItem("guest_habits") || "[]"
        );

        const updatedLogs = [...guestLogs, newLog];

        localStorage.setItem("guest_habits", JSON.stringify(updatedLogs));
        console.log("✅ Log added to localStorage");

        setShouldRefetch((prev) => !prev);
      } catch (err) {
        console.error("❌ Failed to save log locally:", err);
      }
    }
  };

  const deleteHabit = (habit: habitProps) => {
    if (user) {
      // ✅ Authenticated user: delete from Supabase
      dispatch(deleteHabitFromDB(habit))
        .unwrap()
        .then((res) => {
          console.log("✅ Habit deleted from Supabase:", res);
          setShouldRefetch((prev) => !prev);
        })
        .catch((err) => {
          console.error("❌ Failed to delete habit:", err);
        });
    } else {
      // ✅ Guest: delete from localStorage
      try {
        const guestHabits = JSON.parse(
          localStorage.getItem("guest_habits") || "[]"
        );

        // Remove matching habit by name
        const updatedHabits = guestHabits.filter(
          (h: habitProps) => h.habit_name !== habit.habit_name
        );

        localStorage.setItem("guest_habits", JSON.stringify(updatedHabits));

        console.log("✅ Habit deleted from localStorage");
        setShouldRefetch((prev) => !prev);
      } catch (err) {
        console.error("❌ Failed to delete habit locally:", err);
      }
    }
  };

  const setBgColor = (color: string) => {
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
    <div className="flex w-full sm:p-10 p-2 mb-3">
      <div className="flex justify-start items-center sm:gap-x-10 gap-2 sm:gap-y-5 flex-wrap">
        {habits.map((habit, index) => (
          <div
            className={cn(
              "flex sm:flex-col sm:h-auto flex-row-reverse border-1 rounded-md hover:scale-102 shadow-md px-2 w-full sm:px-5 py-2 sm:py-5 gap-5 h-[10] sm:w-[200px] sm:items-end justify-between transition-all duration-150 ease-in-out flex-wrap items-center",
              setBgColor(habit.color)
            )}
            key={index}
          >
            <div className="flex sm:w-full sm:flex items-center justify-between">
              <span className="hidden sm:flex text-sm sm:text-lg font-extrabold">
                {habit.habit_name}
              </span>
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
            <div className="flex">
              <button
                className={cn(
                  "border-1 p-2 rounded-md shadow-md text-xs sm:text-sm font-bold hover:scale-101 transition-all duration-150 ease-in-out cursor-pointer flex items-center justify-center sm:gap-3 gap-1",
                  setButtonBorder(habit.color),
                  setButtonColor(habit.color)
                )}
                id={"index"}
                onClick={() => {
                  AddLog(habit);
                }}
              >
                <IconPlus size={16} />
                <span className="text-xs sm:text-sm font-bold hidden sm:flex">
                  Add log
                </span>
                <span className="text-xs sm:text-sm font-bold flex sm:hidden">
                  {habit.habit_name}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
