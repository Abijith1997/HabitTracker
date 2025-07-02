export interface Habit {
  id?: string;
  uid: string | null;
  habit_name: string;
  color: string;
  created_at?: string;
  logs?: string;
}
