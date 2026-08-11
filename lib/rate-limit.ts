/**
 * In-memory sliding-window rate limiter for sensitive API routes.
 * Suitable for single-instance / edge middleware; swap for Upstash Redis in multi-instance prod.
 */

type RateBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateBucket>();

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return {
    success: true,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  };
}

/** Client IP best-effort from common proxy headers. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

const RATE_LIMITED_PATHS: Record<string, { limit: number; windowMs: number }> = {
  "/api/login": { limit: 10, windowMs: 60_000 },
  "/api/register": { limit: 5, windowMs: 60_000 },
  "/api/leads": { limit: 8, windowMs: 60_000 },
  "/api/auth/forgot-password": { limit: 5, windowMs: 60_000 },
};

export function rateLimitForPath(
  pathname: string,
  request: Request
): RateLimitResult | null {
  const rule = RATE_LIMITED_PATHS[pathname];
  if (!rule) return null;
  const ip = getClientIp(request);
  return checkRateLimit(`${pathname}:${ip}`, rule.limit, rule.windowMs);
}
