import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

/**
 * פונקציית עזר (Mock) לשליחת הודעות ווטסאפ דרך Green API.
 * במערכת אמיתית נשתמש ב-fetch ל-API של Green API עם waInstance ו-Token.
 */
async function sendGreenApiWhatsApp(phone: string, caption: string, fileUrl?: string) {
  // סימולציה של בקשה ל-Green API
  console.log("================== MOCK WHATSAPP (Green API) ==================");
  console.log(`To: ${phone}`);
  if (fileUrl) {
    console.log(`Type: Document (sendFileByUrl)`);
    console.log(`File URL: ${fileUrl}`);
  } else {
    console.log(`Type: Text (sendMessage)`);
  }
  console.log(`Message/Caption:\n${caption}`);
  console.log("===============================================================");
}

export async function POST(request: Request) {
  try {
    // 1. קבלת הנתונים מהבקשה
    // מאחר ואנו מצפים גם לקובץ (PDF) וגם לנתוני טקסט, נשתמש ב-FormData
    const formData = await request.formData();
    const lessonId = formData.get("lessonId") as string;
    const videoRecordingUrl = formData.get("videoRecordingUrl") as string; // הלינק מ-Daily.co Webhook
    const pdfFile = formData.get("pdfFile") as File | null;

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId is required" }, { status: 400 });
    }

    // סימולציה של העלאת קובץ ה-PDF לשרת אחסון (כגון AWS S3 / Cloudinary)
    let uploadedPdfUrl = "";
    if (pdfFile) {
      // כאן היה מגיע קוד העלאה אמיתי (upload to S3, etc.)
      // נשתמש בכתובת דמי (Mock URL) לצורך המשימה
      uploadedPdfUrl = `https://storage.project8.co.il/lessons/${lessonId}/board-summary.pdf`;
    }

    // 2. עדכון במסד הנתונים: שמירת קישור ה-PDF וקישור הווידאו, ועדכון הסטטוס ל-COMPLETED
    const updatedLesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        status: "COMPLETED",
        excalidrawPdfUrl: uploadedPdfUrl || null,
        videoRecordingUrl: videoRecordingUrl || null,
      },
      include: {
        student: true,
        teacher: true,
      },
    });

    // 3. שליחת ווטסאפ למנהל המערכת ולתלמיד

    // מציאת כל המנהלים במערכת (ROLE = MANAGER או ADMIN)
    const managers = await prisma.user.findMany({
      where: {
        role: { in: ["MANAGER", "ADMIN"] },
      },
    });

    // שליחה למנהלים: קובץ PDF + קישור להורדת/צפיית הווידאו של Daily
    const managerMessage = `השיעור של ${updatedLesson.student.name} עם המורה ${updatedLesson.teacher.name} הסתיים בהצלחה.\nקישור להקלטת הוידאו מ-Daily.co:\n${videoRecordingUrl || "לא זמין"}`;
    for (const manager of managers) {
      await sendGreenApiWhatsApp(manager.phone, managerMessage, uploadedPdfUrl);
    }

    // שליחה לתלמיד: הודעה אישית + קובץ PDF + קישור מוגן לנגן הווידאו בתוך ה-SaaS (Streaming Link)
    // הקישור המוגן יפנה את התלמיד לאזור האישי שלו במערכת לצפייה מאובטחת
    const studentStreamingLink = `https://app.project8.co.il/dashboard/lessons/${lessonId}/recording`;
    
    const studentMessage = `היי ${updatedLesson.student.name}, סיכום השיעור שלך מוכן! 🎓\nקובץ ה-PDF מצורף להודעה זו.\nלצפייה בהקלטת השיעור באיכות גבוהה: ${studentStreamingLink}`;
    
    await sendGreenApiWhatsApp(updatedLesson.student.phone, studentMessage, uploadedPdfUrl);

    return NextResponse.json({
      success: true,
      message: "השיעור הסתיים, הנתונים נשמרו והודעות הווטסאפ נשלחו בהצלחה.",
      lesson: updatedLesson,
    });
  } catch (error) {
    console.error("Complete Lesson Error:", error);
    return NextResponse.json({ error: "שגיאה פנימית בסיום השיעור" }, { status: 500 });
  }
}
