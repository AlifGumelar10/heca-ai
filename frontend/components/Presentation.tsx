"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

/**
 * Deck presentasi Sidang Skripsi — muncul sebagai pop-up saat logo HeCa AI
 * diklik. Slide berukuran 16:9 (layaknya PPT), desain selaras web HeCa AI.
 *
 * Cara memicu dari mana pun (mis. logo Navbar / footer):
 *   onClick={() => window.dispatchEvent(new CustomEvent("open-heca-deck"))}
 *
 * BAGIAN 1 — PEMBUKAAN (4 slide). Bagian lain dari poster menyusul.
 */

const TOTAL = 4;

function SlideShell({ children, n }: { children: ReactNode; n: number }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a1020] px-8 py-7 sm:px-14 sm:py-12">
      {/* dekorasi gradasi */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-glass-green/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-glass-blue/20 blur-3xl" />

      {/* header slide */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="HeCa AI"
            className="h-7 w-7 rounded-lg object-contain"
          />
          <span className="text-sm font-semibold tracking-tight text-white">
            HeCa AI
          </span>
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 sm:text-xs">
          Sidang Skripsi · 2026
        </span>
      </div>

      {/* isi slide */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        {children}
      </div>

      {/* footer slide */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-white/40 sm:text-[11px]">
        <span>Universitas Sebelas April</span>
        <span className="tabular-nums">{String(n).padStart(2, "0")} / 04</span>
      </div>
    </div>
  );
}

const SLIDES: ReactNode[] = [
  // 1 — Cover
  <SlideShell n={1} key="cover">
    <div className="max-w-3xl">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-glass-green to-glass-blue" />
        Presentasi Sidang Skripsi
      </div>
      <h1 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl">
        Implementasi{" "}
        <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-transparent">
          Explainable AI
        </span>{" "}
        untuk Klasifikasi Tanya Jawab Kesehatan Bahasa Indonesia
      </h1>
      <p className="mt-4 text-sm text-white/60 sm:text-lg">
        Menggunakan Metode K-Nearest Neighbors (KNN)
      </p>
      <div className="mt-8 flex items-center gap-3">
        <div className="h-px w-10 bg-white/20" />
        <p className="text-xs text-white/70 sm:text-sm">
          Alif Gumelar Syah Moeslim · 220660121161
        </p>
      </div>
    </div>
  </SlideShell>,

  // 2 — Fokus penelitian
  <SlideShell n={2} key="fokus">
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        Fokus Penelitian
      </div>
      <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
        Membuka “kotak hitam” AI kesehatan dengan pendekatan yang transparan dan
        dapat dijelaskan
      </h2>
      <div className="mt-7 flex flex-wrap gap-2.5">
        {[
          "Explainable AI (XAI)",
          "LMPNN k=9",
          "Split Conformal Prediction",
          "KNN",
          "Telemedicine",
        ].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 sm:text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </SlideShell>,

  // 3 — Peneliti
  <SlideShell n={3} key="peneliti">
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        Peneliti
      </div>
      <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-4xl">
        Alif Gumelar Syah Moeslim
      </h2>
      <p className="mt-1 text-base text-white/60 sm:text-lg">
        NIM 220660121161
      </p>
      <div className="mt-7 grid gap-2 text-sm text-white/70 sm:text-base">
        <div>Program Studi Informatika</div>
        <div>Fakultas Teknologi Informasi</div>
        <div>Universitas Sebelas April</div>
      </div>
    </div>
  </SlideShell>,

  // 4 — Dosen Pembimbing
  <SlideShell n={4} key="pembimbing">
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        Dosen Pembimbing
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs text-white/50">Pembimbing 1</div>
          <div className="mt-1 text-base font-semibold text-white sm:text-lg">
            Esa Firmansyah, S.T., M.Kom.
          </div>
          <div className="mt-1 text-xs text-white/50">
            NUPTK 6458757658130102
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs text-white/50">Pembimbing 2</div>
          <div className="mt-1 text-base font-semibold text-white sm:text-lg">
            Beben Sutara, S.Kom., M.T.
          </div>
          <div className="mt-1 text-xs text-white/50">
            NUPTK 8549767668130232
          </div>
        </div>
      </div>
    </div>
  </SlideShell>,
];

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
      {/* backdrop blur ala iPhone */}
      <div
        onClick={close}
        className="animate-fadeIn absolute inset-0 bg-black/50 backdrop-blur-xl"
      />

      <div className="animate-popIn relative w-full max-w-5xl">
        {/* toolbar atas */}
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

        {/* slide 16:9 */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-glass-lg ring-1 ring-white/10">
          {SLIDES[i]}
        </div>

        {/* kontrol bawah */}
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
