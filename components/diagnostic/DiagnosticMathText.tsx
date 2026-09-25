"use client";

import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface DiagnosticMathTextProps {
  text?: string;
  className?: string;
  inline?: boolean;
}

const MATH_SEGMENT = /(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g;

/**
 * Light normalization for common bare math tokens that appear outside $...$
 * (e.g. alpha, sqrt(...), cis) so mixed Hebrew/math prose still renders.
 * Already-delimited segments are left untouched by the splitter.
 */
function normalizeBareMathTokens(text: string): string {
  if (text.includes("$")) return text;

  return text
    .replace(/\balpha\b/g, "$\\alpha$")
    .replace(/\bbeta\b/g, "$\\beta$")
    .replace(/\bgamma\b/g, "$\\gamma$")
    .replace(/\btheta\b/g, "$\\theta$")
    .replace(/\bomega\b/g, "$\\omega$")
    .replace(/\bsqrt\(([^)]+)\)/g, "$\\sqrt{$1}$")
    .replace(/\bcis\b/g, "$\\operatorname{cis}$");
}

/**
 * Decodes mixed Hebrew + math prose:
 * 1. Detects $...$ / $$...$$ segments
 * 2. Normalizes common bare tokens when delimiters are missing
 * 3. Wraps math in dir="ltr" + unicode-bidi isolate to prevent BiDi glyph flips
 */
export const DiagnosticMathText: React.FC<DiagnosticMathTextProps> = ({
  text,
  className = "",
  inline = true,
}) => {
  if (!text) return null;

  const prepared = normalizeBareMathTokens(text);
  const parts = prepared.split(MATH_SEGMENT);

  return (
    <span className={`inline-block leading-relaxed ${className}`} dir="rtl">
      {parts.map((part, index) => {
        if (!part) return null;

        const isDisplayMath = part.startsWith("$$") && part.endsWith("$$");
        const isInlineMath =
          !isDisplayMath && part.startsWith("$") && part.endsWith("$") && part.length > 1;

        if (isDisplayMath || isInlineMath) {
          const rawMath = isDisplayMath ? part.slice(2, -2) : part.slice(1, -1);
          try {
            const html = katex.renderToString(rawMath.trim(), {
              throwOnError: false,
              displayMode: isDisplayMath || !inline,
              strict: false,
            });
            return (
              <span
                key={index}
                dir="ltr"
                className="inline-block mx-0.5 align-middle font-sans select-text [unicode-bidi:isolate]"
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
};

interface FormulaDisplayProps {
  latex?: string;
  className?: string;
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({
  latex,
  className = "",
}) => {
  if (!latex) return null;

  try {
    const html = katex.renderToString(latex.trim(), {
      throwOnError: false,
      displayMode: true,
      strict: false,
    });
    return (
      <div
        dir="ltr"
        className={`my-3 overflow-x-auto rounded-xl border border-neutral-200/80 bg-white px-3 py-3 text-center font-sans select-text shadow-sm [unicode-bidi:isolate] ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return (
      <div dir="ltr" className="my-2 text-center font-mono [unicode-bidi:isolate]">
        {latex}
      </div>
    );
  }
};
