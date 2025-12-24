import { DEFAULT_CURRENCY, DEFAULT_LOCALE, DATE_FORMATS } from "@/constants";

export function formatDate(
  dateInput: string | Date,
  locale: string = DEFAULT_LOCALE
): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(locale, DATE_FORMATS.long);
}

export function formatDateTime(
  dateInput: string | Date,
  locale: string = DEFAULT_LOCALE
): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(locale, DATE_FORMATS.longWithTime);
}

export function formatPriceEUR(price?: number): string {
  if (!price || price === 0) return "Gratuito";
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency: DEFAULT_CURRENCY,
  }).format(price);
}

export function toPascalCase(value: string): string {
  return value.replace(/(^|-)([a-z])/g, (_, __, letter: string) =>
    letter.toUpperCase()
  );
}

export function isPast(dateInput: string | Date): boolean {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return false;
  return date.getTime() < Date.now();
}

export function isRegistrationClosed(options: {
  registrationRequired?: boolean | null;
  registrationDeadline?: string | Date | null;
}): boolean {
  if (!options.registrationRequired) return false;
  if (!options.registrationDeadline) return false;
  return isPast(options.registrationDeadline);
}

const DAY_MAP: Record<string, string> = {
  Monday: "Lun",
  Tuesday: "Mar",
  Wednesday: "Mer",
  Thursday: "Gio",
  Friday: "Ven",
  Saturday: "Sab",
  Sunday: "Dom",
};

const DAY_MAP_FULL: Record<string, string> = {
  Monday: "Lunedì",
  Tuesday: "Martedì",
  Wednesday: "Mercoledì",
  Thursday: "Giovedì",
  Friday: "Venerdì",
  Saturday: "Sabato",
  Sunday: "Domenica",
};

export function mapDayToItalianShort(day: string): string {
  return DAY_MAP[day] || day;
}

export function mapDayToItalianFull(day: string): string {
  return DAY_MAP_FULL[day] || day;
}

type OpeningHour = {
  dayOfWeek?: string[];
  opens?: string;
  closes?: string;
};

export function formatOpeningHoursCompact(
  openingHours?: OpeningHour[]
): string {
  if (!openingHours || openingHours.length === 0) return "";

  // Group by time slots
  const timeSlots = new Map<string, string[]>();
  for (const oh of openingHours) {
    if (!oh.dayOfWeek || oh.dayOfWeek.length === 0 || !oh.opens || !oh.closes) {
      continue;
    }
    const timeKey = `${oh.opens}–${oh.closes}`;
    const days = oh.dayOfWeek.map(mapDayToItalianShort);
    const existing = timeSlots.get(timeKey) || [];
    timeSlots.set(timeKey, [...existing, ...days]);
  }

  // Format as "Lun, Mer 19:00–22:00"
  const parts: string[] = [];
  for (const [time, days] of timeSlots.entries()) {
    parts.push(`${days.join(", ")} ${time}`);
  }

  return parts.join("; ");
}

export function formatOpeningHoursDetailed(
  openingHours?: OpeningHour[]
): Array<{ days: string; time: string }> {
  if (!openingHours || openingHours.length === 0) return [];

  const result: Array<{ days: string; time: string }> = [];
  for (const oh of openingHours) {
    if (!oh.dayOfWeek || oh.dayOfWeek.length === 0 || !oh.opens || !oh.closes) {
      continue;
    }
    const days = oh.dayOfWeek.map(mapDayToItalianFull).join(", ");
    const time = `${oh.opens}–${oh.closes}`;
    result.push({ days, time });
  }

  return result;
}
