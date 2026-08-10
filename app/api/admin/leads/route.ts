import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/api-auth";
import { writeAuditLog } from "../../../../lib/audit";

export async function GET() {
  try {
    const auth = await requireAuth(["ADMIN"]);
    if (auth.error) return auth.error;

    const leads = await prisma.fallbackLead.findMany({
      orderBy: [{ isHandled: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Admin leads GET error:", error);
    return NextResponse.json({ error: "שגיאה בשליפת הלידים" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const auth = await requireAuth(["ADMIN"]);
    if (auth.error) return auth.error;

    const body = await request.json();
    const { leadId, isHandled } = body;

    if (!leadId || typeof isHandled !== "boolean") {
      return NextResponse.json(
        { error: "leadId ו-isHandled הם שדות חובה" },
        { status: 400 }
      );
    }

    const existing = await prisma.fallbackLead.findUnique({ where: { id: leadId } });
    if (!existing) {
      return NextResponse.json({ error: "ליד לא נמצא" }, { status: 404 });
    }

    const lead = await prisma.fallbackLead.update({
      where: { id: leadId },
      data: { isHandled },
    });

    await writeAuditLog({
      actorId: auth.user.id,
      action: isHandled ? "LEAD_MARKED_HANDLED" : "LEAD_REOPENED",
      entityType: "FallbackLead",
      entityId: leadId,
      metadata: { name: lead.name, phone: lead.phone },
    });

    return NextResponse.json({
      message: isHandled ? "הליד סומן כטופל" : "הליד נפתח מחדש",
      lead,
    });
  } catch (error) {
    console.error("Admin leads PATCH error:", error);
    return NextResponse.json({ error: "שגיאה בעדכון הליד" }, { status: 500 });
  }
}
