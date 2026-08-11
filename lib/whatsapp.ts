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
  studentName: string;
  lessonId: string;
  startTime: Date | string;
};

/**
 * Unidirectional reminder ~15 minutes before lesson start.
 * Deep-links into the in-app virtual classroom (not a WhatsApp chat thread).
 */
export async function sendLessonReminderNotification({
  phone,
  studentName,
  lessonId,
  startTime,
}: LessonReminderNotificationInput): Promise<void> {
  const classroomUrl = `${getAppUrl()}/lessons/${lessonId}`;
  const message =
    `היי ${studentName}, השיעור שלך מתחיל בעוד 15 דקות! 🎓\n` +
    `לחץ כאן לכניסה ישירה לכיתה הווירטואלית: ${classroomUrl}`;

  // startTime reserved for schedulers / audit; message copy is fixed at T-15.
  void startTime;

  await sendWhatsAppText(phone, message);
}

export type LessonSummaryNotificationInput = {
  phone: string;
  userName: string;
  pdfBuffer: Buffer | null;
  videoStreamingUrl: string;
};

/**
 * Lesson-end summary: PDF as document attachment, recording as secure streaming URL only.
 */
export async function sendLessonSummaryNotification({
  phone,
  userName,
  pdfBuffer,
  videoStreamingUrl,
}: LessonSummaryNotificationInput): Promise<void> {
  const message =
    `היי ${userName}, סיכום השיעור שלך מוכן! 📄\n` +
    `מצורף קובץ ה-PDF של הלוח המחיק.\n` +
    `לצפייה בהקלטת השיעור באיכות גבוהה: ${videoStreamingUrl}`;

  if (pdfBuffer && pdfBuffer.length > 0) {
    await sendWhatsAppDocument(phone, message, pdfBuffer);
    return;
  }

  await sendWhatsAppText(phone, message);
}
