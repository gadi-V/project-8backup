// project8/app/api/leads/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, grade, notes } = body;

    // ודאות שקבלנו שמות וטלפון (שדות חובה)
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'שם ומספר טלפון הם שדות חובה' }, 
        { status: 400 }
      );
    }

    // שמירה בבסיס הנתונים בטבלת FallbackLead שהקמנו
    const newLead = await prisma.fallbackLead.create({
      data: {
        name,
        phone,
        grade: grade || 'לא צוין',
        requestedHours: notes || 'לא צוינו שעות מועדפות',
      },
    });

    return NextResponse.json({ success: true, leadId: newLead.id });
  } catch (error) {
    console.error('Error saving lead to database:', error);
    return NextResponse.json(
      { error: 'שגיאה פנימית בשמירת הנתונים בשרת' }, 
      { status: 500 }
    );
  }
}