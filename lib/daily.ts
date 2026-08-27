/**
 * Daily.co REST helpers — room provisioning + meeting tokens.
 * Recording is server-driven (cloud); clients must never expose record controls.
 */

import crypto from "crypto";

const DAILY_API_BASE = "https://api.daily.co/v1";

export type DailyRoom = {
  id: string;
  name: string;
  url: string;
  privacy: string;
};

export type DailyAccessLink = {
  download_link: string;
  expires: number;
};

function getDailyApiKey(): string {
  const key = process.env.DAILY_API_KEY;
  if (!key) {
    throw new Error("DAILY_API_KEY environment variable is not set");
  }
  return key;
}

/** Stable Daily room name derived from our Lesson id (used by webhooks). */
export function dailyRoomNameForLesson(lessonId: string): string {
  return `lesson-${lessonId}`;
}

/** Extract lesson UUID from a Daily room name like `lesson-<uuid>`. */
export function lessonIdFromDailyRoomName(roomName: string): string | null {
  const prefix = "lesson-";
  if (!roomName.startsWith(prefix)) return null;
  const id = roomName.slice(prefix.length).trim();
  return id.length > 0 ? id : null;
}

export function roomNameFromDailyUrl(roomUrl: string): string | null {
  try {
    const pathname = new URL(roomUrl).pathname;
    const name = pathname.replace(/^\//, "").split("/")[0];
    return name || null;
  } catch {
    return null;
  }
}

async function dailyFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${DAILY_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getDailyApiKey()}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail =
      typeof body === "object" && body && "error" in body
        ? JSON.stringify(body)
        : response.statusText;
    throw new Error(`Daily API ${path} failed (${response.status}): ${detail}`);
  }

  return body as T;
}

/**
 * Create a private Daily room for a lesson.
 *
 * Room properties are kept to the intersection supported on all Daily plans
 * (including Free): `exp`, `eject_at_room_exp`, `enable_chat` (in-app chat is
 * handled by Stream), and `enable_screenshare`.
 *
 * `exp` is computed as `scheduledAt + durationMinutes + 10%` by default:
 * e.g. a 60-minute lesson gets 60 + 6 minutes = 66 total minutes of room
 * availability from the scheduled start. `eject_at_room_exp: true` makes Daily
 * kick everyone out and close the room automatically when `exp` passes.
 *
 * Cloud recording is a paid feature — it is only sent when the plan/organization
 * opts in via `DAILY_ENABLE_CLOUD_RECORDING=true`. Otherwise the property is
 * omitted entirely so Free accounts are not blocked from creating rooms.
 */
export async function createDailyRoom(
  lessonId: string,
  options: {
    /** Lesson scheduled start. When absent, falls back to Date.now(). */
    scheduledAt?: Date;
    /** Planned lesson duration in minutes. Defaults to 60. */
    durationMinutes?: number;
    /** Explicit expiry override — takes precedence over duration-based calc. */
    expiresAt?: Date;
  } = {}
): Promise<DailyRoom> {
  const name = dailyRoomNameForLesson(lessonId);

  const scheduledAt = options.scheduledAt ?? new Date();

  // The room `exp` (Unix seconds) must ALWAYS be in the future — at least 4
  // hours out — so joining (or re-provisioning) an old test lesson never throws
  // a Daily 400. `exp = max(now + 4h, scheduledAt + 4h)`.
  const MIN_EXP_SECONDS = 4 * 60 * 60; // 4 hours
  const minExp = Math.floor(Date.now() / 1000) + MIN_EXP_SECONDS;
  const lessonExp = Math.floor(scheduledAt.getTime() / 1000) + MIN_EXP_SECONDS;
  const exp = Math.max(minExp, lessonExp);

  const properties: Record<string, unknown> = {
    exp,
    eject_at_room_exp: true,
    enable_chat: false,
    enable_screenshare: true,
  };

  if (process.env.DAILY_ENABLE_CLOUD_RECORDING === "true") {
    properties.enable_recording = "cloud";
  }

  const room = await dailyFetch<DailyRoom>("/rooms", {
    method: "POST",
    body: JSON.stringify({
      name,
      privacy: "private",
      properties,
    }),
  });

  return {
    id: room.id,
    name: room.name,
    url: room.url,
    privacy: room.privacy,
  };
}

/**
 * Meeting token for a participant.
 * - Teacher / owner: is_owner + start_cloud_recording (background auto-record)
 * - Student: join-only token (no recording permissions / UI)
 *
 * When `scheduledAt` is provided, the token is bound to the lesson window:
 * - `nbf` (join opens): scheduledAt − 10 minutes (Unix seconds).
 * - `bufferMinutes`: ceil(10% of duration) grace period.
 * - `exp` (full expiry): scheduledAt + (durationMinutes + bufferMinutes) minutes.
 * No arbitrary 2-hour cap — supports double/triple lessons (120/180 min).
 */
