import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { requireAuth } from "../../../../../lib/api-auth";

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id: lessonId } = await ctx.params;

    const auth = await requireAuth(["TEACHER"]);
    if (auth.error) return auth.error;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, teacherId: true, appealStatus: true },
    });

    if (!lesson) {
      return NextResponse.json({ error: "השיעור לא נמצא" }, { status: 404 });
    }

    if (lesson.teacherId !== auth.user.id) {
      return NextResponse.json({ error: "אתה לא המורה של שיעור זה" }, { status: 403 });
    }

    if (lesson.appealStatus !== "NONE") {
      return NextResponse.json({ error: "ערעור כבר הוגש" }, { status: 409 });
    }

    await prisma.lesson.update({
      where: { id: lessonId },
      data: { appealStatus: "PENDING" },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Lesson Appeal Error:", error);
    return NextResponse.json({ error: "שגיאה פנימית בעת הגשת הערעור" }, { status: 500 });
  }
}