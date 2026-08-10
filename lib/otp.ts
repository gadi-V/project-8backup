/**
 * Phone + OTP helpers for password reset (mock SMS).
 */

export function normalizePhone(raw: string): string {
  return raw.replace(/[\s\-()]/g, "").trim();
}

export function generateOtpCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
export const OTP_MAX_ATTEMPTS = 5;

/** Mock SMS provider — prints OTP to the server terminal for local testing */
export function sendMockSmsOtp(phone: string, code: string): void {
  console.log("====================================================");
  console.log(`[MOCK SMS] Password reset OTP for ${phone}: ${code}`);
  console.log(`[MOCK SMS] Valid for 10 minutes`);
  console.log("====================================================");
}
