"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

/**
 * Deck presentasi Sidang Skripsi — pop-up saat logo HeCa AI diklik.
 * Slide 16:9 (layaknya PPT), desain selaras web HeCa AI, dengan visual/grafik.
 *
 * Memicu dari mana pun:
 *   onClick={() => window.dispatchEvent(new CustomEvent("open-heca-deck"))}
 *
 * Isi: PEMBUKAAN (1) + LATAR BELAKANG (3) + METODE (3) + HASIL (6)
 *      + PEMBAHASAN (5) = 18 slide.
 *
 * CATATAN ASET: slide Confusion Matrix memakai gambar asli.
 * Simpan figure matplotlib kamu ke: frontend/public/confusion-matrix.png
 */

const TOTAL = 18;

/* ---------------------------------- Visual --------------------------------- */

function NodeGraph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className}>
      <defs>
        <linearGradient id="gNode" x1="0" x2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <g stroke="url(#gNode)" strokeWidth="1.5" opacity="0.45">
        <line x1="20" y1="30" x2="60" y2="60" />
        <line x1="60" y1="60" x2="100" y2="25" />
        <line x1="60" y1="60" x2="95" y2="95" />
        <line x1="60" y1="60" x2="25" y2="90" />
        <line x1="20" y1="30" x2="25" y2="90" />
      </g>
      <g fill="url(#gNode)">
        <circle cx="20" cy="30" r="6" />
        <circle cx="100" cy="25" r="5" />
        <circle cx="95" cy="95" r="5" />
        <circle cx="25" cy="90" r="6" />
        <circle cx="60" cy="60" r="8" />
      </g>
    </svg>
  );
}

function GrowthChart({ className }: { className?: string }) {
  const bars = [16, 26, 38, 52, 66];
  return (
    <svg viewBox="0 0 130 80" className={className}>
      <defs>
        <linearGradient id="gGrow" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={12 + i * 24}
          y={72 - h}
          width="16"
          height={h}
          rx="3"
          fill="url(#gGrow)"
          opacity={0.55 + i * 0.09}
        />
      ))}
      <line
        x1="8"
        y1="72"
        x2="126"
        y2="72"
        stroke="#334155"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function BlackBoxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 64" className={className}>
      <rect
        x="20"
        y="14"
        width="36"
        height="36"
        rx="5"
        fill="#0b1120"
        stroke="#475569"
        strokeWidth="1.5"
      />
      <text
        x="38"
        y="40"
        textAnchor="middle"
        fill="#e2e8f0"
        fontSize="26"
        fontWeight="bold"
      >
        ?
      </text>
    </svg>
  );
}

function ChallengeIcon({
  type,
}: {
  type: "chat" | "folder" | "scale" | "shield";
}) {
  const s = {
    fill: "none",
    stroke: "#5eead4",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8">
      {type === "chat" && <path {...s} d="M4 5h16v10H9l-4 3v-3H4z" />}
      {type === "folder" && <path {...s} d="M3 6h6l2 2h10v10H3z" />}
      {type === "scale" && (
        <g {...s}>
          <path d="M12 4v16" />
          <path d="M6 20h12" />
          <path d="M4 8h16" />
          <path d="M4 8l-2 5h4z" />
          <path d="M20 8l-2 5h4z" />
        </g>
      )}
      {type === "shield" && (
        <path {...s} d="M12 3l7 3v5c0 4-3 7-7 9-4-2-7-5-7-9V6z" />
      )}
    </svg>
  );
}

function SplitDonut({ className }: { className?: string }) {
  const C = 2 * Math.PI * 40;
  const seg = (p: number) => (p / 100) * C;
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <g transform="rotate(-90 50 50)">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#1e293b"
          strokeWidth="16"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#34d399"
          strokeWidth="16"
          strokeDasharray={`${seg(64)} ${C - seg(64)}`}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="16"
          strokeDasharray={`${seg(16)} ${C - seg(16)}`}
          strokeDashoffset={-seg(64)}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#64748b"
          strokeWidth="16"
          strokeDasharray={`${seg(20)} ${C - seg(20)}`}
          strokeDashoffset={-seg(80)}
        />
      </g>
    </svg>
  );
}

function F1Curve({ className }: { className?: string }) {
  const pts =
    "30,66 37,42 44,32 52,25 59,23 66,24 80,25 102,27 138,29 174,29 210,30";
  return (
    <svg viewBox="0 0 220 118" className={className}>
      <defs>
        <linearGradient id="gLine" x1="0" x2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <line
        x1="30"
        y1="100"
        x2="212"
        y2="100"
        stroke="#334155"
        strokeWidth="1.5"
      />
      <line
        x1="30"
        y1="15"
        x2="30"
        y2="100"
        stroke="#334155"
        strokeWidth="1.5"
      />
      <polyline
        points={pts}
        fill="none"
        stroke="url(#gLine)"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <line
        x1="59"
        y1="23"
        x2="59"
        y2="100"
        stroke="#34d399"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        opacity="0.6"
      />
      <circle
        cx="59"
        cy="23"
        r="5"
        fill="#0a1020"
        stroke="#34d399"
        strokeWidth="2.5"
      />
      <text x="64" y="15" fill="#ffffff" fontSize="12" fontWeight="bold">
        k = 9
      </text>
      <text x="120" y="114" textAnchor="middle" fill="#94a3b8" fontSize="10">
        Nilai k (1 sampai 51)
      </text>
      <text
        x="11"
        y="58"
        fill="#94a3b8"
        fontSize="10"
        transform="rotate(-90 11 58)"
      >
        F1 Macro
      </text>
    </svg>
  );
}

function MiniHistogram({
  heights,
  color,
  meanFrac,
  className,
}: {
  heights: number[];
  color: string;
  meanFrac?: number;
  className?: string;
}) {
  const W = 200;
  const H = 92;
  const pad = 8;
  const base = H - 12;
  const n = heights.length;
  const bw = (W - pad * 2) / n;
  const max = Math.max(...heights);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}>
      {heights.map((h, i) => {
        const bh = (h / max) * (base - 8);
        return (
          <rect
            key={i}
            x={pad + i * bw + 1}
            y={base - bh}
            width={bw - 2}
            height={bh}
            rx="1.5"
            fill={color}
            opacity="0.85"
          />
        );
      })}
      <line
        x1={pad}
        y1={base}
        x2={W - pad}
        y2={base}
        stroke="#334155"
        strokeWidth="1.5"
      />
      {meanFrac != null && (
        <line
          x1={pad + meanFrac * (W - pad * 2)}
          y1="6"
          x2={pad + meanFrac * (W - pad * 2)}
          y2={base}
          stroke="#e2e8f0"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.75"
        />
      )}
    </svg>
  );
}

