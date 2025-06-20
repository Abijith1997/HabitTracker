import type { habitProps } from "../Main";
import { CreateTracker } from "./CreateTracker";

interface TrackerProps {
  habits: habitProps[];
}

export const Tracker = ({ habits }: TrackerProps) => {
  return (
    <div className="w-full">
      {habits.map((habit) => (
        <div
          className="w-full overflow-x-auto gap-1 shadow-md p-5 flex items-center justify-center tracker rounded-md"
          key={habit.habit_name}
        >
          <CreateTracker habit={habit} />
        </div>
      ))}
    </div>
  );
};
