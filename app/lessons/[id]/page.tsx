import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/session";
import { getAuthorizedLessonById } from "../../../lib/lessons";
import LessonRoomUI from "./LessonRoomUI";

export default async function LessonPage(props: { params: { id: string } }) {
  // Await the params object in Next.js 15+ 
  const params = await props.params;
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?from=/lessons/" + params.id);
  }

  // אימות הרשאה ושליפת נתוני השיעור
  const lesson = await getAuthorizedLessonById(params.id, user.id, user.role);

  if (!lesson) {
    notFound(); // או להפנות לדשבורד עם שגיאה
  }

  return (
    <LessonRoomUI 
      lesson={lesson} 
      user={{
        id: user.id,
        name: user.name,
        role: user.role
      }} 
    />
  );
}