import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDiaryNote } from "~/composables/useDiaryNote";

describe("useDiaryNote", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 3, 10, 9, 0, 0));
    localStorage.clear();
    (globalThis as any).__resetNuxtState();
  });

  it("returns empty note for unknown date", () => {
    const { getNote } = useDiaryNote();
    expect(getNote("2026-04-10")).toBe("");
  });

  it("saves and retrieves note by dateKey", () => {
    const { saveNote, getNote } = useDiaryNote();
    saveNote("2026-04-10", "Write tests");

    expect(getNote("2026-04-10")).toBe("Write tests");
    const { getNote: getAgain } = useDiaryNote();
    expect(getAgain("2026-04-10")).toBe("Write tests");
  });
});