function TradeoffChart({ className }: { className?: string }) {
  const cov = "20,23.7 56,32.7 92,50.7 128,66 164,79.6 200,91.5";
  const size = "20,15.9 56,59.6 92,80.5 128,87.3 164,90.2 200,91";
  return (
    <svg viewBox="0 0 210 112" className={className}>
      <line
        x1="20"
        y1="100"
        x2="204"
        y2="100"
        stroke="#334155"
        strokeWidth="1.5"
      />
      <line
        x1="20"
        y1="10"
        x2="20"
        y2="100"
        stroke="#334155"
        strokeWidth="1.5"
      />
      <polyline
        points={cov}
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <polyline
        points={size}
        fill="none"
        stroke="#fb923c"
        strokeWidth="2.5"
        strokeDasharray="4 3"
        strokeLinejoin="round"
      />
      <text x="112" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">
        Significance Level ε
      </text>
    </svg>
  );
}

function ReliabilityChart({ className }: { className?: string }) {
  const pts = "24,97.8 42,85.2 60,69 69,60 78,49.2 87,40.2 96,28.5 105,19.5";
  return (
    <svg viewBox="0 0 118 118" className={className}>
      <line
        x1="15"
        y1="105"
        x2="15"
        y2="15"
        stroke="#334155"
        strokeWidth="1.5"
      />
      <line
        x1="15"
        y1="105"
        x2="105"
        y2="105"
        stroke="#334155"
        strokeWidth="1.5"
      />
      <line
        x1="15"
        y1="105"
        x2="105"
        y2="15"
        stroke="#64748b"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <polyline
        points={pts}
        fill="none"
        stroke="#34d399"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {pts.split(" ").map((p, i) => {
        const [x, y] = p.split(",");
        return <circle key={i} cx={x} cy={y} r="2.6" fill="#34d399" />;
      })}
    </svg>
  );
}

function RankBar({
  rank,
  name,
  value,
  tone,
}: {
  rank: number;
  name: string;
  value: number;
  tone: "top" | "low";
}) {
  const pct = Math.max(6, Math.min(100, (value / 0.9) * 100));
  const grad =
    tone === "top"
      ? "from-glass-green to-glass-blue"
      : "from-orange-400 to-rose-500";
  return (
    <div className="flex items-center gap-3">
      <span className="w-4 shrink-0 text-base font-bold text-white/45">
        {rank}
      </span>
      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-base font-medium text-white sm:text-lg">
            {name}
          </span>
          <span className="shrink-0 text-base font-bold tabular-nums text-white">
            {value.toFixed(4)}
          </span>
        </div>
        <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${grad}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* --- Ikon kecil untuk Bagian 4 --- */

function IconTwoCluster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className}>
      <g fill="#64748b">
        <circle cx="14" cy="16" r="2.6" />
        <circle cx="26" cy="12" r="2.6" />
        <circle cx="10" cy="32" r="2.6" />
        <circle cx="28" cy="36" r="2.6" />
        <circle cx="18" cy="48" r="2.6" />
      </g>
      <path d="M42 30 h16" stroke="#5eead4" strokeWidth="1.8" fill="none" />
      <path
        d="M55 25 l7 5 -7 5"
        stroke="#5eead4"
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <g fill="#34d399">
        <circle cx="86" cy="16" r="2.6" />
        <circle cx="100" cy="14" r="2.6" />
        <circle cx="82" cy="36" r="2.6" />
        <circle cx="102" cy="38" r="2.6" />
      </g>
      <circle
        cx="93"
        cy="30"
        r="9"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2"
      />
      <circle cx="93" cy="30" r="2.8" fill="#22d3ee" />
    </svg>
  );
}

function IconDocMatrix({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 56" className={className}>
      <rect
        x="12"
        y="10"
        width="24"
        height="34"
        rx="3"
        fill="none"
        stroke="#5eead4"
        strokeWidth="1.8"
      />
      <line
        x1="18"
        y1="19"
        x2="30"
        y2="19"
        stroke="#5eead4"
        strokeWidth="1.5"
      />
      <line
        x1="18"
        y1="25"
        x2="30"
        y2="25"
        stroke="#5eead4"
        strokeWidth="1.5"
      />
      <line
        x1="18"
        y1="31"
        x2="27"
        y2="31"
        stroke="#5eead4"
        strokeWidth="1.5"
      />
      <path d="M44 27 h14" stroke="#5eead4" strokeWidth="1.8" fill="none" />
      <path
        d="M55 22 l7 5 -7 5"
        stroke="#5eead4"
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <g>
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={74 + c * 10}
              y={12 + r * 8}
              width="8"
              height="6"
              rx="1"
              fill="#22d3ee"
              opacity={0.25 + ((r + c) % 3) * 0.25}
            />
          )),
        )}
      </g>
    </svg>
  );
}

function Icon({
  type,
  color = "#5eead4",
  className = "h-9 w-9",
}: {
  type: "shield" | "bars" | "layers" | "warn" | "target" | "check";
  color?: string;
  className?: string;
}) {
  const s = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" className={className}>
      {type === "shield" && (
        <g {...s}>
          <path d="M12 3l7 3v5c0 4-3 7-7 9-4-2-7-5-7-9V6z" />
          <path d="M9 12l2 2 4-4" />
        </g>
      )}
      {type === "bars" && (
        <g {...s}>
          <line x1="5" y1="20" x2="5" y2="13" />
          <line x1="12" y1="20" x2="12" y2="8" />
          <line x1="19" y1="20" x2="19" y2="4" />
        </g>
      )}
      {type === "layers" && (
        <g {...s}>
          <path d="M12 3l9 5-9 5-9-5z" />
          <path d="M3 12l9 5 9-5" />
          <path d="M3 16l9 5 9-5" />
        </g>
      )}
      {type === "warn" && (
        <g {...s}>
          <path d="M12 3l9 16H3z" />
          <line x1="12" y1="10" x2="12" y2="14" />
          <circle cx="12" cy="17" r="0.4" fill={color} />
        </g>
      )}
      {type === "target" && (
        <g {...s}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="0.6" fill={color} />
        </g>
      )}
      {type === "check" && (
        <g {...s}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l3 3 5-6" />
        </g>
      )}
    </svg>
  );
}