export async function generateDailyToken(
  roomName: string,
  isOwner: boolean,
  userId: string,
  options: {
    /** Lesson scheduled start. When provided, the token is time-boxed to the lesson window. */
    scheduledAt?: Date;
    /** Planned lesson duration in minutes. Defaults to 60. */
    durationMinutes?: number;
  } = {}
): Promise<string> {
  const DEFAULT_DURATION_MINUTES = 60;
  const durationMinutes = options.durationMinutes ?? DEFAULT_DURATION_MINUTES;
  const bufferMinutes = Math.ceil(durationMinutes * 0.1);

  const properties: Record<string, unknown> = {
    room_name: roomName,
    user_id: userId,
    is_owner: isOwner,
    // Auto cloud recording starts when the owner (teacher) joins — no client record button.
    ...(isOwner ? { start_cloud_recording: true, enable_recording: "cloud" } : {}),
  };

  if (options.scheduledAt) {
    const scheduledAt = options.scheduledAt;
    const nbf = new Date(scheduledAt.getTime() - 10 * 60 * 1000);
    const exp = new Date(
      scheduledAt.getTime() + (durationMinutes + bufferMinutes) * 60 * 1000
    );

    properties.nbf = Math.floor(nbf.getTime() / 1000);
    properties.exp = Math.floor(exp.getTime() / 1000);
  }

  const result = await dailyFetch<{ token: string }>("/meeting-tokens", {
    method: "POST",
    body: JSON.stringify({
      properties,
    }),
  });

  return result.token;
}

/** Temporary signed download URL for a finished cloud recording. */
export async function getRecordingDownloadUrl(
  recordingId: string
): Promise<string> {
  const result = await dailyFetch<DailyAccessLink>(
    `/recordings/${encodeURIComponent(recordingId)}/access-link`
  );
  return result.download_link;
}

/**
 * Verify Daily.co webhook HMAC signature.
 * Daily signs: `${X-Webhook-Timestamp}.${rawBody}` with HMAC-SHA256
 * using a base64-decoded secret (`DAILY_WEBHOOK_SECRET`), digest base64.
 * @see https://docs.daily.co/reference/rest-api/webhooks
 */
export function verifyDailyWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  timestampHeader: string | null,
  secret: string = process.env.DAILY_WEBHOOK_SECRET ?? ""
): boolean {
  if (!secret || !signatureHeader || !timestampHeader) {
    return false;
  }

  try {
    const base64DecodedSecret = Buffer.from(secret, "base64");
    const signedPayload = `${timestampHeader}.${rawBody}`;
    const computed = crypto
      .createHmac("sha256", base64DecodedSecret)
      .update(signedPayload)
      .digest("base64");

    const expected = Buffer.from(computed);
    const received = Buffer.from(signatureHeader);

    if (expected.length !== received.length) {
      return false;
    }

    return crypto.timingSafeEqual(expected, received);
  } catch {
    return false;
  }
}

/** Delete a Daily room (compensation when booking fails after room create). */
export async function deleteDailyRoom(roomName: string): Promise<void> {
  await dailyFetch(`/rooms/${encodeURIComponent(roomName)}`, {
    method: "DELETE",
  });
}

/**
 * Ensure an active Daily room exists before the lesson page returns its URL.
 *
 * If the lesson has no room yet — or its stored room no longer exists on Daily
 * (e.g. it expired during a retry / dev restart) — this re-provisions one via
 * the REST API and persists it. On any failure (missing key, network, API error)
 * it returns `null` so the client renders a clean "test environment" placeholder
 * instead of a red screen.
 */
export async function ensureDailyRoom(
  lessonId: string,
  options: {
    scheduledAt?: Date;
    durationMinutes?: number;
    existingRoomUrl?: string | null;
  } = {}
): Promise<string | null> {
  if (!hasDailyApiKey()) return null;

  // Nothing saved yet — create a fresh room.
  if (!options.existingRoomUrl) {
    try {
      const room = await createDailyRoom(lessonId, {
        scheduledAt: options.scheduledAt,
        durationMinutes: options.durationMinutes,
      });
      return room.url;
    } catch (error) {
      console.error(`Failed to create Daily room for lesson ${lessonId}:`, error);
      return null;
    }
  }

  const roomName = roomNameFromDailyUrl(options.existingRoomUrl);
  if (!roomName) return null;

  try {
    // Validate that the stored room still resolves on the API.
    const existing = await dailyFetch<DailyRoom>(
      `/rooms/${encodeURIComponent(roomName)}`
    );
    return existing.url ?? options.existingRoomUrl;
  } catch {
    // Room is gone (expired/deleted) — re-provision it under the same name.
    try {
      const room = await createDailyRoom(lessonId, {
        scheduledAt: options.scheduledAt,
        durationMinutes: options.durationMinutes,
      });
      return room.url;
    } catch (error) {
      console.error(
        `Failed to re-provision Daily room for lesson ${lessonId}:`,
        error
      );
      return null;
    }
  }
}

/**
 * Whether a Daily room video client can be mounted. When the API key is missing
 * in development, the caller renders a clean "test environment" placeholder
 * instead of a broken red error surface.
 */
export function hasDailyApiKey(): boolean {
  return Boolean(process.env.DAILY_API_KEY);
}
