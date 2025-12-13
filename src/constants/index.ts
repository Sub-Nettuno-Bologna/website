export const DEFAULT_LOCALE = "it-IT" as const;
export const DEFAULT_CURRENCY = "EUR" as const;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const DATE_FORMATS = {
  long: { year: "numeric", month: "long", day: "numeric" } as const,
  longWithTime: {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  } as const,
};
