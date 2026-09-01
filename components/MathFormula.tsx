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
        className={`my-2 overflow-x-auto text-left font-sans select-text [unicode-bidi:isolate] ${className}`}
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
