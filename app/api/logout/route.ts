import { NextResponse } from "next/server";
import { clearSessionCookieOptions } from "../../../lib/auth";

export async function POST() {
  const response = NextResponse.json({ message: "התנתקת בהצלחה" });
  response.cookies.set(clearSessionCookieOptions());
  return response;
}
