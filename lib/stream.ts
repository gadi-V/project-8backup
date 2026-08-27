import { StreamChat } from "stream-chat";
import {
  STREAM_EMAIL_BLOCK_PATTERNS,
  STREAM_PHONE_BLOCK_PATTERNS,
} from "./chat-moderation";

const PRIVACY_PHONE_BLOCKLIST = "project8_phone_pii";
const PRIVACY_EMAIL_BLOCKLIST = "project8_email_pii";

let streamClient: StreamChat | null = null;
let moderationReady: Promise<void> | null = null;

function getStreamApiKey(): string {
  const key = process.env.STREAM_API_KEY || process.env.NEXT_PUBLIC_STREAM_API_KEY;
  if (!key) {
    throw new Error(
      "STREAM_API_KEY (or NEXT_PUBLIC_STREAM_API_KEY) environment variable is not set"
    );
  }
  return key;
}

function getStreamApiSecret(): string {
  const secret = process.env.STREAM_API_SECRET;
  if (!secret) {
    throw new Error("STREAM_API_SECRET environment variable is not set");
  }
  return secret;
}

/** Server-side Stream Chat client (API key + secret). Never use the secret in the browser. */
export function getStreamServerClient(): StreamChat {
  if (!streamClient) {
    streamClient = StreamChat.getInstance(getStreamApiKey(), getStreamApiSecret());
  }
  return streamClient;
}

export function streamChannelIdForLesson(lessonId: string): string {
  return `lesson_${lessonId}`;
}

/** Standard user JWT for connecting the browser SDK. */
export function generateStreamToken(userId: string): string {
  return getStreamServerClient().createToken(userId);
}

async function ensureBlockList(
  client: StreamChat,
  name: string,
  words: string[],
  type: "regex"
): Promise<void> {
  try {
    await client.createBlockList({ name, words, type });
  } catch (error: unknown) {
    // Already exists — update words so patterns stay current
    try {
      await client.updateBlockList(name, { words });
    } catch (updateError) {
      console.warn(`Stream blocklist ${name} ensure failed:`, updateError);
    }
  }
}

/**
 * Ensure Stream-side regex blocklists for phone/email (server moderation).
 * Best-effort: failures are logged and do not block channel creation.
 */
export async function ensureStreamPrivacyModeration(): Promise<void> {
  if (!moderationReady) {
    moderationReady = (async () => {
      const client = getStreamServerClient();
      await ensureBlockList(
        client,
        PRIVACY_PHONE_BLOCKLIST,
        STREAM_PHONE_BLOCK_PATTERNS,
        "regex"
      );
      await ensureBlockList(
        client,
        PRIVACY_EMAIL_BLOCKLIST,
        STREAM_EMAIL_BLOCK_PATTERNS,
        "regex"
      );

      try {
        // Attach both privacy blocklists to messaging channels (mask/block PII server-side).
        await client.updateChannelType("messaging", {
          automod: "simple",
          automod_behavior: "flag",
          blocklists: [
            { blocklist: PRIVACY_PHONE_BLOCKLIST, behavior: "block" },
            { blocklist: PRIVACY_EMAIL_BLOCKLIST, behavior: "block" },
          ],
        });
      } catch (error) {
        console.warn("Stream messaging channel-type automod update skipped:", error);
      }
    })().catch((error) => {
      moderationReady = null;
      throw error;
    });
  }

  try {
    await moderationReady;
  } catch (error) {
    console.warn("Stream privacy moderation setup failed:", error);
  }
}

/**
 * Create a private messaging channel limited to the given members
 * (lesson student, teacher, and manager(s) only).
 */
export async function createStreamChannel(
  lessonId: string,
  memberIds: string[]
): Promise<string> {
  const uniqueMembers = [...new Set(memberIds.filter(Boolean))];
  if (uniqueMembers.length < 2) {
    throw new Error("createStreamChannel requires at least two member ids");
  }

  const client = getStreamServerClient();
  await ensureStreamPrivacyModeration();

  const channelId = streamChannelIdForLesson(lessonId);

  // Upsert members without PII (no email / phone — privacy rule)
  await client.upsertUsers(
    uniqueMembers.map((id) => ({
      id,
      name: `User ${id.slice(0, 4)}`,
    }))
  );

  const channel = client.channel("messaging", channelId, {
    members: uniqueMembers,
    created_by_id: uniqueMembers[0],
  });

  try {
    await channel.create();
  } catch (error: unknown) {
    // Channel may already exist (retry / re-seed) — ensure membership is correct
    const message = error instanceof Error ? error.message : String(error);
    if (!/already exists|duplicate/i.test(message)) {
      // Still try addMembers; if create failed for another reason, rethrow after
      try {
        await channel.addMembers(uniqueMembers);
      } catch {
        throw error;
      }
    } else {
      await channel.addMembers(uniqueMembers);
    }
  }

  return channelId;
}

