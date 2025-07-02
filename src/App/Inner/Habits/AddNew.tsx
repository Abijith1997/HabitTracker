import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { User } from "@supabase/supabase-js";
import { addHabitToDB } from "../../../store/habitSlice";
import { type AppDispatch } from "../../../store/store";
import { cn } from "../../../lib/utils";

export const AddNew = ({
  user,
  setShouldRefetch,
  setIsOpen,
}: {
  user: User | null;
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [color, setColor] = useState<string>("");

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

  useEffect(() => {
    switch (selectedColor) {
      case "bg-red-500":
        setColor("red");
        break;
      case "bg-green-500":
        setColor("green");
        break;
      case "bg-blue-500":
        setColor("blue");
        break;
      case "bg-yellow-500":
        setColor("yellow");
        break;
      case "bg-purple-500":
        setColor("purple");
        break;
      default:
        setColor("");
        break;
    }
  });

  const addHabit = async () => {
    const habitName = inputRef.current?.value || "";

    if (!habitName || !selectedColor) {
      return;
    }

    const newHabit = {
      uid: user?.id ?? null,
      habit_name: habitName,
      color: color,
      created_at: new Date().toISOString(),
    };

    try {
      if (user) {
        // ✅ Save to Supabase if logged in
        const result = await dispatch(addHabitToDB(newHabit)).unwrap();
        console.log("✅ Habit added to Supabase:", result.payload);
      } else {
        const localHabits = JSON.parse(
          localStorage.getItem("guest_habits") || "[]"
        );
        localStorage.setItem(
          "guest_habits",
          JSON.stringify([...localHabits, newHabit])
        );
        console.log("✅ Habit added to localStorage");
      }
      setShouldRefetch((prev) => !prev);
      setIsOpen(false);
      inputRef.current!.value = "";
      setSelectedColor("");
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
