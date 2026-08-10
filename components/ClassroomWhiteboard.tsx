"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import dynamic from "next/dynamic";
import jsPDF from "jspdf";

// 1. טעינה דינמית של הלוח כדי למנוע שגיאות SSR (Server-Side Rendering)
const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

export type ClassroomWhiteboardRef = {
  /**
   * ממיר את הלוח הנוכחי לקובץ PDF (כ-Blob)
   */
  exportBoardToPdf: () => Promise<Blob | null>;
};

const ClassroomWhiteboard = forwardRef<ClassroomWhiteboardRef, {}>((props, ref) => {
  // שמירת ה-API של אקסקלידרו כדי להשתמש בו בייצוא ובשליטה בלוח
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  useImperativeHandle(ref, () => ({
    exportBoardToPdf: async () => {
      if (!excalidrawAPI) return null;
      
      const elements = excalidrawAPI.getSceneElements();
      if (!elements || elements.length === 0) return null;

      const appState = excalidrawAPI.getAppState();
      const files = excalidrawAPI.getFiles();

      try {
        // טעינת פונקציית הייצוא באופן אסינכרוני
        const { exportToCanvas } = await import("@excalidraw/excalidraw");
        
        // יצירת קנבס מאלמנטי הלוח
        const canvas = await exportToCanvas({
          elements,
          appState: {
            ...appState,
            exportWithDarkMode: false,
            exportBackground: true,
          },
          files,
        });

        // המרת הקנבס לתמונה
        const imgData = canvas.toDataURL("image/jpeg", 1.0);

        // יצירת מסמך PDF מותאם למידות הקנבס
        const pdf = new jsPDF({
          orientation: canvas.width > canvas.height ? "landscape" : "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
        
        // 3. החזרת Blob של ה-PDF המוכן להעלאה/שמירה
        return pdf.output("blob");
      } catch (error) {
        console.error("Error exporting board to PDF:", error);
        return null;
      }
    },
  }));

  return (
    <div className="w-full h-full relative overflow-hidden flex-1 border border-slate-200 rounded-xl shadow-sm">
      {/* 
        2. תמיכה בתמונות: Excalidraw תומך כברירת מחדל ב-Drag & Drop של תמונות (PNG, JPG)
        כולל שינוי גודל וסיבוב שלהן. 
      */}
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        langCode="he-IL" // ממשק בעברית במידת האפשר
      />
    </div>
  );
});

// הגדרת שם רכיב לתצוגת React DevTools
ClassroomWhiteboard.displayName = "ClassroomWhiteboard";

export default ClassroomWhiteboard;
