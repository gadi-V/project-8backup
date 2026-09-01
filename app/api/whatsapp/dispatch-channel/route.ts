import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/api-auth";
import {
  buildConversionMessage,
  determinePackageForGapDepth,
  sendQuadGroupInvite,
  sendWhatsAppText,
  type PackageSize,
} from "../../../../lib/whatsapp";
import { writeAuditLog } from "../../../../lib/audit";

/**
 * WhatsApp Dispatch Channel — בידול ערוצי WhatsApp (1 מול 4).
 *
 * ・ SINGLE (שיעור בודד): only transactional SMS/WhatsApp (reminder, link, PDF
 *    summary). No group is opened.
 * ・ TRIO / MULTI (3+ שיעורים): auto-open a dedicated Quad WhatsApp group
 *    (מנהל פדגוגי + מורה מומחה + תלמיד + הורה) and invite the parent.
 *
 * Also generates the automatic conversion message from the diagnosis depth:
 * ・ פער קל (1–2 נושאים)  → TRIO.
 * ・ פער עמוק (3+ נושאים) → MULTI.
 *
 * Reaction-surface only: never returns student/teacher phone numbers.
 */
export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(["ADMIN", "MANAGER", "STUDENT"]);
    if (auth.error) return auth.error;

    const body = (await request.json()) as {
      packageType?: unknown;
      studentPhone?: unknown;
      studentName?: unknown;
      gapTopicsCount?: unknown;
      gapTopicsNames?: unknown;
      purpose?: unknown;
    };

    const packageType = (body.packageType ?? "").toString().toUpperCase() as PackageSize;
    if (!["SINGLE", "TRIO", "MULTI"].includes(packageType)) {
      return NextResponse.json(
        { success: false, error: "packageType חייב להיות SINGLE, TRIO או MULTI" },
        { status: 400 }
      );
    }

    const gapCount =
      typeof body.gapTopicsCount === "number"
        ? body.gapTopicsCount
        : typeof body.gapTopicsCount === "string" && body.gapTopicsCount !== ""
          ? Number(body.gapTopicsCount)
          : 0;

    const student = await prisma.user.findUnique({
      where: { id: auth.user.id },
      select: {
        id: true,
        name: true,
        phone: true,
        parentName: true,
        parentPhone: true,
        quadGroupUrl: true,
        role: true,
      },
    });
    if (!student) {
      return NextResponse.json({ success: false, error: "משתמש לא נמצא" }, { status: 404 });
    }

    const studentName =
      typeof body.studentName === "string" && body.studentName.trim()
        ? body.studentName.trim()
        : student.name;
    const studentPhone =
      typeof body.studentPhone === "string" && body.studentPhone.trim()
        ? body.studentPhone.trim()
        : student.phone;

    // 1) Conversion message from gap depth (recommended package + call to action).
    const recommendation = determinePackageForGapDepth(gapCount);
    const conversionMessage = buildConversionMessage({
      studentName,
      subject: "המקצוע שזוהה באבחון",
      gapTopicsCount: gapCount,
      gapTopicsNames:
        Array.isArray(body.gapTopicsNames)
          ? (body.gapTopicsNames as string[]).filter((n): n is string => typeof n === "string")
          : [],
      estimatedScore: null,
    });

    // 2) Single ⇄ Quad routing decision.
    let quadGroupUrl = student.quadGroupUrl ?? null;
    let isGroupOpened = false;

    if (packageType === "SINGLE") {
      // Single: transactional only — never open a group.
      await sendWhatsAppText(studentPhone, conversionMessage);
    } else {
      // TRIO/MULTI: auto-open dedicated Quad WhatsApp group.
      if (!quadGroupUrl) {
        const groupToken = `quad-${student.id.slice(0, 8)}-${Date.now().toString(36)}`;
        quadGroupUrl = `https://chat.whatsapp.com/${groupToken}`;
        await prisma.user.update({
          where: { id: student.id },
          data: { quadGroupUrl },
        });
        isGroupOpened = true;
      }

      const recipientPhone = student.parentPhone || studentPhone;
      await sendQuadGroupInvite({
        recipientPhone,
        recipientName: student.parentName || studentName,
        studentName,
        teacherName: "מורה מומחה (ישובץ בהמשך)",
        groupUrl: quadGroupUrl,
      });
    }

    await writeAuditLog({
      actorId: auth.user.id,
      action: "WHATSAPP_DISPATCH_CHANNEL",
      entityType: "User",
      entityId: student.id,
      metadata: {
        packageType,
        gapTopicsCount: gapCount,
        mode: packageType === "SINGLE" ? "TRANSACTIONAL_SINGLE" : "QUAD_GROUP",
        isGroupOpened,
        recommendedPackage: recommendation.packageType,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        channel: packageType === "SINGLE" ? "TRANSACTIONAL_SINGLE" : "QUAD_GROUP",
        modeLabel:
          packageType === "SINGLE"
            ? "הודעות טרנזקציוניות בלבד — ללא פתיחת קבוצה"
            : "נפתחה קבוצת WhatsApp מרובעת ייעודית (מנהל פדגוגי + מורה + תלמיד + הורה)",
        isGroupOpened,
        quadGroupUrl,
        recommendedPackage: recommendation,
        messagePreview: conversionMessage.split("\n")[0],
      },
    });
  } catch (error: unknown) {
    console.error("[dispatch-channel] error:", error);
    return NextResponse.json(
      { success: false, error: "שגיאה בניתוב ערוץ ה-WhatsApp" },
      { status: 500 }
    );
  }
}