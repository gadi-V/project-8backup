import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import AppShell from "../components/AppShell";

export const metadata: Metadata = {
  title: "Project8 - פלטפורמת למידה",
  description: "מערכת חכמה לשיבוץ ורכישת שיעורים פרטיים",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="bg-[#fbfbfd] text-[#1d1d1f] antialiased font-sans flex flex-col min-h-screen">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#1d1d1f",
              border: "1px solid #e5e5e7",
              fontSize: "14px",
              borderRadius: "12px",
              padding: "12px 24px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            },
          }}
        />

        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
