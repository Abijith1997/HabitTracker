import type { habitProps } from "../Main";
import { TrackerTabs } from "./Tabs";

interface TrackerProps {
  habits: habitProps[];
}

export const Tracker = ({ habits }: TrackerProps) => {
  return (
    <div className="w-full ">
      <TrackerTabs habits={habits} />
    </div>
  );
};
