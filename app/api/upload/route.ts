import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getCurrentUser } from "../../../lib/session";
import { uploadBoardImage } from "../../../lib/storage";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "נדרשת התחברות" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "קובץ חסר" }, { status: 400 });
    }

    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: "סוג קובץ לא נתמך" }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "הקובץ גדול מדי (מקס 5MB)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const imageId = nanoid(12);
    const url = await uploadBoardImage(imageId, buffer, file.type);

    return NextResponse.json({ id: imageId, url });
  } catch (error) {
    console.error("[upload]", error);
    return NextResponse.json({ error: "שגיאה בהעלאת התמונה" }, { status: 500 });
  }
}
