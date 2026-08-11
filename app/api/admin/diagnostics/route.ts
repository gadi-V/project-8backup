import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/api-auth";

export async function GET() {
  try {
    const auth = await requireAuth(["ADMIN", "MANAGER"]);
    if (auth.error) return auth.error;

    const diagnostics = await prisma.diagnosticQuiz.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            lessonCredits: true,
            createdAt: true,
          },
        },
      },
    });

    return NextResponse.json({ diagnostics });
  } catch (error) {
    console.error("Admin diagnostics GET error:", error);
    return NextResponse.json({ error: "שגיאה בשליפת האבחונים" }, { status: 500 });
  }
}
