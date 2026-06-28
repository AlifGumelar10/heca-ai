"use client";

import type { CSSProperties } from "react";

type Props = {
  label: string;
  value: number; // 0..1
  color?: string; // green | orange | red
  caption?: string;
};

const COLORS: Record<string, string> = {
  green: "#34c759",
  orange: "#ff9f0a",
  red: "#ff453a",
  blue: "#0a84ff",
};

export default function CredibilityMeter({
  label,
  value,
  color = "blue",
  caption,
}: Props) {
  const pct = Math.max(0, Math.min(100, value * 100));
  const c = COLORS[color] ?? COLORS.blue;

  const valueStyle: CSSProperties = { color: c };
  const fillStyle: CSSProperties = {
    width: pct + "%",
    background: "linear-gradient(90deg, " + c + "99, " + c + ")",
  };

  return (
    <div className="glass-soft rounded-4xl p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-ink-soft">{label}</span>
        <span
          className="text-xl font-semibold tracking-tight"
          style={valueStyle}
        >
          {pct.toFixed(1)}%
        </span>
      </div>
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={fillStyle}
        />
      </div>
      {caption && <p className="mt-2 text-xs text-ink-soft">{caption}</p>}
    </div>
  );
}
