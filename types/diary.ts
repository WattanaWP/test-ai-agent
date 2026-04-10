export type DaySlot = "yesterday" | "today" | "tomorrow";
export type TaskStatus = "pending" | "completed";

export interface Task {
  id: string;
  title: string;
  day: DaySlot;
  status: TaskStatus;
  dateKey: string; // YYYY-MM-DD of the logical "today" when task was created
  createdAt: number; // timestamp
}

export interface DayNote {
  dateKey: string; // YYYY-MM-DD
  note: string;
  updatedAt: number;
}
