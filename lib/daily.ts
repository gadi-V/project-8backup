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
 * Create a private Daily room for a lesson with cloud recording enabled.
 * Auto-start happens via the teacher (owner) meeting token (`start_cloud_recording`).
 *
 * Note: Daily expects `enable_recording: "cloud"` on the room (not
 * `auto_start_recording: "cloud"` — that value is invalid on the REST API).
 */
export async function createDailyRoom(lessonId: string): Promise<DailyRoom> {
  const name = dailyRoomNameForLesson(lessonId);

  const room = await dailyFetch<DailyRoom>("/rooms", {
    method: "POST",
    body: JSON.stringify({
      name,
      privacy: "private",
      properties: {
        // Cloud recording enabled at room level; auto-start via owner meeting token.
        enable_recording: "cloud",
        eject_at_room_exp: true,
        enable_chat: false,
      },
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