/* ---------------------------------- Shell ---------------------------------- */

function SlideShell({ children, n }: { children: ReactNode; n: number }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a1020] px-8 py-6 sm:px-12 sm:py-8">
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-glass-green/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-glass-blue/20 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="HeCa AI"
            className="h-8 w-8 rounded-lg object-contain"
          />
          <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            HeCa AI
          </span>
        </div>
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/50 sm:text-base">
          Sidang Skripsi · 2026
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center py-3">
        {children}
      </div>

      <div className="relative z-10 flex items-center justify-between text-sm text-white/40 sm:text-base">
        <span>Universitas Sebelas April</span>
        <span className="tabular-nums">
          {String(n).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="text-base font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-lg">
      {children}
    </div>
  );
}

function Panel({
  title,
  children,
  accent,
}: {
  title?: ReactNode;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "flex h-full flex-col rounded-2xl border p-5 " +
        (accent
          ? "border-glass-green/30 bg-gradient-to-br from-glass-green/15 to-glass-blue/15"
          : "border-white/10 bg-white/5")
      }
    >
      {title && (
        <div className="text-xl font-semibold text-white sm:text-2xl">
          {title}
        </div>
      )}
      <div className="mt-2.5 text-base leading-relaxed text-white/70 sm:text-lg">
        {children}
      </div>
    </div>
  );
}

function SectionHead({
  num,
  title,
  note,
}: {
  num: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-6xl font-black tracking-tighter text-transparent sm:text-6xl">
        {num}
      </span>
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {note && <span className="text-base text-white/45">{note}</span>}
    </div>
  );
}

/* XAI figure card: chart + statistik + pembahasan singkat */
function XaiCard({
  title,
  chart,
  stat,
  pembahasan,
}: {
  title: string;
  chart: ReactNode;
  stat: ReactNode;
  pembahasan: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-lg font-semibold text-white">{title}</div>
      <div className="mt-3 flex items-center justify-center">{chart}</div>
      <div className="mt-2 text-base font-bold text-white">{stat}</div>
      <div className="mt-2 border-t border-white/10 pt-2">
        <p className="text-sm leading-relaxed text-white/60 sm:text-[13px]">
          {pembahasan}
        </p>
      </div>
    </div>
  );
}

/* --------------------------------- Slides ---------------------------------- */

