import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../Components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../Components/ui/tabs";
import { cn } from "../../../lib/utils";
import type { habitProps } from "../Main";
import { CreateTracker } from "./CreateTracker";

interface TrackerTabsProps {
  habits: habitProps[];
}

export const TrackerTabs = ({ habits }: TrackerTabsProps) => {
  const [trackerValue, setTrackerValue] = useState<string>("");

  useEffect(() => {
    if (habits.length > 0 && habits[0]) {
      console.log(habits[0].habit_name);
      setTrackerValue(habits[0].habit_name);
    }
  }, [habits]);

  const setCardBg = (color: string) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640; // Tailwind's `sm` breakpoint

    if (isMobile) {
      return "bg-transparent shadow-none border-none";
    }

    // Desktop fallback
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
  return (
    <div className="min-w-full flex items-center justify-center p-1">
      <div className="flex w-full  flex-col gap-6 bg-red">
        <Tabs
          value={trackerValue}
          onValueChange={setTrackerValue}
          className="w-full"
        >
          <TabsList className="w-full">
            {habits &&
              habits.map((habit) => (
                <TabsTrigger
                  value={habit.habit_name}
                  key={habit.habit_name}
                  onClick={() => setTrackerValue(habit.habit_name)}
                >
                  {habit.habit_name}
                </TabsTrigger>
              ))}
          </TabsList>
          {habits &&
            habits.map((habit) => (
              <TabsContent value={habit.habit_name} key={habit.habit_name}>
                <Card className={cn(setCardBg(habit.color))}>
                  <CardHeader>
                    <CardTitle>{habit.habit_name}</CardTitle>
                    <CardDescription>Track your progress here</CardDescription>
                  </CardHeader>
                  <CardContent className="flex w-full p-0">
                    <div className="flex w-full items-center justify-center gap-3 h-full">
                      <CreateTracker habit={habit} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
        </Tabs>
      </div>
    </div>
  );
};
