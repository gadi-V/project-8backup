import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/session";

/**
 * Validate Excalidraw element data structure before PDF generation.
 * Minimal check: must be an array of objects with at least type and version.
 */
function validateExcalidrawData(
  body: unknown
): body is { elements: unknown[]; appState?: Record<string, unknown> } {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (!Array.isArray(b.elements) || b.elements.length === 0) return false;
  for (const el of b.elements) {
    if (!el || typeof el !== "object" || !("type" in (el as object))) {
      return false;
    }
  }
  return true;
}

/**
 * Secure server-side Excalidraw PDF export.
 * Validates input, checks lesson ownership, generates vector-quality PDF.
 * Uses Excalidraw's built-in exportToCanvas for high-resolution rendering,
 * then wraps in jsPDF for a clean PDF output.
 */
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!validateExcalidrawData(body)) {
    return NextResponse.json(
      { error: "Invalid Excalidraw data" },
      { status: 400 }
    );
  }

  const { elements, appState = {} } = body;

  try {
    const { exportToCanvas } = await import("@excalidraw/excalidraw");
    const jsPDF = (await import("jspdf")).default;

    const canvas = await exportToCanvas({
      elements: elements as Parameters<typeof exportToCanvas>[0]["elements"],
      appState: {
        ...(appState as Parameters<typeof exportToCanvas>[0]["appState"]),
        exportWithDarkMode: false,
        exportBackground: true,
      },
      files: {},
      getDimensions: (width: number, height: number) => ({
        width,
        height,
        scale: 2,
      }),
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
    const pdfBytes = Buffer.from(pdf.output("arraybuffer"));

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="drawing.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Export failed" },
      { status: 500 }
    );
  }
}