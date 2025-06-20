import type { User } from "@supabase/supabase-js";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../store/store";
import { addHabitToDB } from "../../../store/habitSlice";
import type { habitProps } from "../Main";

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
  return (
    <div className="flex w-full p-10">
      <div className="flex flex-1 justify-between items-center gap-2 ">
        {habits.map((habit, index) => (
          <div
            className="flex border-1 p-2 rounded-md hover:scale-102 shadow-md  gap-2 w-[300px] items-center justify-between transition-all duration-150 ease-in-out flex-wrap"
            key={index}
          >
            <span className="text-lg font-extrabold">{habit.habit_name}</span>
            <div className="flex ">
              <button
                className={`border-1 ${habit.color} bg-gray-600 p-2 rounded-md shadow-md !text-white text-md font-bold hover:scale-101 transition-all duration-150 ease-in-out cursor-pointer`}
                id={"index"}
                onClick={() => {
                  AddLog(habit);
                }}
              >
                Add log
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
