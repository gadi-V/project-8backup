/**
 * Central WhatsApp automation — unidirectional system notifications only.
 * Bidirectional chat stays in-app (Stream Chat); never relay participant phones.
 */

function getAppUrl(): string {
  return (
    process.env.APP_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

function getWhatsAppConfig(): { apiUrl: string; apiKey: string } | null {
  const apiUrl = process.env.WHATSAPP_API_URL?.trim();
  const apiKey = process.env.WHATSAPP_API_KEY?.trim();
  if (!apiUrl || !apiKey) return null;
  return { apiUrl: apiUrl.replace(/\/$/, ""), apiKey };
}

function normalizeWhatsAppPhone(phone: string): string {
  return phone.replace(/[\s\-()+/]/g, "").trim();
}

async function sendWhatsAppText(phone: string, message: string): Promise<void> {
  const config = getWhatsAppConfig();
  const chatId = normalizeWhatsAppPhone(phone);

  if (!config) {
    console.log("================== MOCK WHATSAPP (text) ==================");
    console.log(`To: ${chatId}`);
    console.log(`Message:\n${message}`);
    console.log("==========================================================");
    return;
  }

  const response = await fetch(`${config.apiUrl}/sendMessage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: chatId,
      chatId: `${chatId}@c.us`,
      message,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => response.statusText);
    throw new Error(`WhatsApp sendMessage failed (${response.status}): ${detail}`);
  }
}

async function sendWhatsAppDocument(
  phone: string,
  caption: string,
  pdfBuffer: Buffer,
  fileName = "board-summary.pdf"
): Promise<void> {
  const config = getWhatsAppConfig();
  const chatId = normalizeWhatsAppPhone(phone);

  if (!config) {
    console.log("================== MOCK WHATSAPP (document) ==================");
    console.log(`To: ${chatId}`);
    console.log(`File: ${fileName} (${pdfBuffer.length} bytes)`);
    console.log(`Caption:\n${caption}`);
    console.log("==============================================================");
    return;
  }

  const form = new FormData();
  form.append("phone", chatId);
  form.append("chatId", `${chatId}@c.us`);
  form.append("caption", caption);
  form.append(
    "file",
    new Blob([new Uint8Array(pdfBuffer)], { type: "application/pdf" }),
    fileName
  );

  const response = await fetch(`${config.apiUrl}/sendDocument`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: form,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => response.statusText);
    throw new Error(`WhatsApp sendDocument failed (${response.status}): ${detail}`);
  }
}

export type LessonReminderNotificationInput = {
  phone: string;
  /** Display name of the recipient (student or teacher). */
  recipientName: string;
  lessonId: string;
  startTime: Date | string;
};

/**
 * Unidirectional reminder ~15 minutes before lesson start.
 * Deep-links into the in-app virtual classroom (not a WhatsApp chat thread).
 * Sent to both student and teacher by the cron scheduler.
 */
export async function sendLessonReminderNotification({
  phone,
  recipientName,
  lessonId,
  startTime,
}: LessonReminderNotificationInput): Promise<void> {
  const classroomUrl = `${getAppUrl()}/lessons/${lessonId}`;
  const message =
    `היי ${recipientName}, השיעור שלך מתחיל בעוד 15 דקות! 🎓\n` +
    `לחץ כאן לכניסה ישירה לכיתה הווירטואלית: ${classroomUrl}`;

  // startTime reserved for schedulers / audit; message copy is fixed at T-15.
  void startTime;

  await sendWhatsAppText(phone, message);
}

/** Sender branding — all outbound notifications originate from the business account. */
const BRAND_NAME = "Project8";
const BRAND_SIGNATURE = `צוות ${BRAND_NAME}`;

export type LessonSummaryNotificationInput = {
  phone: string;
  userName: string;
  pdfBuffer: Buffer | null;
  pdfSecureUrl: string | null;
  videoStreamingUrl: string;
  /** Short, non-sensitive summary details shown in the message body. */
  lessonSummary?: string;
};

/**
 * Lesson-end summary, sent as the official business sender (never the tutor's
 * personal number): secure PDF link + recording streaming link.
 * Falls back to raw text when no PDF is available.
 */
export async function sendLessonSummaryNotification({
  phone,
  userName,
  pdfBuffer,
  pdfSecureUrl,
  videoStreamingUrl,
  lessonSummary,
}: LessonSummaryNotificationInput): Promise<void> {
  const summaryLine = lessonSummary?.trim()
    ? `\nפרטי השיעור: ${lessonSummary.trim()}\n`
    : "\n";

  const pdfLine = pdfSecureUrl
    ? `\nקישור מאובטח לקובץ ה-PDF של הלוח: ${pdfSecureUrl}\n`
    : pdfBuffer && pdfBuffer.length > 0
      ? "\nמצורף קובץ ה-PDF של הלוח המחיק.\n"
      : "";

  const message =
    `היי ${userName},\n` +
    `השיעור שלך הושלם והסיכום מוכן! ✅${summaryLine}` +
    pdfLine +
    `לצפייה בהקלטת השיעור באיכות גבוהה: ${videoStreamingUrl}\n\n` +
    `${BRAND_SIGNATURE}`;

  if (pdfBuffer && pdfBuffer.length > 0) {
    await sendWhatsAppDocument(
      phone,
      message,
      pdfBuffer
    );
    return;
  }

  await sendWhatsAppText(phone, message);
}

/** ISO-8601 date+time in the local (Israel) timezone, stable for message copy. */
function formatLocalDateTime(date: Date): string {
  return new Intl.DateTimeFormat("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jerusalem",
  }).format(date);
}

export type LessonCancellationNotificationInput = {
  /** Recipient phone (student or teacher). */
  phone: string;
  recipientName: string;
  lessonId: string;
  subject: string;
  scheduledAt: Date;
  /** Outcome copy: "בוטל", "בוטל באיחור", "הוחלף במורה חלוף" etc. */
  outcome: string;
  extra?: string;
};

/**
 * Notification about a cancelled / late-cancelled / substituted lesson.
 * Sent from the official business account to the affected party.
 */
export async function sendLessonCancellationNotification({
  phone,
  recipientName,
  lessonId,
  subject,
  scheduledAt,
  outcome,
  extra,
}: LessonCancellationNotificationInput): Promise<void> {
  const classroomUrl = `${getAppUrl()}/lessons/${lessonId}`;
  const message =
    `היי ${recipientName},\n` +
    `${subject} המתוכנן ל-${formatLocalDateTime(scheduledAt)} — ${outcome}.\n` +
    (extra ? `${extra}\n` : "") +
    `לפרטים נוספים: ${classroomUrl}\n\n${BRAND_SIGNATURE}`;
  await sendWhatsAppText(phone, message);
}
