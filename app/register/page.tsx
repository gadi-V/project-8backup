"use client";
import Link from "next/link";

export default function RegisterHubPage() {
  return (
    <div
      className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans antialiased py-16 px-6"
      dir="rtl"
    >
      <div className="max-w-xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="text-xs font-black tracking-widest text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
          >
            ← חזרה לעמוד הבית של PROJECT8
          </Link>
          <h1 className="text-4xl font-black text-[#1d1d1f] tracking-tight pt-4">
            בחרו סוג הרשמה
          </h1>
          <p className="text-xs font-bold text-[#6e6e73]">
            תהליך נפרד לתלמידים/הורים ולמורים — כדי לאסוף בדיוק את הנתונים הנכונים.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/register/student"
            className="bg-white border border-[#e5e5e7] hover:border-[#0071e3] p-6 rounded-3xl shadow-sm text-right transition-all space-y-3"
          >
            <div className="text-xs font-black text-[#0071e3] tracking-widest">STUDENT</div>
            <h2 className="text-xl font-black text-[#1d1d1f]">תלמיד / הורה</h2>
            <p className="text-xs font-bold text-[#6e6e73] leading-relaxed">
              אבחון לימודי, פתיחת חשבון והתאמת מורה לפי הפרופיל שלכם.
            </p>
            <span className="inline-block text-xs font-black text-[#0071e3] pt-2">
              המשך להרשמת תלמיד ←
            </span>
          </Link>

          <Link
            href="/register/teacher"
            className="bg-white border border-[#e5e5e7] hover:border-[#0071e3] p-6 rounded-3xl shadow-sm text-right transition-all space-y-3"
          >
            <div className="text-xs font-black text-[#0071e3] tracking-widest">TEACHER</div>
            <h2 className="text-xl font-black text-[#1d1d1f]">מורה / מרצה</h2>
            <p className="text-xs font-bold text-[#6e6e73] leading-relaxed">
              פרופיל מקצועי, תחומי התמחות וקבוצות גיל — לאחר אישור צוות.
            </p>
            <span className="inline-block text-xs font-black text-[#0071e3] pt-2">
              המשך להרשמת מורה ←
            </span>
          </Link>
        </div>

        <p className="text-center text-xs text-[#6e6e73]">
          כבר יש חשבון?{" "}
          <Link href="/login" className="font-black text-[#0071e3] hover:underline">
            התחברות
          </Link>
        </p>
      </div>
    </div>
  );
}
