"use client";

import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

type MathFormulaProps = {
  math: string;
  block?: boolean;
  className?: string;
};

/**
 * Isolated LaTeX math renderer using KaTeX.
 * Strictly forces `dir="ltr"` and `unicode-isolate` to prevent BiDi Hebrew inversion.
 */
export default function MathFormula({
  math,
  block = false,
  className = "",
}: MathFormulaProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch (err) {
      console.error("KaTeX render error:", err);
      return `<span class="text-rose-400 font-mono">${math}</span>`;
    }
  }, [math, block]);

  if (block) {
    return (
      <div
        dir="ltr"
        className={`my-2 overflow-x-auto text-start font-sans select-text [unicode-bidi:isolate] ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      dir="ltr"
      className={`inline-block align-middle font-sans select-text [unicode-bidi:isolate] ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Mixed prose + inline/display KaTeX: splits on `$...$` / `$$...$$`.
 * Prefer `DiagnosticMathText` for diagnostic screens (RTL-safe wrapper).
 */
export function renderFormattedText(text?: string) {
  if (!text) return null;

  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g);
  return (
    <span dir="rtl">
      {parts.map((part, index) => {
        if (!part) return null;
        const isDisplay = part.startsWith("$$") && part.endsWith("$$");
        const isInline =
          !isDisplay && part.startsWith("$") && part.endsWith("$") && part.length > 1;
        if (isDisplay || isInline) {
          const math = isDisplay ? part.slice(2, -2) : part.slice(1, -1);
          try {
            const html = katex.renderToString(math.trim(), {
              throwOnError: false,
              displayMode: isDisplay,
              strict: false,
            });
            return (
              <span
                key={index}
                dir="ltr"
                className="inline-block align-middle font-sans select-text [unicode-bidi:isolate]"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return (
              <span key={index} dir="ltr" className="[unicode-bidi:isolate]">
                {part}
              </span>
            );
          }
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}
