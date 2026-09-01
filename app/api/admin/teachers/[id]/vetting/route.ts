import { NextRequest, NextResponse } from "next/server";
import { getTeacherVettingProgress, updateVettingStep } from "../../../../../../lib/teacher-vetting";
import { VettingStepName, VettingStepStatus } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const teacherProfileId = resolvedParams.id;

    const progress = await getTeacherVettingProgress(teacherProfileId);
    if (!progress) {
      return NextResponse.json({ error: "Teacher profile not found" }, { status: 404 });
    }

    return NextResponse.json(progress, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch teacher vetting progress:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status:	 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const teacherProfileId = resolvedParams.id;
    const body = await request.json();

    const { stepNumber, stepName, status, adminNotes, evaluatedByAdminId, bypassedByAdmin } = body;

    if (!stepNumber || !stepName || !status) {
      return NextResponse.json(
        { error: "Missing required fields: stepNumber, stepName,and status are mandatory" },
        { status:	 400 }
      );
    }

    const validStepNames = Object.values(VettingStepName);
    if (!validStepNames.includes(stepName)) {
      return NextResponse.json({ error: "Invalid stepName" }, { status:	 400 });
    }

    const validStatuses = Object.values(VettingStepStatus);
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status:	 400 });
    }

    const updatedLog = await updateVettingStep({
      teacherProfileId,
      stepNumber: Number(stepNumber),
      stepName,
      status,
      adminNotes,
      evaluatedByAdminId,
      bypassedByAdmin: Boolean(bypassedByAdmin),
    });

    return NextResponse.json(updatedLog, { status:	 200 });
  } catch (error) {
    console.error("Failed to update vetting step:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status:	 500 });
  }
}
