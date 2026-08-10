import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#ffffff]/80 backdrop-blur-md border-b border-[#e5e5e7]" dir="rtl">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-sm font-black tracking-wider text-[#1d1d1f]">
            PROJECT8
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[12px] font-semibold text-[#6e6e73]">
            <a href="/#features" className="hover:text-[#0071e3] transition-colors">האתגר</a>
            <a href="/#method" className="hover:text-[#0071e3] transition-colors">השיטה</a>
            <Link href="/pricing" className="hover:text-[#0071e3] transition-colors">מחירון</Link>
            <a href="/#faq" className="hover:text-[#0071e3] transition-colors">שאלות ותשובות</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-[12px] font-semibold text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
            אזור אישי
          </Link>
          <Link href="/register" className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-[12px] font-bold py-1.5 px-4 rounded-full transition-all">
            הצטרפות
          </Link>
        </div>
      </div>
    </header>
  );
}