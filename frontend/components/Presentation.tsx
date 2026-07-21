"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

/**
 * Deck presentasi Sidang Skripsi — muncul sebagai pop-up saat logo HeCa AI
 * diklik. Slide 16:9 (layaknya PPT), desain selaras web HeCa AI.
 *
 * Memicu dari mana pun:
 *   onClick={() => window.dispatchEvent(new CustomEvent("open-heca-deck"))}
 *
 * Isi: BAGIAN PEMBUKAAN (4) + BAGIAN 1 LATAR BELAKANG (5) = 9 slide.
 */

const TOTAL = 9;

function SlideShell({ children, n }: { children: ReactNode; n: number }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a1020] px-8 py-6 sm:px-12 sm:py-9">
      {/* dekorasi gradasi */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-glass-green/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-glass-blue/20 blur-3xl" />

      {/* header slide */}
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

      {/* isi slide */}
      <div className="relative z-10 flex flex-1 flex-col justify-center py-3">
        {children}
      </div>

      {/* footer slide */}
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
      <Kicker>Fokus Penelitian</Kicker>
      <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
        Membuka “kotak hitam” AI kesehatan dengan pendekatan yang transparan dan
        dapat dijelaskan
      </h2>
      <div className="mt-6 flex flex-wrap gap-2.5">
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
      <Kicker>Peneliti</Kicker>
      <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-4xl">
        Alif Gumelar Syah Moeslim
      </h2>
      <p className="mt-1 text-base text-white/60 sm:text-lg">
        NIM 220660121161
      </p>
      <div className="mt-6 grid gap-2 text-sm text-white/70 sm:text-base">
        <div>Program Studi Informatika</div>
        <div>Fakultas Teknologi Informasi</div>
        <div>Universitas Sebelas April</div>
      </div>
    </div>
  </SlideShell>,

  // 4 — Dosen Pembimbing
  <SlideShell n={4} key="pembimbing">
    <div>
      <Kicker>Dosen Pembimbing</Kicker>
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

  // 5 — Divider Bagian 1
  <SlideShell n={5} key="bab1-divider">
    <div className="max-w-3xl">
      <div className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-6xl font-black leading-none tracking-tighter text-transparent sm:text-8xl">
        01
      </div>
      <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-4xl">
        Latar Belakang Penelitian
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
        Mengapa Explainable AI dengan LMPNN dan Conformal Prediction penting
        untuk klasifikasi teks kesehatan?
      </p>
    </div>
  </SlideShell>,

  // 6 — Ledakan data & Black Box
  <SlideShell n={6} key="bab1-masalah">
    <div>
      <Kicker>Latar Belakang · Konteks &amp; Masalah</Kicker>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm font-semibold text-white">
            Ledakan Data Kesehatan Digital
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
              288.105
            </span>
            <span className="text-xs text-white/60">data mentah</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-white/60">
            Indonesia QnA Health Dataset (Alodokter). Pertanyaan kesehatan di
            platform digital terus meningkat setiap hari.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm font-semibold text-white">
            Permasalahan Utama: “Black Box”
          </div>
          <p className="mt-2 text-xs leading-relaxed text-white/60">
            Model AI berperforma tinggi, namun sering bertindak sebagai kotak
            hitam:
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-white/70">
            <li>✗ Keputusan tidak transparan</li>
            <li>✗ Sulit dipahami pengguna</li>
            <li>✗ Risiko salah rekomendasi di domain kesehatan</li>
          </ul>
        </div>
      </div>
      <p className="mt-4 text-center text-xs italic text-white/50">
        “Dalam dunia medis, penjelasan sangatlah penting — kepercayaan harus
        dibangun.”
      </p>
    </div>
  </SlideShell>,

  // 7 — Tantangan spesifik
  <SlideShell n={7} key="bab1-tantangan">
    <div>
      <Kicker>Tantangan Spesifik Klasifikasi Teks Kesehatan</Kicker>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          {
            t: "Bahasa Alami yang Beragam",
            d: "Ekspresi pertanyaan kesehatan sangat bervariasi dan tidak terstruktur.",
          },
          {
            t: "Jumlah Kelas Banyak",
            d: "Setelah filtering: 81.064 data dari 107 kelas medis (min. 300 data/kelas).",
          },
          {
            t: "Data Tidak Seimbang",
            d: "Sebaran data antar kelas tidak seimbang, memengaruhi performa model.",
          },
          {
            t: "Transparansi & Keamanan",
            d: "Keputusan harus dapat dijelaskan dan dipercaya tenaga medis/pengguna.",
          },
        ].map((c) => (
          <div
            key={c.t}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="text-sm font-semibold text-white">{c.t}</div>
            <p className="mt-1.5 text-xs leading-relaxed text-white/60">
              {c.d}
            </p>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>,

  // 8 — Pendekatan
  <SlideShell n={8} key="bab1-pendekatan">
    <div>
      <Kicker>Pendekatan</Kicker>
      <p className="mt-3 text-sm text-white/70 sm:text-base">
        Menggabungkan performa prediksi yang kuat dengan penjelasan yang dapat
        dipahami.
      </p>
      <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-base font-bold text-white">LMPNN</div>
          <p className="mt-1 text-xs text-white/60">
            Prediksi berbasis tetangga yang lebih representatif.
          </p>
        </div>
        <div className="text-center text-xl font-black text-white/40">+</div>
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-base font-bold text-white">
            Conformal Prediction
          </div>
          <p className="mt-1 text-xs text-white/60">
            Prediksi dengan ukuran ketidakpastian yang terukur.
          </p>
        </div>
        <div className="text-center text-xl font-black text-white/40">=</div>
        <div className="flex-1 rounded-2xl border border-glass-green/30 bg-gradient-to-br from-glass-green/15 to-glass-blue/15 p-4">
          <div className="text-sm font-bold text-white">
            Akurat, Transparan &amp; Dapat Dipercaya
          </div>
          <p className="mt-1 text-xs text-white/70">
            Prediksi disertai penjelasan yang jelas.
          </p>
        </div>
      </div>
    </div>
  </SlideShell>,

  // 9 — Dampak + tagline
  <SlideShell n={9} key="bab1-dampak">
    <div>
      <Kicker>Dampak yang Diharapkan</Kicker>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          "Meningkatkan kepercayaan terhadap sistem AI kesehatan.",
          "Membantu tenaga medis dalam pengambilan keputusan.",
          "Mendukung layanan kesehatan digital yang aman & bertanggung jawab.",
        ].map((d, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-lg font-black text-transparent">
              0{idx + 1}
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-white/70">{d}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm font-medium text-white/80 sm:text-base">
        Bukan hanya tentang jawaban yang{" "}
        <span className="text-white">benar</span>, tapi juga{" "}
        <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text font-bold text-transparent">
          mengapa
        </span>{" "}
        jawaban itu diberikan.
      </p>
    </div>
  </SlideShell>,
];

export default function Presentation() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(() => setI((v) => Math.min(v + 1, TOTAL - 1)), []);
  const prev = useCallback(() => setI((v) => Math.max(v - 1, 0)), []);

  // Buka via event global (logo footer memakai ini lewat page.tsx).
  useEffect(() => {
    const openDeck = () => {
      setI(0);
      setOpen(true);
    };
    window.addEventListener("open-heca-deck", openDeck);
    return () => window.removeEventListener("open-heca-deck", openDeck);
  }, []);

  // Sambungkan logo di Navbar/header secara otomatis (tanpa mengubah Navbar).
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
