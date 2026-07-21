"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

/**
 * Deck presentasi Sidang Skripsi — pop-up saat logo HeCa AI diklik.
 * Slide 16:9 (layaknya PPT), desain selaras web HeCa AI, dengan visual/grafik.
 *
 * Memicu dari mana pun:
 *   onClick={() => window.dispatchEvent(new CustomEvent("open-heca-deck"))}
 *
 * Isi (padat): PEMBUKAAN (1) + LATAR BELAKANG (3) + METODE (3) = 7 slide.
 */

const TOTAL = 7;

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
      <g stroke="url(#gNode)" strokeWidth="1" opacity="0.45">
        <line x1="20" y1="30" x2="60" y2="60" />
        <line x1="60" y1="60" x2="100" y2="25" />
        <line x1="60" y1="60" x2="95" y2="95" />
        <line x1="60" y1="60" x2="25" y2="90" />
        <line x1="20" y1="30" x2="25" y2="90" />
      </g>
      <g fill="url(#gNode)">
        <circle cx="20" cy="30" r="5" />
        <circle cx="100" cy="25" r="4" />
        <circle cx="95" cy="95" r="4" />
        <circle cx="25" cy="90" r="5" />
        <circle cx="60" cy="60" r="7" />
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
      <line x1="8" y1="72" x2="126" y2="72" stroke="#334155" strokeWidth="1" />
    </svg>
  );
}

function BlackBoxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 64" className={className}>
      <rect
        x="20"
        y="16"
        width="34"
        height="34"
        rx="5"
        fill="#0b1120"
        stroke="#475569"
        strokeWidth="1.5"
      />
      <text
        x="37"
        y="40"
        textAnchor="middle"
        fill="#e2e8f0"
        fontSize="22"
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
    <svg viewBox="0 0 24 24" className="h-6 w-6">
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
          strokeWidth="15"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#34d399"
          strokeWidth="15"
          strokeDasharray={`${seg(64)} ${C - seg(64)}`}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="15"
          strokeDasharray={`${seg(16)} ${C - seg(16)}`}
          strokeDashoffset={-seg(64)}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#64748b"
          strokeWidth="15"
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
        strokeWidth="1"
      />
      <line x1="30" y1="15" x2="30" y2="100" stroke="#334155" strokeWidth="1" />
      <polyline
        points={pts}
        fill="none"
        stroke="url(#gLine)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <line
        x1="59"
        y1="23"
        x2="59"
        y2="100"
        stroke="#34d399"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.6"
      />
      <circle
        cx="59"
        cy="23"
        r="4"
        fill="#0a1020"
        stroke="#34d399"
        strokeWidth="2"
      />
      <text x="63" y="15" fill="#ffffff" fontSize="9" fontWeight="bold">
        k = 9
      </text>
      <text x="120" y="114" textAnchor="middle" fill="#94a3b8" fontSize="8">
        Nilai k (1 – 51)
      </text>
      <text
        x="12"
        y="58"
        fill="#94a3b8"
        fontSize="8"
        transform="rotate(-90 12 58)"
      >
        F1-Macro
      </text>
    </svg>
  );
}

/* ---------------------------------- Shell ---------------------------------- */

function SlideShell({ children, n }: { children: ReactNode; n: number }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a1020] px-7 py-5 sm:px-11 sm:py-7">
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-glass-green/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-glass-blue/20 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="HeCa AI"
            className="h-6 w-6 rounded-lg object-contain"
          />
          <span className="text-xs font-semibold tracking-tight text-white sm:text-sm">
            HeCa AI
          </span>
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 sm:text-xs">
          Sidang Skripsi · 2026
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center py-2">
        {children}
      </div>

      <div className="relative z-10 flex items-center justify-between text-[10px] text-white/40 sm:text-[11px]">
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
    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 sm:text-xs">
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
        "rounded-2xl border p-4 " +
        (accent
          ? "border-glass-green/30 bg-gradient-to-br from-glass-green/15 to-glass-blue/15"
          : "border-white/10 bg-white/5")
      }
    >
      {title && <div className="text-sm font-semibold text-white">{title}</div>}
      <div className="mt-2 text-xs leading-relaxed text-white/65">
        {children}
      </div>
    </div>
  );
}

/* --------------------------------- Slides ---------------------------------- */

