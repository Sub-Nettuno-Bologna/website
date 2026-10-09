/** Sanity may contain Italian mobile numbers without their country code. */
export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  let digits = phoneNumber.replace(/\D/g, "");
  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  } else if (!phoneNumber.trim().startsWith("+") && /^3\d{9}$/.test(digits)) {
    digits = `39${digits}`;
  }

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
