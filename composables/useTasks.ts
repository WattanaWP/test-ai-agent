import type { Task, DaySlot } from "~/types/diary";
import { todayKey, offsetKey } from "~/utils/dateKeys";

const STORAGE_KEY = "diary_tasks";
const TITLE_MAX_LENGTH = 500;

export const useTasks = () => {
  const tasks = useState<Task[]>("tasks", () => {
    if (import.meta.client) {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Task[];
      } catch {
        return [];
      }
    }
    return [];
  });

  const persist = () => {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value));
    }
  };

  // Auto-rollover:
  // - pending "today" tasks from past days → move to today
  // - pending "tomorrow" tasks whose dateKey is today or past → promote to today
  const rollover = () => {
    const today = todayKey();
    let changed = false;
    tasks.value = tasks.value.map((t) => {
      if (t.day === "today" && t.status === "pending" && t.dateKey !== today) {
        changed = true;
        return { ...t, dateKey: today };
      }
      if (
        t.day === "tomorrow" &&
        t.status === "pending" &&
        t.dateKey <= today
      ) {
        changed = true;
        return { ...t, day: "today" as DaySlot, dateKey: today };
      }
      return t;
    });
    if (changed) persist();
  };

  const tasksByDay = computed(() => {
    const today = todayKey();
    const yesterday = offsetKey(-1);

    return {
      yesterday: tasks.value.filter(
        (t) =>
          (t.day === "yesterday" && t.dateKey === yesterday) ||
          (t.day === "today" && t.dateKey === yesterday),
      ),
      today: tasks.value.filter(
        (t) => t.day === "today" && t.dateKey === today,
      ),
      tomorrow: tasks.value.filter((t) => t.day === "tomorrow"),
    };
  });

  const progressByDay = computed(() => {
    const calc = (list: Task[]) => {
      if (!list.length) return 0;
      return Math.round(
        (list.filter((t) => t.status === "completed").length / list.length) *
          100,
      );
    };
    return {
      yesterday: calc(tasksByDay.value.yesterday),
      today: calc(tasksByDay.value.today),
      tomorrow: calc(tasksByDay.value.tomorrow),
    };
  });

  const addTask = (title: string, day: DaySlot) => {
    const trimmed = title.trim();
    if (!trimmed || trimmed.length > TITLE_MAX_LENGTH) return;
    const dateKey =
      day === "yesterday"
        ? offsetKey(-1)
        : day === "tomorrow"
          ? offsetKey(1)
          : todayKey();
    tasks.value.push({
      id: crypto.randomUUID(),
      title: trimmed,
      day,
      status: "pending",
      dateKey,
      createdAt: Date.now(),
    });
    persist();
  };

  const toggleTask = (id: string) => {
    const task = tasks.value.find((t) => t.id === id);
    if (task) {
      task.status = task.status === "completed" ? "pending" : "completed";
      persist();
    }
  };

  const editTask = (id: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed || trimmed.length > TITLE_MAX_LENGTH) return;
    const task = tasks.value.find((t) => t.id === id);
    if (task) {
      task.title = trimmed;
      persist();
    }
  };

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((t) => t.id !== id);
    persist();
  };

  return {
    tasks,
    tasksByDay,
    progressByDay,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
    rollover,
  };
};
