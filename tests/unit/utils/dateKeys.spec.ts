import { describe, expect, it, vi } from "vitest";
import { localDateKey, offsetKey, todayKey } from "~/utils/dateKeys";

describe("dateKeys", () => {
  it("formats local date as YYYY-MM-DD", () => {
    const d = new Date(2026, 3, 10);
    expect(localDateKey(d)).toBe("2026-04-10");
  });

  it("returns todayKey in local timezone format", () => {
    vi.setSystemTime(new Date(2026, 3, 10, 8, 30, 0));
    expect(todayKey()).toBe("2026-04-10");
  });

  it("returns offsetKey from current date", () => {
    vi.setSystemTime(new Date(2026, 3, 10, 8, 30, 0));
    expect(offsetKey(-1)).toBe("2026-04-09");
    expect(offsetKey(1)).toBe("2026-04-11");
  });
});
