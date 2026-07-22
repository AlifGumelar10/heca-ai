"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import logoFTI from "./logo_FTI.png";
import qrCode from "./qr.png";

/**
 * Deck Presentasi Sidang Skripsi HeCa AI.
 * Pop-up saat logo diklik (event "open-heca-deck").
 *
 * Struktur IMRAD: Introduction, Method, Results, Discussion,
 * ditutup Kesimpulan dan Saran. Total 15 slide, rasio 16:9.
 *
 * Desain: font Poppins untuk seluruh deck, mengikuti prinsip Claus O. Wilke
 * (Fundamentals of Data Visualization): data ink tinggi, warna secukupnya
 * (teal cyan sebagai warna utama, oranye hanya untuk sorotan), pelabelan
 * langsung, tanpa chartjunk. Seluruh isi bersumber dari skripsi
 * Alif Gumelar Syah Moeslim.
 *
 * ASET: slide Confusion Matrix memakai frontend/public/confusion-matrix.png
 */

const TOTAL = 16;
const FONT = "'Poppins', ui-sans-serif, system-ui, sans-serif";

/* ================================ VISUAL ================================== */

function NodeGraph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className}>
      <defs>
        <linearGradient id="gNode" x1="0" x2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <g stroke="url(#gNode)" strokeWidth="1.5" opacity="0.4">
        <line x1="20" y1="30" x2="60" y2="60" />
        <line x1="60" y1="60" x2="100" y2="25" />
        <line x1="60" y1="60" x2="95" y2="95" />
        <line x1="60" y1="60" x2="25" y2="90" />
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

