"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import jsPDF from "jspdf";
import type { Channel } from "stream-chat";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

export type ClassroomWhiteboardRef = {
  exportBoardToPdf: () => Promise<Blob | null>;
};

type BoardRole = "STUDENT" | "TEACHER" | "ADMIN" | "MANAGER";

type ClassroomWhiteboardProps = {
  /** Single-writer: only TEACHER (and privileged roles) may edit; students receive sync. */
  role: BoardRole;
  /** Stream Chat channel used as a live broadcast bus for board elements. */
  streamChannel?: Channel | null;
};

const BOARD_EVENT = "board_sync";
const SYNC_DEBOUNCE_MS = 400;

const ClassroomWhiteboard = forwardRef<
  ClassroomWhiteboardRef,
  ClassroomWhiteboardProps
>(function ClassroomWhiteboard({ role, streamChannel = null }, ref) {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [syncStatus, setSyncStatus] = useState<"idle" | "live" | "error">("idle");
  const applyingRemote = useRef(false);
  const lastSentHash = useRef("");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canWrite =
    role === "TEACHER" || role === "MANAGER" || role === "ADMIN";

  useImperativeHandle(ref, () => ({
    exportBoardToPdf: async () => {
      if (!excalidrawAPI) return null;

      const elements = excalidrawAPI.getSceneElements();
      if (!elements || elements.length === 0) return null;

      const appState = excalidrawAPI.getAppState();
      const files = excalidrawAPI.getFiles();

      try {
        const { exportToCanvas } = await import("@excalidraw/excalidraw");

        const canvas = await exportToCanvas({
          elements,
          appState: {
            ...appState,
            exportWithDarkMode: false,
            exportBackground: true,
          },
          files,
        });

        const imgData = canvas.toDataURL("image/jpeg", 1.0);

        const pdf = new jsPDF({
          orientation: canvas.width > canvas.height ? "landscape" : "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
        return pdf.output("blob");
      } catch (error) {
        console.error("Error exporting board to PDF:", error);
        return null;
      }
    },
  }));

  const broadcastScene = useCallback(async () => {
    if (!canWrite || !streamChannel || !excalidrawAPI || applyingRemote.current) {
      return;
    }

    try {
      const elements = excalidrawAPI.getSceneElements();
      const payload = JSON.stringify(elements);
      if (payload === lastSentHash.current) return;
      lastSentHash.current = payload;

      await streamChannel.sendEvent({
        type: BOARD_EVENT,
        // Custom payload for Excalidraw scene sync
        elements,
      } as unknown as Parameters<Channel["sendEvent"]>[0]);
      setSyncStatus("live");
    } catch (error) {
      console.error("Board sync broadcast failed:", error);
      setSyncStatus("error");
    }
  }, [canWrite, streamChannel, excalidrawAPI]);

  const handleChange = useCallback(() => {
    if (!canWrite) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      void broadcastScene();
    }, SYNC_DEBOUNCE_MS);
  }, [canWrite, broadcastScene]);

  // Listen for remote board updates (students + other viewers)
  useEffect(() => {
    if (!streamChannel || !excalidrawAPI) return;

    const handler = (event: {
      type?: string;
      user?: { id?: string };
      elements?: unknown;
    }) => {
      if (event.type !== BOARD_EVENT) return;
      if (!Array.isArray(event.elements)) return;

      applyingRemote.current = true;
      try {
        excalidrawAPI.updateScene({ elements: event.elements });
        setSyncStatus("live");
      } catch (error) {
        console.error("Failed to apply remote board scene:", error);
        setSyncStatus("error");
      } finally {
        setTimeout(() => {
          applyingRemote.current = false;
        }, 50);
      }
    };

    // Stream custom events — cast listener registration for custom event name
    const unbound = streamChannel.on(BOARD_EVENT as "message.new", handler as never);
    setSyncStatus("live");

    return () => {
      if (typeof unbound === "object" && unbound && "unsubscribe" in unbound) {
        (unbound as { unsubscribe: () => void }).unsubscribe();
      } else {
        streamChannel.off(BOARD_EVENT as "message.new", handler as never);
      }
    };
  }, [streamChannel, excalidrawAPI, canWrite]);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden flex-1 border border-slate-200 rounded-xl shadow-sm">
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold shadow border border-slate-200">
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            syncStatus === "live"
              ? "bg-emerald-500"
              : syncStatus === "error"
                ? "bg-red-500"
                : "bg-slate-400"
          }`}
        />
        <span className="text-slate-700">
          {syncStatus === "live"
            ? "הלוח מסונכרן בלייב"
            : syncStatus === "error"
              ? "שגיאת סנכרון לוח"
              : canWrite
                ? "ממתין לסנכרון..."
                : "צפייה בלבד — ממתין למורה"}
        </span>
      </div>

      {!canWrite && (
        <div className="absolute top-3 right-3 z-10 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 border border-amber-200 shadow">
          כתיבה למורה בלבד
        </div>
      )}

      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        langCode="he-IL"
        viewModeEnabled={!canWrite}
        onChange={canWrite ? handleChange : undefined}
      />
    </div>
  );
});

ClassroomWhiteboard.displayName = "ClassroomWhiteboard";

export default ClassroomWhiteboard;
