import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAuth } from "../../../lib/api-auth";

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(["STUDENT"]);
    if (auth.error) return auth.error;

    const body = await request.json();
    const { ageGroup, subject, challenge } = body;

    if (!ageGroup || !subject || !challenge) {
      return NextResponse.json({ error: "כל שדות האבחון הם חובה" }, { status: 400 });
    }

    const newDiagnostic = await prisma.diagnosticQuiz.create({
      data: {
        studentId: auth.user.id,
        ageGroup,
        subject,
        challenge,
      },
    });

    return NextResponse.json(
      {
        message: "האבחון הדיאגנוסטי נשמר בהצלחה במערכת",
        diagnostic: newDiagnostic,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL DIAGNOSTIC API ERROR:", error);
    return NextResponse.json({ error: "שגיאה פנימית בשרת במהלך שמירת האבחון" }, { status: 500 });
  }
}