function FunnelBar({
  label,
  value,
  widthPct,
  strong,
}: {
  label: string;
  value: string;
  widthPct: number;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={
          "flex h-14 items-center rounded-xl px-4 " +
          (strong
            ? "bg-gradient-to-r from-glass-green to-glass-blue"
            : "bg-white/10")
        }
        style={{ width: `${widthPct}%` }}
      >
        <span
          className={
            "text-2xl font-black tabular-nums " +
            (strong ? "text-[#04121a]" : "text-white")
          }
        >
          {value}
        </span>
      </div>
      <span className="text-base text-white/60">{label}</span>
    </div>
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
        rx="6"
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
      <text x="64" y="16" fill="#ffffff" fontSize="12" fontWeight="bold">
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
        <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${grad}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function Icon({
  type,
  color = "#5eead4",
  className = "h-9 w-9",
}: {
  type:
    | "shield"
    | "bars"
    | "layers"
    | "warn"
    | "target"
    | "check"
    | "chat"
    | "folder"
    | "scale"
    | "filter"
    | "cpu";
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
      {type === "filter" && <path {...s} d="M3 5h18l-7 8v6l-4-2v-4z" />}
      {type === "cpu" && (
        <g {...s}>
          <rect x="7" y="7" width="10" height="10" rx="1.5" />
          <path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" />
        </g>
      )}
    </svg>
  );
}

/* ================================ SHELL =================================== */

const SECTION_TONE: Record<string, string> = {
  Introduction: "border-sky-400/40 bg-sky-400/10 text-sky-200",
  Method: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  Results: "border-cyan-400/40 bg-cyan-400/10 text-cyan-200",
  Discussion: "border-violet-400/40 bg-violet-400/10 text-violet-200",
  Penutup: "border-teal-400/40 bg-teal-400/10 text-teal-200",
};

function SlideShell({
  children,
  n,
  section,
}: {
  children: ReactNode;
  n: number;
  section?: keyof typeof SECTION_TONE;
}) {
  return (
    <div
      style={{ fontFamily: FONT }}
      className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a1020] px-8 py-6 sm:px-12 sm:py-8"
    >
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-glass-green/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-glass-blue/20 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={logoFTI.src}
            alt="Universitas Sebelas April"
            className="h-9 w-auto rounded-lg object-contain"
          />
          <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Universitas Sebelas April
          </span>
        </div>
        {section && (
          <span
            className={
              "rounded-full border px-3.5 py-1 text-sm font-semibold uppercase tracking-[0.18em] sm:text-base " +
              SECTION_TONE[section]
            }
          >
            {section}
          </span>
        )}
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center py-3">
        {children}
      </div>

      <div className="relative z-10 flex items-center justify-between text-sm text-white/40 sm:text-base">
        <span>Sidang Skripsi HeCa AI</span>
        <span className="tabular-nums">
          {String(n).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="text-xl font-bold uppercase tracking-[0.16em] text-white/70 sm:text-2xl">
      {children}
    </div>
  );
}

function SectionHead({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {note && <span className="text-lg text-white/45">{note}</span>}
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

function StatCard({
  value,
  label,
  grad = "from-glass-green to-glass-blue",
}: {
  value: string;
  label: string;
  grad?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
      <div
        className={`bg-gradient-to-r ${grad} bg-clip-text text-2xl font-extrabold tracking-tight text-transparent tabular-nums sm:text-3xl`}
      >
        {value}
      </div>
      <div className="mt-1.5 text-sm font-medium uppercase tracking-wide text-white/55 sm:text-base">
        {label}
      </div>
    </div>
  );
}

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
        <p className="text-sm leading-relaxed text-white/60">{pembahasan}</p>
      </div>
    </div>
  );
}

/* =============================== SLIDES =================================== */

const SLIDES: ReactNode[] = [
  // 1 — COVER
  <SlideShell n={1} key="cover">
    <div className="relative">
      <NodeGraph className="pointer-events-none absolute -right-1 -top-6 hidden h-32 w-32 opacity-70 sm:block" />
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-base font-medium text-white/75">
        <span className="h-2 w-2 rounded-full bg-gradient-to-br from-glass-green to-glass-blue" />
        Presentasi Sidang Skripsi 2026
      </div>
      <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
        Implementasi{" "}
        <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-transparent">
          Explainable AI
        </span>{" "}
        untuk Klasifikasi Tanya Jawab Kesehatan Bahasa Indonesia
      </h1>
      <p className="mt-3 text-lg text-white/65 sm:text-2xl">
        Menggunakan Metode K Nearest Neighbors (KNN)
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Panel title="Peneliti">
          <div className="text-xl font-semibold text-white">
            Alif Gumelar Syah Moeslim
          </div>
          <div className="text-white/55">NIM 220660121161</div>
          <div className="mt-2.5 leading-snug">
            Program Studi Informatika
            <br />
            Fakultas Teknologi Informasi
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

  // 2 — INTRODUCTION: latar belakang & masalah
  <SlideShell n={2} key="intro-1" section="Introduction">
    <div className="flex h-full flex-col">
      <SectionHead title="Latar Belakang" note="Pendahuluan" />
      <p className="mt-2 max-w-3xl text-lg text-white/60 sm:text-xl">
        Layanan tanya jawab kesehatan daring tumbuh pesat, namun keputusan model
        AI sering menjadi kotak hitam yang sulit dipercaya di ranah medis.
      </p>

      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
        <Panel title="Ledakan Data Kesehatan Digital">
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-5xl font-black text-transparent">
                288.105
              </span>
            </div>
          </div>
          <p className="mt-2 text-base leading-snug sm:text-lg">
            Pertanyaan pada Indonesia QnA Health Dataset (Alodokter). Kebutuhan
            klasifikasi otomatis yang akurat sekaligus transparan makin
            mendesak.
          </p>
        </Panel>
        <Panel title="Masalah Utama: Model Kotak Hitam">
          <div className="flex items-center gap-4">
            <BlackBoxIcon className="h-20 w-24 shrink-0" />
            <ul className="space-y-2 text-white/75">
              <li>Keputusan tidak transparan</li>
              <li>Sulit dipahami pengguna</li>
              <li>Berisiko pada rekomendasi medis</li>
            </ul>
          </div>
        </Panel>
      </div>
      <p className="mt-4 text-center text-lg italic text-white/55 sm:text-xl">
        Di dunia medis, penjelasan sama pentingnya dengan akurasi, sebab
        kepercayaan harus dibangun.
      </p>
    </div>
  </SlideShell>,

  // 3 — INTRODUCTION: rumusan masalah, tujuan, manfaat
  <SlideShell n={3} key="intro-2" section="Introduction">
    <div className="flex h-full flex-col">
      <Kicker>Rumusan Masalah, Tujuan, dan Manfaat</Kicker>
      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col rounded-2xl border border-sky-400/25 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <Icon type="chat" color="#7dd3fc" className="h-8 w-8" />
            <div className="text-xl font-semibold text-white">
              Rumusan Masalah
            </div>
          </div>
          <ul className="mt-3 space-y-2.5 text-base leading-snug text-white/70 sm:text-lg">
            <li>
              Bagaimana mengklasifikasi teks tanya jawab kesehatan yang beragam?
            </li>
            <li>
              Bagaimana membuat prediksi model dapat dijelaskan dan dipercaya?
            </li>
          </ul>
        </div>
        <div className="flex flex-col rounded-2xl border border-glass-green/25 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <Icon type="target" className="h-8 w-8" />
            <div className="text-xl font-semibold text-white">Tujuan</div>
          </div>
          <ul className="mt-3 space-y-2.5 text-base leading-snug text-white/70 sm:text-lg">
            <li>Menerapkan LMPNN untuk klasifikasi 107 kelas medis.</li>
            <li>
              Mengintegrasikan Conformal Prediction sebagai mekanisme XAI.
            </li>
            <li>Mengukur performa sekaligus keandalan penjelasannya.</li>
          </ul>
        </div>
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <Icon type="check" className="h-8 w-8" />
            <div className="text-xl font-semibold text-white">Manfaat</div>
          </div>
          <ul className="mt-3 space-y-2.5 text-base leading-snug text-white/70 sm:text-lg">
            <li>Fondasi sistem triase kesehatan digital yang transparan.</li>
            <li>Model yang mampu menyatakan tingkat ketidakpastiannya.</li>
            <li>Kontribusi XAI untuk teks bahasa Indonesia.</li>
          </ul>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 4 — METHOD: alur penelitian & dataset
  <SlideShell n={4} key="method-1" section="Method">
    <div className="flex h-full flex-col">
      <SectionHead title="Alur Penelitian dan Dataset" note="Metode" />
      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
        <Panel title="Dataset Indonesia QnA Health">
          <div className="mt-1 space-y-3">
            <FunnelBar label="Data mentah" value="288.105" widthPct={100} />
            <FunnelBar
              label="Setelah filtering"
              value="81.064"
              widthPct={64}
              strong
            />
          </div>
          <p className="mt-3 text-base leading-snug sm:text-lg">
            Sumber Alodokter via Kaggle. Disaring menjadi{" "}
            <span className="font-semibold text-white">107 kelas medis</span>{" "}
            dengan minimal 300 data per kelas.
          </p>
        </Panel>
        <Panel title="Tahapan Penelitian">
          <ol className="space-y-2.5">
            {[
              "Pengumpulan data",
              "Preprocessing teks (5 tahap)",
              "Ekstraksi fitur TF IDF",
              "Pemodelan LMPNN (k = 9)",
              "Conformal Prediction",
              "Evaluasi dan interpretasi",
            ].map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-glass-green to-glass-blue text-sm font-bold text-[#04121a]">
                  {i + 1}
                </span>
                <span className="text-base text-white/80 sm:text-lg">{t}</span>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </div>
  </SlideShell>,

  // 5 — METHOD: preprocessing & TF IDF
  <SlideShell n={5} key="method-2" section="Method">
    <div className="flex h-full flex-col">
      <Kicker>Preprocessing Teks dan Ekstraksi Fitur</Kicker>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {[
          "Case Folding",
          "Cleaning (Regex)",
          "Tokenization",
          "Stopword Removal",
          "Stemming (Sastrawi ECS)",
        ].map((t, i, arr) => (
          <div key={t} className="flex items-center gap-2">
            <span className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-base font-medium text-white/85 sm:text-lg">
              {t}
            </span>
            {i < arr.length - 1 && (
              <span className="text-glass-green">&rarr;</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-glass-green/25 bg-gradient-to-br from-glass-green/10 to-glass-blue/10 p-5 text-center">
          <Icon type="filter" className="h-9 w-9" />
          <div className="mt-2 bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-5xl font-black text-transparent">
            54,4%
          </div>
          <div className="mt-1 text-base text-white/65 sm:text-lg">
            Reduksi jumlah token
          </div>
          <div className="mt-1 text-sm text-white/45">
            dari 56,6 menjadi 25,8 juta token
          </div>
        </div>
        <Panel title="Ekstraksi Fitur TF IDF">
          <ul className="space-y-2">
            <li>Dimensi fitur: 5.000</li>
            <li>N gram: unigram dan bigram (1, 2)</li>
            <li>Ambang min_df = 2</li>
            <li>Matriks sparse 81.064 x 5.000</li>
          </ul>
        </Panel>
        <Panel title="Pembagian Data">
          <div className="flex h-full flex-col justify-center gap-2.5">
            <FunnelBar label="Train" value="64%" widthPct={100} strong />
            <FunnelBar label="Validation" value="16%" widthPct={45} />
            <FunnelBar label="Test" value="20%" widthPct={52} />
          </div>
        </Panel>
      </div>
    </div>
  </SlideShell>,

  // 6 — METHOD: LMPNN + Conformal Prediction + evaluasi
  <SlideShell n={6} key="method-3" section="Method">
    <div className="flex h-full flex-col">
      <Kicker>Pemodelan LMPNN dan Conformal Prediction</Kicker>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Panel title="LMPNN" accent>
          <p className="leading-snug">
            Local Mean Pseudo Nearest Neighbor menghitung{" "}
            <span className="font-semibold text-white">
              mean lokal per kelas
            </span>{" "}
            berbasis cosine similarity, sehingga lebih robust terhadap outlier
            dibanding KNN standar. Nilai{" "}
            <span className="font-semibold text-white">k = 9</span> dipilih via
            Grid Search dan 5 Fold Cross Validation.
          </p>
        </Panel>
        <Panel title="Conformal Prediction" accent>
          <p className="leading-snug">
            Menghasilkan{" "}
            <span className="font-semibold text-white">prediction set</span>{" "}
            bukan satu label. Sebuah kelas masuk set jika nilai p melebihi
            tingkat signifikansi &epsilon;, sehingga model dapat menyatakan
            ketidakpastiannya.
          </p>
        </Panel>
      </div>

      <div className="mt-4 grid flex-1 gap-3 sm:grid-cols-4">
        {[
          { t: "Nonconformity", d: "\u03b1 = jarak ke kelas benar" },
          { t: "Nilai p", d: "proporsi skor yang lebih janggal" },
          { t: "Prediction Set", d: "masuk jika p > \u03b5" },
          { t: "Credibility & Confidence", d: "ukuran keyakinan prediksi" },
        ].map((s, i) => (
          <div
            key={s.t}
            className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-lg font-black text-transparent">
              {i + 1}
            </div>
            <div className="mt-1 text-base font-semibold text-white sm:text-lg">
              {s.t}
            </div>
            <p className="mt-1 text-sm leading-snug text-white/60 sm:text-base">
              {s.d}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white/70 sm:text-lg">
        <span className="font-semibold text-white">Evaluasi:</span> Accuracy,
        Precision, Recall, F1 Score (Macro dan Weighted), Confusion Matrix,
        Coverage, Reliability Diagram, serta ukuran prediction set.
      </div>
    </div>
  </SlideShell>,

  // 7 — RESULTS: performa overall
  <SlideShell n={7} key="result-1" section="Results">
    <div className="flex h-full flex-col">
      <SectionHead title="Performa Model" note="16.213 data uji" />
      <div className="mt-5 grid flex-1 grid-cols-2 gap-4 sm:grid-cols-5">
        <StatCard
          value="44,75%"
          label="Accuracy"
          grad="from-teal-400 to-emerald-500"
        />
        <StatCard value="45,48%" label="F1 Macro" />
        <StatCard
          value="44,82%"
          label="F1 Weighted"
          grad="from-sky-400 to-indigo-500"
        />
        <StatCard
          value="45,68%"
          label="Precision"
          grad="from-cyan-400 to-blue-500"
        />
        <StatCard
          value="48,63%"
          label="Recall"
          grad="from-emerald-400 to-teal-500"
        />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-glass-green/25 bg-gradient-to-br from-glass-green/10 to-glass-blue/10 p-5">
          <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-5xl font-black text-transparent">
            48,1x
          </span>
          <p className="text-base leading-snug text-white/75 sm:text-lg">
            lebih baik dari baseline acak (0,93%). Model belajar pola nyata,
            jauh di atas tebakan.
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          <Icon type="check" className="h-10 w-10 shrink-0" />
          <p className="text-base leading-snug text-white/75 sm:text-lg">
            Tanpa overfitting: skor validasi silang{" "}
            <span className="font-semibold text-white">0,4574</span> sangat
            dekat dengan skor pengujian{" "}
            <span className="font-semibold text-white">0,4548</span>.
          </p>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 8 — RESULTS: optimasi hyperparameter
  <SlideShell n={8} key="result-2" section="Results">
    <div className="flex h-full flex-col">
      <Kicker>Optimasi Hyperparameter k</Kicker>
      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-5">
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 sm:col-span-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-white sm:text-2xl">
              Mean F1 Macro terhadap Nilai k
            </div>
            <div className="rounded-lg border border-glass-green/30 bg-glass-green/10 px-3 py-1 text-base font-bold text-white">
              Best k = 9
            </div>
          </div>
          <F1Curve className="mt-3 h-48 w-full" />
          <div className="mt-1 text-center text-base text-white/70 sm:text-lg">
            Mean F1 Macro terbaik{" "}
            <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-2xl font-black text-transparent">
              45,74%
            </span>
          </div>
        </div>
        <div className="sm:col-span-2">
          <Panel title="Pengaturan dan Temuan">
            <ul className="space-y-2.5">
              <li>Grid Search k = 1 sampai 51 (langkah 2)</li>
              <li>Validasi 5 Fold Cross Validation</li>
              <li>Metrik optimasi F1 Macro</li>
              <li className="pt-1 text-white/80">
                k terlalu kecil sensitif noise, terlalu besar over smoothing.{" "}
                <span className="font-semibold text-white">k = 9</span> paling
                seimbang.
              </li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 9 — RESULTS: confusion matrix
  <SlideShell n={9} key="result-3" section="Results">
    <div className="flex h-full flex-col">
      <Kicker>Confusion Matrix 20 Kelas Terbesar</Kicker>
      <div className="mt-3 flex min-h-0 flex-1 gap-4">
        <div className="relative min-h-0 flex-[2] rounded-2xl bg-white p-2">
          <img
            src="/confusion-matrix.png"
            alt="Confusion Matrix 20 kelas terbesar"
            className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] object-contain object-top"
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-lg font-semibold text-white">Cara Membaca</div>
            <p className="mt-1.5 text-sm leading-relaxed text-white/65 sm:text-base">
              Diagonal menunjukkan prediksi benar, sel di luar diagonal adalah
              kesalahan. Makin gelap sel, makin tinggi proporsinya (0 sampai 1).
            </p>
          </div>
          <div className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-lg font-semibold text-white">Sorotan</div>
            <ul className="mt-1.5 space-y-1.5 text-sm leading-relaxed text-white/65 sm:text-base">
              <li>Akurasi tinggi pada gigi (0,97) dan sakit kepala (0,94).</li>
              <li>
                Kesalahan terbesar menstruasi tertukar menstruasi intim wanita
                sebanyak 247 kasus.
              </li>
              <li>Kelas yang mirip secara topik cenderung saling tertukar.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 10 — RESULTS: performa per kelas
  <SlideShell n={10} key="result-4" section="Results">
    <div className="flex h-full flex-col">
      <Kicker>Performa per Kelas (F1 Score)</Kicker>
      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col rounded-2xl border border-glass-green/25 bg-white/5 p-5">
          <div className="text-xl font-semibold text-white sm:text-2xl">
            5 Kelas Teratas
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
            5 Kelas Terbawah
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
      <p className="mt-4 text-center text-base text-white/55 sm:text-lg">
        Rentang F1 per kelas 0,12 sampai 0,85. Kelas dengan gejala khas jauh
        lebih mudah dikenali dibanding kelas bergejala umum.
      </p>
    </div>
  </SlideShell>,

  // 11 — RESULTS: explainability / conformal prediction
  <SlideShell n={11} key="result-5" section="Results">
    <div className="flex h-full flex-col">
      <Kicker>Analisis Explainability (Conformal Prediction)</Kicker>
      <div className="mt-1 text-sm text-white/50 sm:text-base">
        LMPNN k = 9 &middot; kalibrasi 19.456 &middot; uji 16.213 &middot; 107
        kelas
      </div>
      <div className="mt-4 grid flex-1 gap-4 sm:grid-cols-3">
        <XaiCard
          title="Trade off Coverage vs Set Size"
          chart={
            <div className="w-full">
              <TradeoffChart className="h-24 w-full" />
              <div className="mt-1 flex items-center justify-center gap-3 text-sm text-white/60">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-3 rounded bg-[#38bdf8]" /> Coverage
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-3 rounded bg-[#fb923c]" /> Set Size
                </span>
              </div>
            </div>
          }
          stat="Coverage 89,61% pada ε = 0,10"
          pembahasan="Coverage mendekati target 90% (selisih 0,39%) dengan rata rata ukuran set 9,5 kelas. Singleton 3,7% dan empty set hanya 1,8%."
        />
        <XaiCard
          title="Reliability Diagram"
          chart={<ReliabilityChart className="h-28 w-28" />}
          stat="ECE 0,2210 · MCE 0,4528"
          pembahasan="Kurva keandalan mengikuti garis ideal. Keluaran keyakinan model cukup terkalibrasi sehingga layak dipercaya sebagai dasar keputusan."
        />
        <XaiCard
          title="Credibility dan Confidence"
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
          stat="Credibility 0,6093 · Confidence 0,5523"
          pembahasan="Prediksi benar memiliki credibility lebih tinggi (0,6750) dibanding yang salah (0,5561). Model mengenali kapan dirinya tidak yakin."
        />
      </div>
    </div>
  </SlideShell>,

  // 12 — DISCUSSION: interpretasi & implikasi
  <SlideShell n={12} key="disc-1" section="Discussion">
    <div className="flex h-full flex-col">
      <SectionHead title="Interpretasi Hasil" note="Pembahasan" />
      <div className="mt-5 grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            ic: "cpu" as const,
            t: "LMPNN Unggul",
            d: "Mean lokal per kelas lebih robust terhadap outlier dan stabil pada teks berdimensi tinggi.",
          },
          {
            ic: "layers" as const,
            t: "TF IDF dan Cosine",
            d: "Representasi sparse 5.000 dimensi menangkap pola semantik antar dokumen secara efektif.",
          },
          {
            ic: "target" as const,
            t: "k Optimal = 9",
            d: "Grid Search dan 5 Fold CV menyeimbangkan bias dan variance model.",
          },
          {
            ic: "bars" as const,
            t: "Skala 107 Kelas",
            d: "Untuk klasifikasi multi kelas ekstrem, F1 Macro sekitar 45% tergolong kompetitif.",
          },
        ].map((c) => (
          <div
            key={c.t}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <Icon type={c.ic} className="h-9 w-9" />
            <div className="mt-2 text-lg font-semibold text-white">{c.t}</div>
            <p className="mt-1.5 text-sm leading-snug text-white/65 sm:text-base">
              {c.d}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-glass-green/25 bg-gradient-to-br from-glass-green/10 to-glass-blue/10 px-4 py-3">
        <Icon type="shield" className="h-7 w-7 shrink-0" />
        <p className="text-base leading-relaxed text-white/80 sm:text-lg">
          <span className="font-semibold text-white">Nilai tambah XAI:</span>{" "}
          Conformal Prediction membuat model mampu menyatakan kapan tidak yakin,
          meningkatkan keamanan tanpa mengorbankan transparansi.
        </p>
      </div>
    </div>
  </SlideShell>,

  // 13 — DISCUSSION: keterbatasan & arah lanjutan
  <SlideShell n={13} key="disc-2" section="Discussion">
    <div className="flex h-full flex-col">
      <Kicker>Keterbatasan dan Arah Penelitian Lanjutan</Kicker>
      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col rounded-2xl border border-orange-400/25 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-400/10">
              <Icon type="warn" color="#fb923c" className="h-7 w-7" />
            </div>
            <div className="text-xl font-semibold text-white sm:text-2xl">
              Keterbatasan
            </div>
          </div>
          <ul className="mt-4 flex flex-1 flex-col justify-around gap-2.5 text-base leading-snug text-white/70 sm:text-lg">
            <li>Dataset dari satu platform sehingga berpotensi bias sumber.</li>
            <li>TF IDF belum menangkap konteks semantik yang mendalam.</li>
            <li>Kelas dengan gejala umum masih sulit dibedakan.</li>
            <li>
              Belum diuji pada dataset eksternal dan deployment real time.
            </li>
          </ul>
        </div>
        <div className="flex flex-col rounded-2xl border border-glass-green/25 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-glass-green/10">
              <Icon type="target" className="h-7 w-7" />
            </div>
            <div className="text-xl font-semibold text-white sm:text-2xl">
              Arah Lanjutan
            </div>
          </div>
          <ul className="mt-4 flex flex-1 flex-col justify-around gap-2.5 text-base leading-snug text-white/70 sm:text-lg">
            <li>Representasi semantik dengan IndoBERT.</li>
            <li>Eksplorasi model hybrid LMPNN dan embedding.</li>
            <li>Integrasi ke sistem triase kesehatan digital.</li>
            <li>Validasi eksternal dan uji klinis terbatas.</li>
          </ul>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 14 — KESIMPULAN
  <SlideShell n={14} key="kesimpulan" section="Penutup">
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5">
        <Icon type="check" className="h-7 w-7" />
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Kesimpulan
        </h2>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { v: "81.064", l: "Data Bersih" },
          { v: "107", l: "Kelas Medis" },
          { v: "45,48%", l: "F1 Macro" },
          { v: "89,61%", l: "Coverage" },
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
            d: "LMPNN yang dipadukan Conformal Prediction berhasil mengklasifikasi teks tanya jawab kesehatan bahasa Indonesia.",
          },
          {
            n: "2",
            t: "Performa Kompetitif",
            d: "Accuracy 44,75% dan F1 Macro 45,48%, yaitu 48,1x baseline acak tanpa overfitting.",
          },
          {
            n: "3",
            t: "Explainability Teruji",
            d: "Coverage 89,61% pada \u03b5 = 0,10, dilengkapi credibility dan confidence sebagai ukuran ketidakpastian.",
          },
          {
            n: "4",
            t: "Transparan dan Interpretable",
            d: "Setiap prediksi dijelaskan melalui nearest neighbors, memenuhi prinsip XAI tanpa teknik tambahan.",
          },
        ].map((c) => (
          <div
            key={c.n}
            className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-glass-green to-glass-blue text-base font-bold text-[#04121a]">
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

  // 15 — SARAN & PENUTUP
  <SlideShell n={15} key="saran" section="Penutup">
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
            t: "Representasi Berbasis Model Bahasa",
            d: "Menggunakan IndoBERT sebagai pengganti TF IDF untuk menangkap makna kontekstual gejala.",
          },
          {
            n: "2",
            t: "Variasi Nonconformity Measure",
            d: "Menerapkan Mondrian Conformal Prediction agar coverage terkalibrasi per kelas medis.",
          },
          {
            n: "3",
            t: "Klasifikasi Multi Label",
            d: "Mengakomodasi pertanyaan yang relevan pada lebih dari satu kategori sekaligus.",
          },
          {
            n: "4",
            t: "Sistem Pendukung Keputusan Klinis",
            d: "Mewujudkan sistem AI transparan pada platform kesehatan digital Indonesia.",
          },
        ].map((c) => (
          <div
            key={c.n}
            className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-glass-green to-glass-blue text-base font-bold text-[#04121a]">
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
        <div className="col-span-2 flex items-center justify-center gap-3 rounded-2xl border border-glass-green/25 bg-gradient-to-br from-glass-green/10 to-glass-blue/10 p-4 text-center">
          <p className="text-lg font-semibold text-white sm:text-2xl">
            Saya siap menjawab pertanyaan dari dewan penguji.
          </p>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 16 — PENUTUP: QR code, web HeCa AI, dan terima kasih
  <SlideShell n={16} key="penutup-qr" section="Penutup">
    <div className="flex h-full flex-col items-center justify-center text-center">
      <h2 className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl">
        Terima Kasih
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-white/65 sm:text-2xl">
        Coba langsung HeCa AI, asisten tanya jawab kesehatan berbasis
        Explainable AI yang transparan.
      </p>

      <div className="mt-7 flex items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:gap-8 sm:p-8">
        <div className="rounded-2xl bg-white p-3">
          <img
            src={qrCode.src}
            alt="QR code menuju web HeCa AI"
            className="h-36 w-36 object-contain sm:h-44 sm:w-44"
          />
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-base">
            Pindai QR Code
          </div>
          <div className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Akses HeCa AI
          </div>
          <a
            href="https://heca-ai.vercel.app"
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-glass-green/30 bg-glass-green/10 px-4 py-2 text-base font-medium text-white sm:text-lg"
          >
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-glass-green to-glass-blue" />
            heca-ai.vercel.app
          </a>
          <p className="mt-3 max-w-xs text-base leading-snug text-white/60">
            Arahkan kamera ponsel ke QR code untuk membuka aplikasinya.
          </p>
        </div>
      </div>
    </div>
  </SlideShell>,
];

/* ============================== COMPONENT ================================= */

export default function Presentation() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(() => setI((v) => Math.min(v + 1, TOTAL - 1)), []);
  const prev = useCallback(() => setI((v) => Math.max(v - 1, 0)), []);

  const [exporting, setExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  // Muat font Poppins sekali agar tampilan dan hasil ekspor PDF konsisten.
  useEffect(() => {
    const id = "heca-poppins-font";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  const downloadPdf = useCallback(async () => {
    if (exporting) return;
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const s = document.createElement("script");
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Gagal memuat " + src));
        document.head.appendChild(s);
      });
    setExporting(true);
    try {
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
      );
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
      );
      try {
        await (document as any).fonts?.ready;
      } catch {}
      const h2c = (window as any).html2canvas;
      const JsPdf = (window as any).jspdf?.jsPDF;
      const container = exportRef.current;
      if (!h2c || !JsPdf || !container) throw new Error("Modul PDF belum siap");
      const slides = Array.from(
        container.querySelectorAll<HTMLElement>("[data-export-slide]"),
      );
      const pdf = new JsPdf({
        orientation: "landscape",
        unit: "px",
        format: [1280, 720],
      });
      for (let idx = 0; idx < slides.length; idx++) {
        const canvas = await h2c(slides[idx], {
          scale: 2,
          backgroundColor: "#0a1020",
          useCORS: true,
          logging: false,
        });
        const img = canvas.toDataURL("image/jpeg", 0.92);
        if (idx > 0) pdf.addPage([1280, 720], "landscape");
        pdf.addImage(img, "JPEG", 0, 0, 1280, 720);
      }
      pdf.save("HeCa_AI_Presentasi_Sidang.pdf");
    } catch (err) {
      console.error(err);
      alert(
        "Maaf, gagal membuat PDF. Pastikan ada koneksi internet lalu coba lagi.",
      );
    } finally {
      setExporting(false);
    }
  }, [exporting]);

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
    <div
      style={{ fontFamily: FONT }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={close}
        className="animate-fadeIn absolute inset-0 bg-black/50 backdrop-blur-xl"
      />

      <div className="animate-popIn relative w-full max-w-5xl">
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="text-base font-medium text-white/80">
            Presentasi Sidang &middot; HeCa AI
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={downloadPdf}
              disabled={exporting}
              aria-label="Download PDF presentasi"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {exporting ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Menyiapkan…
                </>
              ) : (
                <>⬇ Download PDF</>
              )}
            </button>
            <button
              onClick={close}
              aria-label="Tutup"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:scale-105 active:scale-95"
            >
              ✕
            </button>
          </div>
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

      {/* Kontainer tersembunyi untuk ekspor PDF (semua slide 1280x720) */}
      <div
        ref={exportRef}
        aria-hidden
        style={{
          position: "fixed",
          left: "-10000px",
          top: 0,
          width: "1280px",
          pointerEvents: "none",
          fontFamily: FONT,
        }}
      >
        {SLIDES.map((s, idx) => (
          <div
            key={idx}
            data-export-slide
            style={{ width: "1280px", height: "720px" }}
            className="relative overflow-hidden"
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
