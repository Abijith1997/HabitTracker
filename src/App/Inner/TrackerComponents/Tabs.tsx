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
  const setCardBg = (color: string) => {
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
      <div className="flex w-full  flex-col gap-6 ">
        <Tabs defaultValue="account">
          <TabsList>
            {habits &&
              habits.map((habit) => (
                <TabsTrigger value={habit.habit_name} key={habit.habit_name}>
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
                    <div className="flex w-full items-center justify-center gap-3">
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
