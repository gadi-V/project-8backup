import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 מתחיל תהליך Seeding...');

  const passwordHash = await bcrypt.hash('Password123!', 10);

  // 1. יצירת מנהל
  const manager = await prisma.user.upsert({
    where: { email: 'manager@test.com' },
    update: { phone: '0500000001' },
    create: {
      email: 'manager@test.com',
      phone: '0500000001',
      name: 'מנהל מערכת',
      password: passwordHash,
      role: Role.MANAGER,
    },
  });
  console.log(`✅ מנהל נוצר: ${manager.email}`);

  // 2. יצירת מורה (כולל TeacherProfile)
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@test.com' },
    update: { phone: '0500000002' },
    create: {
      email: 'teacher@test.com',
      phone: '0500000002',
      name: 'משה המורה',
      password: passwordHash,
      role: Role.TEACHER,
      isApproved: true,
      teacherProfile: {
        create: {
          subjects: ['מתמטיקה', 'פיזיקה'],
          ageGroups: ['חטיבה', 'תיכון'],
          bio: 'מורה מצוין עם 10 שנות ניסיון',
        }
      }
    },
  });
  console.log(`✅ מורה נוצר: ${teacher.email}`);

  // 3. יצירת תלמיד
  const student = await prisma.user.upsert({
    where: { email: 'student@test.com' },
    update: { phone: '0500000003' },
    create: {
      email: 'student@test.com',
      phone: '0500000003',
      name: 'עידו התלמיד',
      password: passwordHash,
      role: Role.STUDENT,
    },
  });
  console.log(`✅ תלמיד נוצר: ${student.email}`);

  // 4. יצירת שיעור ניסיון
  const now = new Date();
  const lesson = await prisma.lesson.create({
    data: {
      title: 'שיעור מתמטיקה - משוואות ריבועיות',
      scheduledAt: now,
      startTime: now,
      status: 'IN_PROGRESS',
      teacherId: teacher.id,
      studentId: student.id,
    },
  });
  console.log(`✅ שיעור נוצר: ${lesson.title}`);

  // 5. יצירת ערוץ צ'אט מקושר לשיעור
  const chatChannel = await prisma.chatChannel.create({
    data: {
      lessonId: lesson.id,
      streamChannelId: `lesson_${lesson.id}`,
    },
  });
  console.log(`✅ ערוץ צ'אט נוצר: ${chatChannel.streamChannelId}`);

  // הדפסת פרטי התחברות
  console.log('\n======================================================');
  console.log('🎉 תהליך ה-Seeding הסתיים בהצלחה!');
  console.log('======================================================');
  console.log('פרטי התחברות למערכת:');
  console.log('------------------------------------------------------');
  console.log('👤 מנהל:');
  console.log('   אימייל: manager@test.com');
  console.log('   טלפון: 0500000001');
  console.log('   סיסמה: Password123!');
  console.log('------------------------------------------------------');
  console.log('👨‍🏫 מורה:');
  console.log('   אימייל: teacher@test.com');
  console.log('   טלפון: 0500000002');
  console.log('   סיסמה: Password123!');
  console.log('------------------------------------------------------');
  console.log('👦 תלמיד:');
  console.log('   אימייל: student@test.com');
  console.log('   טלפון: 0500000003');
  console.log('   סיסמה: Password123!');
  console.log('======================================================\n');
}

main()
  .catch((e) => {
    console.error('❌ שגיאה במהלך Seeding:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });