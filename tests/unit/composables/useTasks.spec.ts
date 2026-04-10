import { beforeEach, describe, expect, it, vi } from "vitest";
import { useTasks } from "~/composables/useTasks";

describe("useTasks", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 3, 10, 9, 0, 0));
    localStorage.clear();
    (globalThis as any).__resetNuxtState();

    const uuid = vi.spyOn(globalThis.crypto, "randomUUID");
    uuid.mockReturnValue("task-id-1");
  });

  it("adds a task for today and persists it", () => {
    const { addTask, tasks } = useTasks();
    addTask("  Finish report  ", "today");

    expect(tasks.value).toHaveLength(1);
    expect(tasks.value[0]).toMatchObject({
      id: "task-id-1",
      title: "Finish report",
      day: "today",
      status: "pending",
      dateKey: "2026-04-10",
    });
  });

  it("rejects blank and too-long titles", () => {
    const { addTask, tasks } = useTasks();
    addTask("   ", "today");
    addTask("x".repeat(501), "today");
    expect(tasks.value).toHaveLength(0);
  });

  it("toggles status, edits title, and deletes task", () => {
    const { addTask, toggleTask, editTask, deleteTask, tasks } = useTasks();
    addTask("Task A", "today");

    toggleTask("task-id-1");
    expect(tasks.value[0].status).toBe("completed");

    editTask("task-id-1", "Task A edited");
    expect(tasks.value[0].title).toBe("Task A edited");

    deleteTask("task-id-1");
    expect(tasks.value).toHaveLength(0);
  });

  it("rolls over pending tasks to current day when needed", () => {
    const seed = [
      {
        id: "a",
        title: "Old today",
        day: "today",
        status: "pending",
        dateKey: "2026-04-09",
        createdAt: 1,
      },
      {
        id: "b",
        title: "Tomorrow due now",
        day: "tomorrow",
        status: "pending",
        dateKey: "2026-04-10",
        createdAt: 2,
      },
      {
        id: "c",
        title: "Already done",
        day: "today",
        status: "completed",
        dateKey: "2026-04-09",
        createdAt: 3,
      },
    ];

    const { tasks, rollover } = useTasks();
    tasks.value = seed as any;
    rollover();

    expect(tasks.value.find((t) => t.id === "a")?.dateKey).toBe("2026-04-10");
    expect(tasks.value.find((t) => t.id === "b")?.day).toBe("today");
    expect(tasks.value.find((t) => t.id === "b")?.dateKey).toBe("2026-04-10");
    expect(tasks.value.find((t) => t.id === "c")?.dateKey).toBe("2026-04-09");
  });

  it("computes tasksByDay and progressByDay", () => {
    const seed = [
      {
        id: "y1",
        title: "Yesterday carry",
        day: "today",
        status: "completed",
        dateKey: "2026-04-09",
        createdAt: 1,
      },
      {
        id: "t1",
        title: "Today done",
        day: "today",
        status: "completed",
        dateKey: "2026-04-10",
        createdAt: 2,
      },
      {
        id: "t2",
        title: "Today pending",
        day: "today",
        status: "pending",
        dateKey: "2026-04-10",
        createdAt: 3,
      },
      {
        id: "tm1",
        title: "Tomorrow pending",
        day: "tomorrow",
        status: "pending",
        dateKey: "2026-04-11",
        createdAt: 4,
      },
    ];

    const { tasks, tasksByDay, progressByDay } = useTasks();
    tasks.value = seed as any;

    expect(tasksByDay.value.yesterday).toHaveLength(1);
    expect(tasksByDay.value.today).toHaveLength(2);
    expect(tasksByDay.value.tomorrow).toHaveLength(1);

    expect(progressByDay.value.yesterday).toBe(100);
    expect(progressByDay.value.today).toBe(50);
    expect(progressByDay.value.tomorrow).toBe(0);
  });
});
