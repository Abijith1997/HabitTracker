import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { User } from "@supabase/supabase-js";
import { addHabitToDB } from "../../../store/habitSlice";
import { type AppDispatch } from "../../../store/store";
import { cn } from "../../../lib/utils";

export const AddNew = ({ user }: { user: User }) => {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];

  const changeColor = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor("");
      return;
    }
    setSelectedColor(color);
  };

  const addHabit = async () => {
    const habitName = inputRef.current?.value || "";

    if (!habitName || !selectedColor) {
      return;
    }

    const newHabit = {
      uid: user.id,
      habit_name: habitName,
      color: selectedColor,
      created_at: new Date().toISOString(),
    };

    try {
      const result = await dispatch(addHabitToDB(newHabit));

      if (addHabitToDB.fulfilled.match(result)) {
        console.log("✅ Habit added:", result.payload);
      } else {
        console.error("❌ Failed to add habit:", result.payload);
      }
    } catch (error) {
      console.error("❌ Unexpected error adding habit:", error);
    }
  };

  return (
    <div className="border border-black/20 rounded-md shadow-md p-5 flex flex-col items-center justify-center gap-5">
      <input
        ref={inputRef}
        type="text"
        id="new-habit-name"
        placeholder="Enter new habit"
        className="border p-2 rounded-md w-[90%] bg-gray-50"
      />

      <div className="colors flex gap-2 w-[90%] items-center p-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className={cn(
              "rounded-full w-7 h-7 hover:cursor-pointer hover:border-1 border-1 hover:border-gray-700 hover:scale-110 border-black/20 transition-all duration-150 ease-in-out",
              color,
              selectedColor === color && "border-2 border-black w-8 h-8"
            )}
            onClick={() => changeColor(color)}
          />
        ))}
      </div>
      <div className="w-full flex items-center justify-end">
        <button
          className="bg-black/80 text-white rounded-md shadow-md px-3 py-1 hover:cursor-pointer  hover:bg-black transition-all duration-150 ease-in-out"
          onClick={addHabit}
        >
          Add Habit
        </button>
      </div>
    </div>
  );
};
