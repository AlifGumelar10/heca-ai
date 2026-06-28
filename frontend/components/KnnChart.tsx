"use client";

import type { CSSProperties } from "react";
import type { PredictionResult } from "@/lib/types";

type Props = { result: PredictionResult; topN?: number };

/**
 * Visualisasi tetangga KNN (LMPNN k=9).
 * Node pusat = keluhan Anda. Node di sekitarnya = kelas kandidat terdekat.
 * Makin dekat ke pusat & makin besar node, makin mirip (cosine similarity tinggi).
 * Node biru = prediksi utama.
 */
export default function KnnChart({ result, topN = 7 }: Props) {
  const n = Math.min(topN, result.top_classes.length);
  const rows = Array.from({ length: n }, (_, i) => ({
    cls: result.top_classes[i],
    p: result.top_pvalues[i] ?? 0,
    sim: result.top_similarity?.[i] ?? 0,
    dist: result.top_distance?.[i] ?? 0,
  }));

  const sims = rows.map((r) => r.sim);
  const maxSim = Math.max(...sims, 0.0001);
  const minSim = Math.min(...sims, 0);
  const span = Math.max(maxSim - minSim, 0.0001);

  // Geometri SVG
  const SIZE = 380;
  const C = SIZE / 2;
  const R_MAX = 150; // node paling jauh
  const R_MIN = 78; // node paling dekat

  const nodes = rows.map((r, i) => {
    const simNorm = (r.sim - minSim) / span; // 0..1 (1 = paling mirip)
    const radius = R_MAX - simNorm * (R_MAX - R_MIN);
    const angle = (-90 + i * (360 / n)) * (Math.PI / 180);
    const x = C + radius * Math.cos(angle);
    const y = C + radius * Math.sin(angle);
    const nodeR = 16 + simNorm * 14;
    return { ...r, x, y, nodeR, isTop: i === 0, simNorm };
  });

  return (
    <div className="glass-soft rounded-4xl p-5">
      <div className="mb-1 text-sm font-medium">Visualisasi Tetangga KNN</div>
      <p className="mb-3 text-xs text-ink-soft">
        Peta kedekatan keluhan Anda terhadap kelas kandidat terdekat pada model
        LMPNN k=9. Posisi makin dekat ke pusat dan ukuran node makin besar
        menandakan kemiripan (cosine similarity) yang makin tinggi.
      </p>

      <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
        {/* GRAF RADIAL */}
        <div className="shrink-0">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="h-[320px] w-[320px] sm:h-[360px] sm:w-[360px]"
          >
            {/* Cincin panduan */}
            {[R_MIN, (R_MIN + R_MAX) / 2, R_MAX].map((r) => (
              <circle
                key={r}
                cx={C}
                cy={C}
                r={r}
                fill="none"
                stroke="#00000010"
                strokeDasharray="3 5"
              />
            ))}

            {/* Garis dari pusat ke tiap node */}
            {nodes.map((nd) => (
              <line
                key={`l-${nd.cls}`}
                x1={C}
                y1={C}
                x2={nd.x}
                y2={nd.y}
                stroke={nd.isTop ? "#0a84ff" : "#8e8e93"}
                strokeWidth={nd.isTop ? 2.5 : 1.2}
                strokeOpacity={0.25 + nd.simNorm * 0.55}
              />
            ))}

            {/* Node tetangga */}
            {nodes.map((nd) => (
              <g key={`n-${nd.cls}`}>
                <circle
                  cx={nd.x}
                  cy={nd.y}
                  r={nd.nodeR}
                  fill={nd.isTop ? "#0a84ff" : "#ffffff"}
                  stroke={nd.isTop ? "#0a84ff" : "#8e8e9355"}
                  strokeWidth={1.5}
                  className="transition-all duration-700"
                />
                <text
                  x={nd.x}
                  y={nd.y + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={nd.isTop ? "#ffffff" : "#1d1d1f"}
                >
                  {(nd.sim * 100).toFixed(0)}%
                </text>
              </g>
            ))}

            {/* Node pusat = keluhan */}
            <circle cx={C} cy={C} r={30} fill="#1d1d1f" />
            <text
              x={C}
              y={C - 2}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#ffffff"
            >
              Keluhan
            </text>
            <text
              x={C}
              y={C + 11}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#ffffff"
            >
              Anda
            </text>
          </svg>
        </div>

        {/* DAFTAR TETANGGA */}
        <div className="w-full space-y-2">
          {nodes.map((nd, i) => {
            const barStyle: CSSProperties = {
              width: Math.max(nd.simNorm * 100, 8) + "%",
              background: nd.isTop
                ? "linear-gradient(90deg, #0a84ff99, #0a84ff)"
                : "linear-gradient(90deg, #8e8e9344, #8e8e93aa)",
            };
            return (
              <div
                key={`row-${nd.cls}`}
                className="flex items-center gap-2 rounded-2xl bg-white/40 px-3 py-2"
              >
                <span
                  className={
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold " +
                    (nd.isTop
                      ? "bg-glass-blue text-white"
                      : "bg-black/5 text-ink-soft")
                  }
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-medium" title={nd.cls}>
                    {nd.cls}
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={barStyle}
                    />
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs font-semibold tabular-nums">
                    {(nd.sim * 100).toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-ink-soft tabular-nums">
                    p={nd.p.toFixed(3)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-ink-soft">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-glass-blue" /> Prediksi
          utama
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-soft/50" /> Kelas
          kandidat
        </span>
        <span className="ml-auto">
          Persen = cosine similarity, p = p-value Conformal Prediction
        </span>
      </div>
    </div>
  );
}
