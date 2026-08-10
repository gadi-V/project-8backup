// project8/prisma.config.ts
import 'dotenv/config'; // טוען את קובץ ה-.env באופן מפורש
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'), // משתמש בפונקציה המובנית של פריזמה
  },
});