import { useEffect, useState } from "react";
import { Active } from "./Habits/Active";
import { Create } from "./Habits/Create";
import { supabase } from "../../supabaseClient";
import type { User } from "@supabase/supabase-js";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setLogs } from "../../store/habitSlice";
import { Tracker } from "./TrackerComponents/Tracker";

interface MainProps {
  user: User;
}

export interface habitProps {
  habit_name: string;
  color: string;
  logs: string[];
}

export const Main = ({ user }: MainProps) => {
  const habitLogs = useSelector((state: RootState) => state.habits.logs);
  const [habits, setHabits] = useState<habitProps[]>([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const dispatch = useDispatch();
  const [userHasHabits, setUserHasHabits] = useState<boolean>(false);

  useEffect(() => {
    console.log(shouldRefetch, "Should Refetch");
    const fetchUserHabits = async () => {
      const { data, error } = await supabase
        .from("HabitLogs")
        .select()
        .eq("uid", user.id); // replace "user_id" with your actual column name

      if (error) {
        console.error("Error fetching habits:", error.message);
      } else {
        dispatch(setLogs(data));
        setUserHasHabits(data.length > 0);
      }
    };
    fetchUserHabits();
  }, [shouldRefetch]);

  useEffect(() => {
    if (habitLogs.length > 0) {
      const habitMap = new Map<string, { color: string; logs: string[] }>();

      habitLogs.forEach((log) => {
        const existing = habitMap.get(log.habit_name);
        if (existing) {
          existing.logs.push(log.log_date);
        } else {
          habitMap.set(log.habit_name, {
            color: log.color,
            logs: [log.log_date],
          });
        }
      });

      const uniqueHabits: habitProps[] = Array.from(
        habitMap,
        ([habit_name, { color, logs }]) => ({
          habit_name,
          color,
          logs,
        })
      );

      setHabits(uniqueHabits);
    }
  }, [habitLogs, userHasHabits]);

  useEffect(() => {
    console.log(habits, "Habits");
  }, [habits]);

  return (
    <div className="flex justify-start  h-screen w-screen sm:p-25 pt-5 flex-col items-start">
      <Create
        user={user}
        userHasHabits={userHasHabits}
        setShouldRefetch={setShouldRefetch}
      />
      <Active
        userHasHabits={userHasHabits}
        habits={habits}
        user={user}
        setShouldRefetch={setShouldRefetch}
      />
      <Tracker habits={habits} />
    </div>
  );
};
