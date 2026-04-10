/**
 * Returns today's date as YYYY-MM-DD (local timezone)
 */
export function todayKey(): string {
  const d = new Date();
  return localDateKey(d);
}

/**
 * Returns a date offset from today as YYYY-MM-DD (local timezone)
 */
export function offsetKey(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return localDateKey(d);
}

/**
 * Formats a Date to YYYY-MM-DD in local timezone (avoids UTC shift issues)
 */
export function localDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