const SLIDES: ReactNode[] = [
  // 1 — PEMBUKAAN (all-in-one)
  <SlideShell n={1} key="cover">
    <div className="relative">
      <NodeGraph className="pointer-events-none absolute -right-2 -top-3 hidden h-24 w-24 opacity-70 sm:block" />
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-glass-green to-glass-blue" />
        Presentasi Sidang Skripsi · 2026
      </div>
      <h1 className="max-w-3xl text-xl font-black leading-tight tracking-tight text-white sm:text-3xl">
        Implementasi{" "}
        <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-transparent">
          Explainable AI
        </span>{" "}
        untuk Klasifikasi Tanya Jawab Kesehatan Bahasa Indonesia
      </h1>
      <p className="mt-2 text-xs text-white/60 sm:text-sm">
        Menggunakan Metode K-Nearest Neighbors (KNN)
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Panel title="Peneliti">
          <div className="text-sm font-semibold text-white">
            Alif Gumelar Syah Moeslim
          </div>
          <div className="text-white/50">NIM 220660121161</div>
          <div className="mt-2 leading-snug">
            Program Studi Informatika · Fakultas Teknologi Informasi
            <br />
            Universitas Sebelas April
          </div>
        </Panel>
        <Panel title="Dosen Pembimbing">
          <div className="space-y-1.5">
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
    <div>
      <div className="flex items-baseline gap-3">
        <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-3xl font-black tracking-tighter text-transparent sm:text-4xl">
          01
        </span>
        <h2 className="text-lg font-black tracking-tight text-white sm:text-2xl">
          Latar Belakang Penelitian
        </h2>
      </div>
      <p className="mt-1 max-w-2xl text-xs text-white/55">
        Mengapa Explainable AI dengan LMPNN &amp; Conformal Prediction penting
        untuk klasifikasi teks kesehatan?
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Panel title="Ledakan Data Kesehatan Digital">
          <div className="flex items-center gap-3">
            <GrowthChart className="h-14 w-24 shrink-0" />
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-2xl font-black text-transparent">
                  288.105
                </span>
                <span className="text-[11px] text-white/60">data mentah</span>
              </div>
              <p className="mt-1 text-[11px] leading-snug">
                Indonesia QnA Health Dataset (Alodokter). Pertanyaan kesehatan
                online terus meningkat.
              </p>
            </div>
          </div>
        </Panel>
        <Panel title={"Permasalahan Utama: “Black Box”"}>
          <div className="flex items-center gap-3">
            <BlackBoxIcon className="h-14 w-16 shrink-0" />
            <ul className="space-y-1 text-white/70">
              <li>✗ Keputusan tidak transparan</li>
              <li>✗ Sulit dipahami pengguna</li>
              <li>✗ Risiko salah rekomendasi medis</li>
            </ul>
          </div>
        </Panel>
      </div>
      <p className="mt-3 text-center text-[11px] italic text-white/50">
        “Dalam dunia medis, penjelasan sangatlah penting — kepercayaan harus
        dibangun.”
      </p>
    </div>
  </SlideShell>,

  // 3 — LATAR BELAKANG: tantangan
  <SlideShell n={3} key="lb-tantangan">
    <div>
      <Kicker>Tantangan Spesifik Klasifikasi Teks Kesehatan</Kicker>
      <div className="mt-4 grid grid-cols-2 gap-3">
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
            className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
              <ChallengeIcon type={c.ic} />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{c.t}</div>
              <p className="mt-1 text-[11px] leading-snug text-white/60">
                {c.d}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>,

  // 4 — LATAR BELAKANG: pendekatan & dampak
  <SlideShell n={4} key="lb-pendekatan">
    <div>
      <Kicker>Pendekatan &amp; Dampak yang Diharapkan</Kicker>
      <div className="mt-3 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="text-sm font-bold text-white">LMPNN</div>
          <p className="mt-0.5 text-[11px] text-white/60">
            Prediksi berbasis tetangga yang representatif.
          </p>
        </div>
        <div className="text-center text-lg font-black text-white/40">+</div>
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="text-sm font-bold text-white">
            Conformal Prediction
          </div>
          <p className="mt-0.5 text-[11px] text-white/60">
            Prediksi dengan ketidakpastian terukur.
          </p>
        </div>
        <div className="text-center text-lg font-black text-white/40">=</div>
        <div className="flex-1 rounded-2xl border border-glass-green/30 bg-gradient-to-br from-glass-green/15 to-glass-blue/15 p-3">
          <div className="text-xs font-bold text-white">
            Akurat, Transparan &amp; Dipercaya
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          "Meningkatkan kepercayaan pada sistem AI kesehatan.",
          "Membantu tenaga medis mengambil keputusan.",
          "Mendukung layanan kesehatan digital yang bertanggung jawab.",
        ].map((d, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-white/10 bg-white/5 p-3"
          >
            <div className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-base font-black text-transparent">
              0{idx + 1}
            </div>
            <p className="mt-1 text-[11px] leading-snug text-white/70">{d}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs font-medium text-white/80 sm:text-sm">
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
    <div>
      <div className="flex items-baseline gap-3">
        <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-3xl font-black tracking-tighter text-transparent sm:text-4xl">
          02
        </span>
        <h2 className="text-lg font-black tracking-tight text-white sm:text-2xl">
          Metode Penelitian
        </h2>
        <span className="text-[11px] text-white/45">Alur Metodologi</span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
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
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-center"
          >
            <div className="mx-auto flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-glass-green to-glass-blue text-[10px] font-bold text-white">
              {idx + 1}
            </div>
            <div className="mt-1 text-[10px] font-semibold leading-tight text-white">
              {t}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Panel title="Dataset">
          Indonesia QnA Health Dataset (Alodokter) · Kaggle.
          <div className="mt-2 flex items-center gap-2">
            <span className="font-semibold text-white">288.105</span> data
            mentah
            <span className="text-white/30">→</span>
            <span className="font-semibold text-white">81.064</span> data ·
            <span className="font-semibold text-white">107</span> kelas
          </div>
        </Panel>
        <Panel title="Preprocessing Pipeline">
          <div className="flex flex-wrap gap-1 text-[10px] text-white/75">
            {[
              "Case Folding",
              "Cleaning",
              "Tokenization",
              "Stopword",
              "Stemming",
            ].map((x) => (
              <span key={x} className="rounded bg-white/10 px-1.5 py-0.5">
                {x}
              </span>
            ))}
          </div>
          <div className="mt-2">
            <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-lg font-black text-transparent">
              54,4%
            </span>{" "}
            reduksi rata-rata token/dokumen
          </div>
        </Panel>
      </div>
    </div>
  </SlideShell>,

  // 6 — METODE: fitur, split, modeling (dengan grafik)
  <SlideShell n={6} key="m-model">
    <div>
      <Kicker>Ekstraksi Fitur, Pembagian Data &amp; Modeling</Kicker>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="space-y-3">
          <Panel title="Feature Extraction — TF-IDF">
            max_features 5.000 · ngram (1,2) · min_df 2
            <div className="mt-1 font-mono text-[10px] text-white/50">
              Sparse Matrix 81.064 × 5.000
            </div>
          </Panel>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-sm font-semibold text-white">
              Split Data (Stratified)
            </div>
            <div className="mt-2 flex items-center gap-3">
              <SplitDonut className="h-20 w-20 shrink-0" />
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
                  Training <span className="font-semibold text-white">64%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#22d3ee]" />
                  Calibration{" "}
                  <span className="font-semibold text-white">16%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#64748b]" />
                  Testing <span className="font-semibold text-white">20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Panel title="LMPNN">
            Mean lokal (centroid) tiap kelas → jarak cosine query–centroid →
            prediksi kelas terdekat.
            <div className="mt-1 rounded bg-white/5 px-2 py-1 text-center font-mono text-[10px] text-white/70">
              Prediksi = argminᴄ d(xₒ, μᴄ)
            </div>
          </Panel>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">
                Grid Search k
              </div>
              <div className="rounded-md border border-glass-green/30 bg-glass-green/10 px-2 py-0.5 text-[11px] font-bold text-white">
                k = 9
              </div>
            </div>
            <F1Curve className="mt-1 h-24 w-full" />
            <div className="text-center text-[10px] text-white/50">
              5-Fold CV · optimasi F1-Macro (CP = 0.4548)
            </div>
          </div>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 7 — METODE: explainability + evaluasi
  <SlideShell n={7} key="m-eval">
    <div>
      <Kicker>Explainability (Conformal Prediction) &amp; Evaluasi</Kicker>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {[
          { t: "Query Baru", d: "Pertanyaan pengguna." },
          { t: "Model LMPNN", d: "Jarak ke centroid kelas." },
          { t: "Nonconformity", d: "αᵢ = d(xᵢ, yᵢ)." },
          { t: "P-value", d: "pᵧ = (|{αᵢ≥αₒ}|+1)/(n+1)" },
          { t: "Prediction Set", d: "Masukkan jika pᵧ > ε." },
        ].map((s, idx) => (
          <div
            key={s.t}
            className="rounded-xl border border-white/10 bg-white/5 p-2.5"
          >
            <div className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-xs font-black text-transparent">
              {idx + 1}
            </div>
            <div className="mt-0.5 text-[11px] font-semibold text-white">
              {s.t}
            </div>
            <p className="mt-0.5 text-[10px] leading-snug text-white/60">
              {s.d}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-white/55">
        Credibility = 1 − ε · Confidence = max(pᵧ)
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Panel title="Metrik Klasifikasi">
          Accuracy · Precision · Recall · F1-Score (Macro &amp; Weighted) ·
          Confusion Matrix
        </Panel>
        <Panel title="Evaluasi Explainability">
          Coverage (target 1−ε) · Credibility · Confidence · Prediction Set Size
          · Reliability Diagram
        </Panel>
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
          <div className="text-sm font-medium text-white/80">
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
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
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
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Selanjutnya →
          </button>
        </div>
      </div>
    </div>
  );
}
