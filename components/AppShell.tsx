"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Site chrome wrapper. Classroom routes (/lessons/*) render children only
 * so the whiteboard + video get the full viewport.
 */
export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isClassroom = Boolean(pathname?.startsWith("/lessons/"));

  if (isClassroom) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
