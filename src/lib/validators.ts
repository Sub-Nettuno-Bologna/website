import { EMAIL_REGEX, SLUG_REGEX } from "@/constants";

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function isValidSlug(slug: string): boolean {
  return SLUG_REGEX.test(slug);
}
