import type { DayNote } from "~/types/diary";

const STORAGE_KEY = "diary_notes";

export const useDiaryNote = () => {
  const notes = useState<Record<string, DayNote>>("diary_notes", () => {
    if (import.meta.client) {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
      } catch {
        return {};
      }
    }
    return {};
  });

  const persist = () => {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes.value));
    }
  };

  const getNote = (dateKey: string): string => {
    return notes.value[dateKey]?.note ?? "";
  };

  const saveNote = (dateKey: string, note: string) => {
    notes.value[dateKey] = { dateKey, note, updatedAt: Date.now() };
    persist();
  };

  return { getNote, saveNote };
};
