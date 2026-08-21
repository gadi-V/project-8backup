import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createDailyRoom } from "../lib/daily";
import { createStreamChannel } from "../lib/stream";

const prisma = new PrismaClient();
const TEST_PASSWORD = "Password123!";

async function main() {
  console.log("🌱 מתחיל תהליך Seeding...");

  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);

  const manager = await prisma.user.upsert({
    where: { email: "manager@test.com" },
    update: {
      phone: "0500000001",
      name: "מנהל מערכת",
      password: passwordHash,
      role: Role.MANAGER,
    },
    create: {
      email: "manager@test.com",
      phone: "0500000001",
      name: "מנהל מערכת",
      password: passwordHash,
      role: Role.MANAGER,
    },
  });
  console.log(`✅ מנהל: ${manager.email}`);

  const teacher = await prisma.user.upsert({
    where: { email: "teacher@test.com" },
    update: {
      phone: "0500000002",
      name: "משה המורה",
      password: passwordHash,
      role: Role.TEACHER,
      isApproved: true,
    },
    create: {
      email: "teacher@test.com",
      phone: "0500000002",
      name: "משה המורה",
      password: passwordHash,
      role: Role.TEACHER,
      isApproved: true,
      teacherProfile: {
        create: {
          subjects: ["מתמטיקה", "פיזיקה"],
          ageGroups: ["חטיבה", "תיכון"],
          bio: "מורה מצוין עם 10 שנות ניסיון",
        },
      },
    },
  });

  await prisma.teacherProfile.upsert({
    where: { userId: teacher.id },
    update: {
      subjects: ["מתמטיקה", "פיזיקה"],
      ageGroups: ["חטיבה", "תיכון"],
      bio: "מורה מצוין עם 10 שנות ניסיון",
    },
    create: {
      userId: teacher.id,
      subjects: ["מתמטיקה", "פיזיקה"],
      ageGroups: ["חטיבה", "תיכון"],
      bio: "מורה מצוין עם 10 שנות ניסיון",
    },
  });
  console.log(`✅ מורה: ${teacher.email}`);

  const student = await prisma.user.upsert({
    where: { email: "student@test.com" },
    update: {
      phone: "0500000003",
      name: "עידו התלמיד",
      password: passwordHash,
      role: Role.STUDENT,
      lessonCredits: 5,
    },
    create: {
      email: "student@test.com",
      phone: "0500000003",
      name: "עידו התלמיד",
      password: passwordHash,
      role: Role.STUDENT,
      lessonCredits: 5,
    },
  });

  const existingQuiz = await prisma.diagnosticQuiz.findFirst({
    where: { studentId: student.id },
  });
  if (!existingQuiz) {
    await prisma.diagnosticQuiz.create({
      data: {
        studentId: student.id,
        ageGroup: "תיכון",
        subject: "מתמטיקה",
        challenge: "משוואות ריבועיות",
      },
    });
  }
  console.log(`✅ תלמיד: ${student.email}`);

  const now = new Date();
  let lesson = await prisma.lesson.findFirst({
    where: {
      teacherId: teacher.id,
      studentId: student.id,
      title: "שיעור מתמטיקה - משוואות ריבועיות",
    },
    include: { chatChannel: true },
  });

  if (!lesson) {
    lesson = await prisma.lesson.create({
      data: {
        title: "שיעור מתמטיקה - משוואות ריבועיות",
        scheduledAt: now,
        startTime: now,
        status: "IN_PROGRESS",
        durationMinutes: 60,
        teacherId: teacher.id,
        studentId: student.id,
      },
      include: { chatChannel: true },
    });
    console.log(`✅ שיעור נוצר: ${lesson.title}`);
  } else {
    lesson = await prisma.lesson.update({
      where: { id: lesson.id },
      data: { status: "IN_PROGRESS", startTime: now },
      include: { chatChannel: true },
    });
    console.log(`✅ שיעור קיים עודכן: ${lesson.title}`);
  }

  if (!lesson.dailyRoomUrl) {
    if (process.env.DAILY_API_KEY) {
      try {
        const room = await createDailyRoom(lesson.id, {
          scheduledAt: lesson.scheduledAt,
          durationMinutes: lesson.durationMinutes ?? 60,
        });
        lesson = await prisma.lesson.update({
          where: { id: lesson.id },
          data: { dailyRoomUrl: room.url },
          include: { chatChannel: true },
        });
        console.log(`✅ חדר Daily נוצר: ${room.url}`);
      } catch (error) {
        console.warn("⚠️ יצירת חדר Daily נכשלה:", error);
      }
    } else {
      console.warn("⚠️ DAILY_API_KEY חסר — חדר הווידאו יישאר לא מחובר עד שיוגדר.");
    }
  } else {
    console.log("✅ חדר Daily כבר מחובר לשיעור.");
  }

  if (!lesson.chatChannel) {
    const memberIds = [teacher.id, student.id, manager.id];
    let streamChannelId = `lesson_${lesson.id}`;

    if (process.env.STREAM_API_SECRET && (process.env.STREAM_API_KEY || process.env.NEXT_PUBLIC_STREAM_API_KEY)) {
      try {
        streamChannelId = await createStreamChannel(lesson.id, memberIds);
        console.log(`✅ ערוץ Stream נוצר: ${streamChannelId}`);
      } catch (error) {
        console.warn("⚠️ יצירת ערוץ Stream נכשלה:", error);
      }
    } else {
      console.warn("⚠️ מפתחות Stream חסרים — הצ'אט יישאר לא מחובר עד שיוגדרו.");
    }

    await prisma.chatChannel.create({
      data: {
        lessonId: lesson.id,
        streamChannelId,
      },
    });
  } else {
    console.log(`✅ ערוץ צ'אט קיים: ${lesson.chatChannel.streamChannelId}`);
  }

  console.log("\n======================================================");
  console.log("🎉 תהליך ה-Seeding הסתיים בהצלחה!");
  console.log("======================================================");
  console.log("פרטי התחברות למערכת:");
  console.log("------------------------------------------------------");
  console.log("👤 מנהל:");
  console.log("   אימייל: manager@test.com");
  console.log("   טלפון: 0500000001");
  console.log(`   סיסמה: ${TEST_PASSWORD}`);
  console.log("------------------------------------------------------");
  console.log("👨‍🏫 מורה:");
  console.log("   אימייל: teacher@test.com");
  console.log("   טלפון: 0500000002");
  console.log(`   סיסמה: ${TEST_PASSWORD}`);
  console.log("------------------------------------------------------");
  console.log("👦 תלמיד:");
  console.log("   אימייל: student@test.com");
  console.log("   טלפון: 0500000003");
  console.log(`   סיסמה: ${TEST_PASSWORD}`);
  console.log("======================================================\n");
}

main()
  .catch((e) => {
    console.error("❌ שגיאה במהלך Seeding:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