const SLIDES: ReactNode[] = [
  // 1 — PEMBUKAAN (all-in-one)
  <SlideShell n={1} key="cover">
    <div className="relative">
      <NodeGraph className="pointer-events-none absolute -right-1 -top-4 hidden h-32 w-32 opacity-70 sm:block" />
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-base font-medium text-white/75">
        <span className="h-2 w-2 rounded-full bg-gradient-to-br from-glass-green to-glass-blue" />
        Presentasi Sidang Skripsi · 2026
      </div>
      <h1 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
        Implementasi{" "}
        <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-transparent">
          Explainable AI
        </span>{" "}
        untuk Klasifikasi Tanya Jawab Kesehatan Bahasa Indonesia
      </h1>
      <p className="mt-3 text-lg text-white/65 sm:text-xl">
        Menggunakan Metode K Nearest Neighbors (KNN)
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Panel title="Peneliti">
          <div className="text-xl font-semibold text-white">
            Alif Gumelar Syah Moeslim
          </div>
          <div className="text-white/55">NIM 220660121161</div>
          <div className="mt-2.5 leading-snug">
            Program Studi Informatika · Fakultas Teknologi Informasi
            <br />
            Universitas Sebelas April
          </div>
        </Panel>
        <Panel title="Dosen Pembimbing">
          <div className="space-y-2.5">
            <div>
              <span className="font-semibold text-white">1.</span> Esa
              Firmansyah, S.T., M.Kom.
            </div>
            <div>
              <span className="font-semibold text-white">2.</span> Beben Sutara,
              S.Kom., M.T.
            </div>
          </div>
        </Panel>
      </div>
    </div>
  </SlideShell>,

  // 2 — LATAR BELAKANG: konteks & masalah
  <SlideShell n={2} key="lb-masalah">
    <div className="flex h-full flex-col">
      <SectionHead num="01" title="Latar Belakang Penelitian" />
      <p className="mt-2 max-w-2xl text-lg text-white/60">
        Mengapa Explainable AI dengan LMPNN &amp; Conformal Prediction penting
        untuk klasifikasi teks kesehatan?
      </p>

      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
        <Panel title="Ledakan Data Kesehatan Digital">
          <div className="flex items-center gap-4">
            <GrowthChart className="h-20 w-32 shrink-0" />
            <div>
              <div className="flex items-baseline gap-2">
                <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-4xl font-black text-transparent">
                  288.105
                </span>
                <span className="text-base text-white/65">data mentah</span>
              </div>
              <p className="mt-1.5 text-base leading-snug">
                Indonesia QnA Health Dataset (Alodokter). Pertanyaan kesehatan
                online terus meningkat.
              </p>
            </div>
          </div>
        </Panel>
        <Panel title={"Permasalahan Utama: “Black Box”"}>
          <div className="flex items-center gap-4">
            <BlackBoxIcon className="h-20 w-24 shrink-0" />
            <ul className="space-y-2 text-white/75">
              <li>✗ Keputusan tidak transparan</li>
              <li>✗ Sulit dipahami pengguna</li>
              <li>✗ Risiko salah rekomendasi medis</li>
            </ul>
          </div>
        </Panel>
      </div>
      <p className="mt-4 text-center text-lg italic text-white/55">
        “Dalam dunia medis, penjelasan sangatlah penting, kepercayaan harus
        dibangun.”
      </p>
    </div>
  </SlideShell>,

  // 3 — LATAR BELAKANG: tantangan
  <SlideShell n={3} key="lb-tantangan">
    <div className="flex h-full flex-col">
      <Kicker>Tantangan Spesifik Klasifikasi Teks Kesehatan</Kicker>
      <div className="mt-5 grid flex-1 grid-cols-2 gap-4">
        {[
          {
            ic: "chat" as const,
            t: "Bahasa Alami Beragam",
            d: "Ekspresi pertanyaan sangat bervariasi dan tidak terstruktur.",
          },
          {
            ic: "folder" as const,
            t: "Jumlah Kelas Banyak",
            d: "81.064 data tersebar dalam 107 kelas medis (min. 300 data/kelas).",
          },
          {
            ic: "scale" as const,
            t: "Data Tidak Seimbang",
            d: "Sebaran antar kelas timpang, memengaruhi performa model.",
          },
          {
            ic: "shield" as const,
            t: "Transparansi & Keamanan",
            d: "Keputusan harus dapat dijelaskan & dipercaya tenaga medis.",
          },
        ].map((c) => (
          <div
            key={c.t}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5">
              <ChallengeIcon type={c.ic} />
            </div>
            <div>
              <div className="text-xl font-semibold text-white">{c.t}</div>
              <p className="mt-1 text-base leading-snug text-white/65">{c.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>,

  // 4 — LATAR BELAKANG: pendekatan & dampak
  <SlideShell n={4} key="lb-pendekatan">
    <div className="flex h-full flex-col">
      <Kicker>Pendekatan &amp; Dampak yang Diharapkan</Kicker>
      <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xl font-bold text-white">LMPNN</div>
          <p className="mt-1 text-base text-white/65">
            Prediksi berbasis tetangga yang representatif.
          </p>
        </div>
        <div className="text-center text-3xl font-black text-white/40">+</div>
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xl font-bold text-white">
            Conformal Prediction
          </div>
          <p className="mt-1 text-base text-white/65">
            Prediksi dengan ketidakpastian terukur.
          </p>
        </div>
        <div className="text-center text-3xl font-black text-white/40">=</div>
        <div className="flex-1 rounded-2xl border border-glass-green/30 bg-gradient-to-br from-glass-green/15 to-glass-blue/15 p-4">
          <div className="text-lg font-bold text-white">
            Akurat, Transparan &amp; Dipercaya
          </div>
        </div>
      </div>

      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-3">
        {[
          "Meningkatkan kepercayaan pada sistem AI kesehatan.",
          "Membantu tenaga medis mengambil keputusan.",
          "Mendukung layanan kesehatan digital yang bertanggung jawab.",
        ].map((d, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-3xl font-black text-transparent">
              0{idx + 1}
            </div>
            <p className="mt-2 text-base leading-snug text-white/75">{d}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-center text-lg font-medium text-white/85 sm:text-xl">
        Bukan hanya tentang jawaban yang{" "}
        <span className="text-white">benar</span>, tapi juga{" "}
        <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text font-bold text-transparent">
          mengapa
        </span>{" "}
        jawaban itu diberikan.
      </p>
    </div>
  </SlideShell>,

  // 5 — METODE: alur + data
  <SlideShell n={5} key="m-alur">
    <div className="flex h-full flex-col">
      <SectionHead num="02" title="Metode Penelitian" note="Alur Metodologi" />

      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {[
          "Data Collection",
          "Preprocessing",
          "Feature Extraction",
          "Split Data",
          "Training & Tuning",
          "Evaluation",
        ].map((t, idx) => (
          <div
            key={t}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
          >
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-glass-green to-glass-blue text-base font-bold text-white">
              {idx + 1}
            </div>
            <div className="mt-2 text-sm font-semibold leading-tight text-white sm:text-base">
              {t}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
        <Panel title="Dataset">
          Indonesia QnA Health Dataset (Alodokter) · Kaggle.
          <div className="mt-3 flex flex-wrap items-center gap-2 text-white/80">
            <span className="text-3xl font-black text-white">288.105</span>
            <span className="text-base">data mentah</span>
            <span className="text-white/30">→</span>
            <span className="text-3xl font-black text-white">81.064</span>
            <span className="text-base">
              data · <span className="font-bold text-white">107</span> kelas
            </span>
          </div>
        </Panel>
        <Panel title="Preprocessing Pipeline">
          <div className="flex flex-wrap gap-1.5 text-sm text-white/80 sm:text-base">
            {[
              "Case Folding",
              "Cleaning",
              "Tokenization",
              "Stopword",
              "Stemming",
            ].map((x) => (
              <span key={x} className="rounded-md bg-white/10 px-2 py-1">
                {x}
              </span>
            ))}
          </div>
          <div className="mt-3">
            <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-3xl font-black text-transparent">
              54,4%
            </span>{" "}
            reduksi rata rata token/dokumen
          </div>
        </Panel>
      </div>
    </div>
  </SlideShell>,

  // 6 — METODE: fitur, split, modeling (dengan grafik)
  <SlideShell n={6} key="m-model">
    <div className="flex h-full flex-col">
      <Kicker>Ekstraksi Fitur, Pembagian Data &amp; Modeling</Kicker>
      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Panel title="Feature Extraction (TF IDF)">
            max_features 5.000 · ngram (1,2) · min_df 2
            <div className="mt-1.5 font-mono text-base text-white/55">
              Sparse Matrix 81.064 × 5.000
            </div>
          </Panel>
          <div className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xl font-semibold text-white sm:text-2xl">
              Split Data (Stratified)
            </div>
            <div className="mt-3 flex items-center gap-4">
              <SplitDonut className="h-28 w-28 shrink-0" />
              <div className="space-y-2 text-base sm:text-lg">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#34d399]" />
                  Training <span className="font-semibold text-white">64%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#22d3ee]" />
                  Calibration{" "}
                  <span className="font-semibold text-white">16%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#64748b]" />
                  Testing <span className="font-semibold text-white">20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Panel title="LMPNN">
            Mean lokal (centroid) tiap kelas → jarak cosine query ke centroid →
            prediksi kelas terdekat.
            <div className="mt-2 rounded-lg bg-white/5 px-3 py-1.5 text-center font-mono text-base text-white/80">
              Prediksi = argminᴄ d(xₒ, μᴄ)
            </div>
          </Panel>
          <div className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold text-white sm:text-2xl">
                Grid Search k
              </div>
              <div className="rounded-lg border border-glass-green/30 bg-glass-green/10 px-3 py-1 text-base font-bold text-white">
                k = 9
              </div>
            </div>
            <F1Curve className="mt-1 h-28 w-full" />
            <div className="text-center text-sm text-white/55 sm:text-base">
              5 Fold CV · optimasi F1 Macro (CP = 0.4548)
            </div>
          </div>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 7 — METODE: explainability + evaluasi
  <SlideShell n={7} key="m-eval">
    <div className="flex h-full flex-col">
      <Kicker>Explainability (Conformal Prediction) &amp; Evaluasi</Kicker>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { t: "Query Baru", d: "Pertanyaan pengguna." },
          { t: "Model LMPNN", d: "Jarak ke centroid kelas." },
          { t: "Nonconformity", d: "αᵢ = d(xᵢ, yᵢ).", eq: true },
          { t: "P value", d: "pᵧ = (|{αᵢ≥αₒ}|+1)/(n+1)", eq: true },
          { t: "Prediction Set", d: "Masukkan jika pᵧ > ε." },
        ].map((s, idx) => (
          <div
            key={s.t}
            className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-3.5"
          >
            <div className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-lg font-black text-transparent">
              {idx + 1}
            </div>
            <div className="mt-1 text-base font-semibold text-white">{s.t}</div>
            <p
              className={
                "mt-1 leading-snug text-white/65 " +
                (s.eq
                  ? "mt-auto pt-1 font-mono text-[11px] sm:text-xs"
                  : "text-sm sm:text-base")
              }
            >
              {s.d}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-base text-white/60">
        Credibility = nilai p (pᵧ) prediksi · Confidence = maks(pᵧ)
      </p>

      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
        <Panel title="Metrik Klasifikasi">
          <ul className="space-y-2.5">
            {[
              "Accuracy",
              "Precision",
              "Recall",
              "F1 Score (Macro & Weighted)",
              "Confusion Matrix",
            ].map((it) => (
              <li key={it} className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-glass-green" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Evaluasi Explainability">
          <ul className="space-y-2.5">
            {[
              "Coverage (target 90%)",
              "Credibility",
              "Confidence",
              "Prediction Set Size",
              "Reliability Diagram",
            ].map((it) => (
              <li key={it} className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-glass-blue" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  </SlideShell>,

  // 8 — HASIL: divider + ringkasan dataset + performa overall
  <SlideShell n={8} key="h-overall">
    <div className="flex h-full flex-col">
      <SectionHead num="03" title="Hasil Penelitian" />

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { v: "288.105", l: "Data Mentah" },
          { v: "81.064", l: "Setelah Filtering" },
          { v: "107", l: "Kelas Medis" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-center"
          >
            <div className="text-2xl font-black text-white sm:text-3xl">
              {s.v}
            </div>
            <div className="text-sm text-white/55 sm:text-base">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-base font-semibold uppercase tracking-[0.15em] text-white/55">
        4.1 Performa Overall Model
        <span className="ml-2 font-normal normal-case tracking-normal text-white/40">
          (Data Testing: 16.213 sampel)
        </span>
      </div>

      <div className="mt-3 grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { l: "Accuracy", v: "44,75%", g: "from-teal-400 to-emerald-500" },
          {
            l: "F1 Score (Macro)",
            v: "45,48%",
            g: "from-glass-green to-glass-blue",
          },
          {
            l: "F1 Score (Weighted)",
            v: "44,82%",
            g: "from-sky-400 to-indigo-500",
          },
          { l: "Baseline Acak", v: "0,93%", g: "from-slate-500 to-slate-600" },
        ].map((m) => (
          <div
            key={m.l}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
          >
            <div className="text-sm font-medium uppercase tracking-wide text-white/55">
              {m.l}
            </div>
            <div
              className={`mt-2 bg-gradient-to-r ${m.g} bg-clip-text text-4xl font-black text-transparent sm:text-5xl`}
            >
              {m.v}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base leading-relaxed text-white/70 sm:text-lg">
        Model melampaui baseline acak{" "}
        <span className="font-bold text-white">48,1×</span> · F1 Macro &amp; F1
        Weighted seimbang → performa stabil untuk kelas mayoritas maupun
        minoritas · distribusi F1 per kelas{" "}
        <span className="font-bold text-white">0,12 sampai 0,85</span>.
      </div>
    </div>
  </SlideShell>,

  // 9 — HASIL: optimasi hyperparameter
  <SlideShell n={9} key="h-opt">
    <div className="flex h-full flex-col">
      <Kicker>Optimasi Hyperparameter (Grid Search)</Kicker>
      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-5">
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 sm:col-span-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-white sm:text-2xl">
              Perbandingan Mean F1 Macro
            </div>
            <div className="rounded-lg border border-glass-green/30 bg-glass-green/10 px-3 py-1 text-base font-bold text-white">
              Best k = 9
            </div>
          </div>
          <F1Curve className="mt-2 h-44 w-full" />
          <div className="mt-1 text-center text-base text-white/70">
            Mean F1 Macro terbaik:{" "}
            <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-2xl font-black text-transparent">
              45,74%
            </span>
          </div>
        </div>

        <div className="sm:col-span-2">
          <Panel title="Pengaturan & Temuan">
            <ul className="space-y-2.5">
              <li>
                Metode:{" "}
                <span className="font-semibold text-white">Grid Search</span> k
                = 1 sampai 51 (step 2)
              </li>
              <li>
                Validasi:{" "}
                <span className="font-semibold text-white">
                  5 Fold Cross Validation
                </span>
              </li>
              <li>
                Metrik optimasi:{" "}
                <span className="font-semibold text-white">F1 Macro</span>
              </li>
              <li className="pt-1 text-white/80">
                k terlalu kecil → sensitif noise; k terlalu besar → over
                smoothing.{" "}
                <span className="font-semibold text-white">k = 9</span> memberi
                keseimbangan terbaik.
              </li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 10 — HASIL: confusion matrix (gambar asli, top-aligned & tinggi penuh)
  <SlideShell n={10} key="h-cm">
    <div className="flex h-full flex-col">
      <Kicker>Confusion Matrix · 20 Kelas Terbesar</Kicker>
      <div className="mt-3 flex min-h-0 flex-1 gap-4">
        <div className="relative min-h-0 flex-[2] rounded-2xl bg-white p-2">
          <img
            src="/confusion-matrix.png"
            alt="Confusion Matrix 20 Kelas Terbesar (normalized per baris)"
            className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] object-contain object-top"
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-lg font-semibold text-white">Cara Membaca</div>
            <p className="mt-1.5 text-sm leading-relaxed text-white/65 sm:text-base">
              Diagonal = prediksi benar; off diagonal = kesalahan. Semakin gelap
              sel, semakin tinggi proporsi prediksi (0 sampai 1).
            </p>
          </div>
          <div className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-lg font-semibold text-white">Sorotan</div>
            <ul className="mt-1.5 space-y-1.5 text-sm leading-relaxed text-white/65 sm:text-base">
              <li>
                ✅ Akurasi tinggi: gigi{" "}
                <span className="font-semibold text-white">0,97</span>, sakit
                kepala <span className="font-semibold text-white">0,94</span>,
                bayi &amp; hasil lab{" "}
                <span className="font-semibold text-white">0,93</span>.
              </li>
              <li>
                ⚠️ Sering tertukar: kehamilan ↔ menstruasi (0,20), kontrasepsi ↔
                menstruasi kontrasepsi (0,35), asam lambung ↔ gangguan
                pencernaan (0,22).
              </li>
              <li>Kelas yang mirip secara topik cenderung saling tertukar.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 11 — HASIL: 5 kelas teratas & terbawah
  <SlideShell n={11} key="h-classes">
    <div className="flex h-full flex-col">
      <Kicker>Performa per Kelas (F1 Score) · Data Testing</Kicker>
      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col rounded-2xl border border-glass-green/25 bg-white/5 p-5">
          <div className="text-xl font-semibold text-white sm:text-2xl">
            🏆 5 Kelas Teratas
          </div>
          <div className="mt-4 flex flex-1 flex-col justify-around gap-3">
            {[
              { n: "cacar air", v: 0.8538 },
              { n: "hiv", v: 0.8304 },
              { n: "gigi", v: 0.7735 },
              { n: "vaksin covid 19", v: 0.7639 },
              { n: "rambut", v: 0.7579 },
            ].map((c, i) => (
              <RankBar
                key={c.n}
                rank={i + 1}
                name={c.n}
                value={c.v}
                tone="top"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-rose-500/25 bg-white/5 p-5">
          <div className="text-xl font-semibold text-white sm:text-2xl">
            ⚠️ 5 Kelas Terbawah
          </div>
          <div className="mt-4 flex flex-1 flex-col justify-around gap-3">
            {[
              { n: "asam lambung / sakit maag", v: 0.0762 },
              { n: "kecantikan", v: 0.1026 },
              { n: "asam lambung / gastritis", v: 0.1204 },
              { n: "menstruasi / kehamilan", v: 0.1711 },
              { n: "infeksi saluran pernapasan", v: 0.184 },
            ].map((c, i) => (
              <RankBar
                key={c.n}
                rank={i + 1}
                name={c.n}
                value={c.v}
                tone="low"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 12 — HASIL: explainability bagian 1 (distribusi) + pembahasan
  <SlideShell n={12} key="h-xai-1">
    <div className="flex h-full flex-col">
      <Kicker>Analisis Explainability · Conformal Prediction</Kicker>
      <div className="mt-1 text-sm text-white/50 sm:text-base">
        LMPNN k=9 · X_calib 19.456 · X_test 16.213 · 107 Kelas
      </div>
      <div className="mt-4 grid flex-1 gap-4 sm:grid-cols-3">
        <XaiCard
          title="Distribusi Nonconformity"
          chart={
            <MiniHistogram
              heights={[
                0.05, 0.08, 0.13, 0.22, 0.34, 0.52, 0.74, 0.96, 0.82, 0.5, 0.22,
              ]}
              color="#60a5fa"
              meanFrac={0.74}
              className="h-24 w-full"
            />
          }
          stat="Mean 0,739 · Median 0,750"
          pembahasan="Skor α (cosine distance ke kelas benar) terdistribusi unimodal di sekitar 0,74. Nilainya stabil, sehingga menjadi dasar kalibrasi nilai p yang andal."
        />
        <XaiCard
          title="Distribusi Credibility"
          chart={
            <MiniHistogram
              heights={[
                0.12, 0.3, 0.5, 0.62, 0.72, 0.78, 0.82, 0.78, 0.68, 0.52, 0.38,
              ]}
              color="#34d399"
              meanFrac={0.61}
              className="h-24 w-full"
            />
          }
          stat="Mean 0,609"
          pembahasan="Sebagian besar prediksi berada pada kategori medium hingga tinggi. Artinya label yang benar jarang dianggap ’aneh’ oleh model, keyakinan cukup sehat."
        />
        <XaiCard
          title="Distribusi Confidence"
          chart={
            <MiniHistogram
              heights={[
                0.1, 0.25, 0.45, 0.7, 0.9, 1.0, 0.92, 0.75, 0.5, 0.3, 0.16,
              ]}
              color="#fb923c"
              meanFrac={0.55}
              className="h-24 w-full"
            />
          }
          stat="Mean 0,552"
          pembahasan="Margin antara prediksi terbaik dan pesaing terdekatnya rata rata 0,552, menandakan keputusan model umumnya tidak ambigu."
        />
      </div>
    </div>
  </SlideShell>,

  // 13 — HASIL: explainability bagian 2 (kalibrasi & efisiensi) + pembahasan
  <SlideShell n={13} key="h-xai-2">
    <div className="flex h-full flex-col">
      <Kicker>Explainability · Kalibrasi &amp; Efisiensi Prediksi</Kicker>
      <div className="mt-4 grid flex-1 gap-4 sm:grid-cols-3">
        <XaiCard
          title="Trade off Coverage vs Region Size"
          chart={
            <div className="w-full">
              <TradeoffChart className="h-24 w-full" />
              <div className="mt-1 flex items-center justify-center gap-3 text-sm text-white/60">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-3 rounded bg-[#38bdf8]" /> Coverage
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-3 rounded bg-[#fb923c]" /> Region Size
                </span>
              </div>
            </div>
          }
          stat="ε 0,1 → Cov 0,896 · Size 9,5"
          pembahasan="Makin besar ε, coverage turun tetapi prediction set makin ringkas. ε=0,1 dipilih sebagai kompromi terbaik antara jaminan cakupan dan efisiensi."
        />
        <XaiCard
          title="Reliability Diagram"
          chart={<ReliabilityChart className="h-28 w-28" />}
          stat="Mendekati garis diagonal"
          pembahasan="Akurasi empiris mengikuti probabilitas yang diprediksi (garis ideal). Artinya keluaran keyakinan model well calibrated dan layak dipercaya."
        />
        <XaiCard
          title="Ukuran Prediction Region"
          chart={
            <MiniHistogram
              heights={[
                0.3, 0.9, 1.0, 0.85, 0.65, 0.5, 0.38, 0.28, 0.2, 0.14, 0.1,
                0.07, 0.05,
              ]}
              color="#34d399"
              meanFrac={0.32}
              className="h-24 w-full"
            />
          }
          stat="ε = 0,1 · Coverage 89,6% · Mean 9,5"
          pembahasan="Distribusi condong ke kiri: mayoritas query menghasilkan set kecil. Singleton (pasti 1 kelas) 3,7% dan empty set hanya 1,8%."
        />
      </div>
    </div>
  </SlideShell>,

  // 14 — PEMBAHASAN: divider + implikasi metodologis
  <SlideShell n={14} key="p-implikasi">
    <div className="flex h-full flex-col">
      <SectionHead num="04" title="Pembahasan" note="Implikasi Metodologis" />
      <div className="mt-5 grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex h-16 items-center justify-center">
            <IconTwoCluster className="h-14 w-28" />
          </div>
          <div className="mt-2 text-lg font-semibold text-white">
            LMPNN vs KNN Standar
          </div>
          <ul className="mt-2 space-y-1.5 text-sm leading-snug text-white/65 sm:text-base">
            <li>Mean lokal per kelas → lebih robust terhadap outlier.</li>
            <li>Performa lebih stabil pada data teks berdimensi tinggi.</li>
          </ul>
        </div>

        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex h-16 items-center justify-center">
            <IconDocMatrix className="h-14 w-28" />
          </div>
          <div className="mt-2 text-lg font-semibold text-white">
            TF IDF + Cosine Similarity
          </div>
          <ul className="mt-2 space-y-1.5 text-sm leading-snug text-white/65 sm:text-base">
            <li>Representasi sparse 5.000 dimensi menangkap pola semantik.</li>
            <li>Cosine similarity efektif mengukur kemiripan dokumen.</li>
          </ul>
        </div>

        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex h-16 items-center justify-center">
            <F1Curve className="h-16 w-full" />
          </div>
          <div className="mt-2 text-lg font-semibold text-white">
            K Optimal = 9
          </div>
          <ul className="mt-2 space-y-1.5 text-sm leading-snug text-white/65 sm:text-base">
            <li>Berdasarkan Grid Search + 5 Fold CV.</li>
            <li>Menyeimbangkan bias dan variance.</li>
            <li>k terlalu kecil/besar menurunkan performa.</li>
          </ul>
        </div>

        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex h-16 items-center justify-center">
            <NodeGraph className="h-16 w-16" />
          </div>
          <div className="mt-2 text-lg font-semibold text-white">
            Skala 107 Kelas Medis
          </div>
          <ul className="mt-2 space-y-1.5 text-sm leading-snug text-white/65 sm:text-base">
            <li>Tantangan extreme multi class classification.</li>
            <li>F1 macro ~45% adalah hasil yang sangat kompetitif.</li>
          </ul>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 15 — PEMBAHASAN: kekuatan explainability conformal prediction
  <SlideShell n={15} key="p-explain">
    <div className="flex h-full flex-col">
      <Kicker>Kekuatan Explainability · Conformal Prediction</Kicker>
      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-3">
        {[
          {
            ic: "shield" as const,
            t: "Credibility (P Value)",
            d: "Mengukur tingkat keyakinan model terhadap prediksinya.",
            s: "Rata rata 0,6093",
          },
          {
            ic: "bars" as const,
            t: "Confidence Score",
            d: "Ukuran kepercayaan yang terukur pada setiap prediksi.",
            s: "Rata rata 0,5523",
          },
          {
            ic: "layers" as const,
            t: "Prediction Set",
            d: "Model menyatakan ketidakpastian dengan menghasilkan set kelas, bukan hanya 1 kelas.",
            s: "Rata rata 9,5 kelas",
          },
        ].map((c) => (
          <div
            key={c.t}
            className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-5 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
              <Icon type={c.ic} />
            </div>
            <div className="mt-3 text-xl font-bold text-white">{c.t}</div>
            <p className="mt-2 flex-1 text-base leading-relaxed text-white/65">
              {c.d}
            </p>
            <div className="mt-3 bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-lg font-black text-transparent">
              {c.s}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-glass-green/25 bg-gradient-to-br from-glass-green/10 to-glass-blue/10 px-4 py-3">
        <Icon type="check" className="h-6 w-6 shrink-0" />
        <p className="text-base leading-relaxed text-white/80 sm:text-lg">
          <span className="font-semibold text-white">Hasil Utama:</span>{" "}
          Coverage <span className="font-bold text-white">89,61%</span> (ε =
          0,10) · distribusi nilai p terkalibrasi baik → model dapat mengenali{" "}
          <span className="font-semibold text-white">kapan tidak yakin</span>{" "}
          dan meningkatkan keamanan.
        </p>
      </div>
    </div>
  </SlideShell>,

  // 16 — PEMBAHASAN: keterbatasan + arah penelitian lanjutan
  <SlideShell n={16} key="p-limit">
    <div className="flex h-full flex-col">
      <Kicker>Keterbatasan &amp; Arah Penelitian Lanjutan</Kicker>
      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col rounded-2xl border border-orange-400/25 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-400/10">
              <Icon type="warn" color="#fb923c" className="h-7 w-7" />
            </div>
            <div className="text-xl font-semibold text-white sm:text-2xl">
              Keterbatasan Penelitian
            </div>
          </div>
          <ul className="mt-4 flex flex-1 flex-col justify-around gap-2.5 text-base leading-snug text-white/70 sm:text-lg">
            <li>
              • Dataset dari satu platform (Alodokter) → potensi bias sumber.
            </li>
            <li>
              • Ketergantungan pada TF IDF, tidak menangkap konteks semantik
              mendalam.
            </li>
            <li>• Kelas dengan gejala umum masih sulit dibedakan.</li>
            <li>• Belum membandingkan performa dengan algoritma lain.</li>
            <li>
              • Belum diuji pada dataset eksternal / real time deployment.
            </li>
          </ul>
        </div>

        <div className="flex flex-col rounded-2xl border border-glass-green/25 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-glass-green/10">
              <Icon type="target" className="h-7 w-7" />
            </div>
            <div className="text-xl font-semibold text-white sm:text-2xl">
              Implikasi &amp; Arah Lanjutan
            </div>
          </div>
          <ul className="mt-4 flex flex-1 flex-col justify-around gap-2.5 text-base leading-snug text-white/70 sm:text-lg">
            <li>
              • Integrasi ke sistem konsultasi kesehatan digital untuk triase
              awal.
            </li>
            <li>• Pengembangan dengan embedding semantik (BERT / IndoBERT).</li>
            <li>• Eksplorasi hybrid model (LMPNN + embedding).</li>
            <li>
              • Validasi eksternal &amp; uji klinis terbatas sebelum
              implementasi penuh.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 17 — PEMBAHASAN: kesimpulan
  <SlideShell n={17} key="p-kesimpulan">
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5">
        <Icon type="check" className="h-7 w-7" />
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Kesimpulan
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { v: "288.105", l: "Data Mentah" },
          { v: "81.064", l: "Data Bersih" },
          { v: "107", l: "Kelas Medis" },
          { v: "54,4%", l: "Reduksi Token" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center"
          >
            <div className="text-xl font-black text-white sm:text-2xl">
              {s.v}
            </div>
            <div className="text-sm text-white/55">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid flex-1 grid-cols-2 gap-4">
        {[
          {
            n: "1",
            t: "Implementasi Berhasil",
            d: "Model LMPNN yang diintegrasikan dengan Conformal Prediction berhasil mengklasifikasi teks tanya jawab kesehatan bahasa Indonesia.",
          },
          {
            n: "2",
            t: "Performa Signifikan",
            d: "Accuracy 44,75% · F1 Macro 45,48% · Precision 45,68% · Recall 48,63% · F1 Weighted 44,82%. 48,1× baseline, tanpa overfitting (CV 0,4574 vs Testing 0,4548).",
          },
          {
            n: "3",
            t: "Explainability & Trustworthiness",
            d: "Coverage 89,61% (ε = 0,10) · Credibility 0,6093 · Confidence 0,5523, prediksi dilengkapi ukuran ketidakpastian.",
          },
          {
            n: "4",
            t: "Transparansi & Interpretabilitas",
            d: "Setiap prediksi dijelaskan melalui nearest neighbors; sistem memenuhi prinsip XAI tanpa teknik interpretasi tambahan.",
          },
        ].map((c) => (
          <div
            key={c.n}
            className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-glass-green to-glass-blue text-base font-bold text-white">
              {c.n}
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{c.t}</div>
              <p className="mt-1 text-sm leading-relaxed text-white/65 sm:text-base">
                {c.d}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>,

  // 18 — PEMBAHASAN: saran
  <SlideShell n={18} key="p-saran">
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5">
        <Icon type="target" className="h-7 w-7" />
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Saran
        </h2>
      </div>

      <div className="mt-4 grid flex-1 grid-cols-2 gap-3">
        {[
          {
            n: "1",
            t: "Representasi Fitur Berbasis Model Bahasa",
            d: "Eksplorasi IndoBERT sebagai pengganti TF IDF dalam pipeline klasifikasi untuk menangkap makna kontekstual gejala yang lebih kaya.",
          },
          {
            n: "2",
            t: "Variasi Nonconformity Measure",
            d: "Terapkan Mondrian Conformal Prediction agar jaminan coverage lebih terkalibrasi secara spesifik per kelas medis.",
          },
          {
            n: "3",
            t: "Multi Label Classification",
            d: "Kembangkan sistem ke arah multi label untuk mengakomodasi pertanyaan medis yang relevan terhadap lebih dari satu kategori sekaligus.",
          },
          {
            n: "4",
            t: "Sistem Pendukung Keputusan Klinis",
            d: "Wujudkan sistem berbasis AI yang transparan & dapat dipertanggungjawabkan pada platform kesehatan digital Indonesia.",
          },
        ].map((c) => (
          <div
            key={c.n}
            className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-glass-green to-glass-blue text-base font-bold text-white">
              {c.n}
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{c.t}</div>
              <p className="mt-1 text-sm leading-relaxed text-white/65 sm:text-base">
                {c.d}
              </p>
            </div>
          </div>
        ))}

        <div className="col-span-2 flex items-center gap-3 rounded-2xl border border-glass-green/25 bg-gradient-to-br from-glass-green/10 to-glass-blue/10 p-4">
          <Icon type="shield" className="h-7 w-7 shrink-0" />
          <p className="text-base leading-relaxed text-white/80 sm:text-lg">
            Seluruh pengembangan tetap mempertahankan{" "}
            <span className="font-semibold text-white">LMPNN</span> dan{" "}
            <span className="font-semibold text-white">
              Conformal Prediction
            </span>{" "}
            sebagai mekanisme{" "}
            <span className="font-semibold text-white">Explainable AI</span>,
            peningkatan akurasi dicapai tanpa mengorbankan transparansi &
            interpretabilitas.
          </p>
        </div>
      </div>
    </div>
  </SlideShell>,
];

/* -------------------------------- Component -------------------------------- */

export default function Presentation() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(() => setI((v) => Math.min(v + 1, TOTAL - 1)), []);
  const prev = useCallback(() => setI((v) => Math.max(v - 1, 0)), []);

  useEffect(() => {
    const openDeck = () => {
      setI(0);
      setOpen(true);
    };
    window.addEventListener("open-heca-deck", openDeck);
    return () => window.removeEventListener("open-heca-deck", openDeck);
  }, []);

  useEffect(() => {
    const openDeck = () =>
      window.dispatchEvent(new CustomEvent("open-heca-deck"));
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("nav img, header img"),
    );
    nodes.forEach((el) => {
      el.style.cursor = "pointer";
      el.addEventListener("click", openDeck);
    });
    return () => {
      nodes.forEach((el) => el.removeEventListener("click", openDeck));
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, next, prev]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={close}
        className="animate-fadeIn absolute inset-0 bg-black/50 backdrop-blur-xl"
      />

      <div className="animate-popIn relative w-full max-w-5xl">
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="text-base font-medium text-white/80">
            Presentasi Sidang · HeCa AI
          </div>
          <button
            onClick={close}
            aria-label="Tutup"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:scale-105 active:scale-95"
          >
            ✕
          </button>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-glass-lg ring-1 ring-white/10">
          {SLIDES[i]}
        </div>

        <div className="mt-3 flex items-center justify-between px-1">
          <button
            onClick={prev}
            disabled={i === 0}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-base font-medium text-white transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Sebelumnya
          </button>

          <div className="flex items-center gap-1.5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={
                  "h-2 rounded-full transition-all " +
                  (idx === i
                    ? "w-6 bg-gradient-to-r from-glass-green to-glass-blue"
                    : "w-2 bg-white/25 hover:bg-white/40")
                }
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={i === TOTAL - 1}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-base font-medium text-white transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Selanjutnya →
          </button>
        </div>
      </div>
    </div>
  );
}
