import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Habit } from "../types";
import { supabase } from "../supabaseClient";
import type { habitProps } from "../App/Inner/Main";

export interface HabitLog {
  habit_name: string;
  log_date: string;
  color: string;
  id: number;
}

export interface HabitState {
  logs: HabitLog[];
}

const initialState: HabitState = {
  logs: [],
};

export const addHabitToDB = createAsyncThunk(
  "habits/addHabitToDB",
  async (habit: Habit, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("HabitLogs")
      .insert([habit])
      .select();

    if (error) {
      console.error("Error adding habit:", error.message);
      return rejectWithValue(error.message);
    }

    return data[0]; // return inserted habit
  }
);

export const deleteHabitFromDB = createAsyncThunk(
  "habits/deleteHabitFromBD",
  async (habit: habitProps, { rejectWithValue }) => {
    const { error } = await supabase
      .from("HabitLogs")
      .delete()
      .eq("habit_name", habit.habit_name);
    if (error) {
      console.error("Error while deleting habit:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteLogFromDB = createAsyncThunk(
  "habits/deleteLogFromDB",
  async (habit: HabitLog, { rejectWithValue }) => {
    const { error } = await supabase
      .from("HabitLogs")
      .delete()
      .eq("id", habit.id);
    if (error) {
      console.error("Error while deleting habit:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<HabitLog>) => {
      const exists = state.logs.some(
        (log) =>
          log.habit_name === action.payload.habit_name &&
          log.log_date === action.payload.log_date
      );
      if (!exists) {
        state.logs.push(action.payload);
      }
    },
    removeLog: (state, action: PayloadAction<HabitLog>) => {
      state.logs = state.logs.filter(
        (log) =>
          !(
            log.habit_name === action.payload.habit_name &&
            log.log_date === action.payload.log_date
          )
      );
    },

    setLogs: (state, action: PayloadAction<HabitLog[]>) => {
      state.logs = action.payload;
    },
  },
});

export const groupByHabit = (logs: HabitLog[]) => {
  const result: Record<string, string[]> = {};
  for (const log of logs) {
    if (!result[log.habit_name]) result[log.habit_name] = [];
    result[log.habit_name].push(log.log_date);
  }
  return result;
};

export const { addLog, removeLog, setLogs } = habitSlice.actions;
export default habitSlice.reducer;
