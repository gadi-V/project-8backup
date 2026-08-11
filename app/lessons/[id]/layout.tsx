import type { ReactNode } from "react";

/**
 * Classroom route layout — full-viewport shell without marketing chrome.
 * Root AppShell hides Navbar/Footer for /lessons/*; this layout maximizes board/video space.
 */
export default function LessonClassroomLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900 overflow-hidden">
      {children}
    </div>
  );
}
