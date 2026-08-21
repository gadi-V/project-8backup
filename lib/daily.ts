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

  const DEFAULT_DURATION_MINUTES = 60;
  const durationMinutes = options.durationMinutes ?? DEFAULT_DURATION_MINUTES;
  const scheduledAt = options.scheduledAt ?? new Date();

  // Total room lifetime = lesson duration + 10% buffer (rounded up to a minute).
  const bufferMinutes = Math.ceil(durationMinutes * 0.1);
  const totalMinutes = durationMinutes + bufferMinutes;

  const expiresAt =
    options.expiresAt ??
    new Date(scheduledAt.getTime() + totalMinutes * 60 * 1000);

  const properties: Record<string, unknown> = {
    exp: Math.floor(expiresAt.getTime() / 1000),
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
 */
export async function generateDailyToken(
  roomName: string,
  isOwner: boolean,
  userId: string
): Promise<string> {
  const result = await dailyFetch<{ token: string }>("/meeting-tokens", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        room_name: roomName,
        user_id: userId,
        is_owner: isOwner,
        // Auto cloud recording starts when the owner (teacher) joins — no client record button.
        ...(isOwner ? { start_cloud_recording: true, enable_recording: "cloud" } : {}),
      },
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
