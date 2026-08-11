/**
 * Shared PII censorship for in-app chat (client + server alignment).
 * Never expose phone numbers or emails between Teachers and Students.
 */

export const PHONE_REGEX =
  /(?:05\d[\s-]*\d{3}[\s-]*\d{4})|(?:0\d[\s-]*\d{3}[\s-]*\d{4})/g;

export const EMAIL_REGEX =
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/** Patterns kept short enough for Stream regex blocklists (max ~60 chars each). */
export const STREAM_PHONE_BLOCK_PATTERNS = [
  "05\\d[\\s-]*\\d{3}[\\s-]*\\d{4}",
  "0\\d[\\s-]*\\d{3}[\\s-]*\\d{4}",
];

export const STREAM_EMAIL_BLOCK_PATTERNS = [
  "[\\w.+-]+@[\\w.-]+\\.[A-Za-z]{2,}",
];

export function censorChatText(text: string): string {
  return text
    .replace(PHONE_REGEX, "[צונזר מספר טלפון]")
    .replace(EMAIL_REGEX, "[צונזר אימייל]");
}
