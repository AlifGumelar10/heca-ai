"use client";

type Props = { onStart: () => void };

const stats = [
  { num: "107", label: "Kelas Medis" },
  { num: "k=9", label: "LMPNN" },
  { num: "64.851", label: "Data Latih" },
  { num: "89,6%", label: "Coverage CP" },
];

export default function Hero({ onStart }: Props) {
  return (
    <header className="relative mx-auto max-w-5xl px-4 pb-10 pt-16 text-center">
      <div className="animate-riseIn">
        <div className="glass-soft mx-auto mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-ink-soft">
          <span className="h-2 w-2 animate-pulseDot rounded-full bg-glass-green" />
          LMPNN + Conformal Prediction · Live
        </div>

        <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          Pahami keluhan
          <br />
          kesehatan Anda,
          <br />
          <span className="bg-gradient-to-r from-glass-blue via-glass-green to-glass-orange bg-clip-text text-transparent">
            dengan jaminan statistik.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">
          HeCa AI mengklasifikasikan teks pertanyaan medis berbahasa Indonesia
          ke dalam 107 kategori. Setiap jawaban dilengkapi visualisasi tetangga
          terdekat (KNN) dan tingkat keyakinan Conformal Prediction yang
          transparan.
        </p>

        <div className="mt-9 flex items-center justify-center gap-3">
          <button
            onClick={onStart}
            className="rounded-full bg-ink px-7 py-3.5 font-medium text-white shadow-glass transition-all hover:opacity-85 active:scale-95"
          >
            Coba Sekarang
          </button>
          <a
            href="#cara-kerja"
            className="glass rounded-full px-7 py-3.5 font-medium transition-all hover:bg-white/70 active:scale-95"
          >
            Cara Kerja
          </a>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-4xl px-4 py-5">
              <div className="text-3xl font-semibold tracking-tight">
                {s.num}
              </div>
              <div className="mt-1 text-sm text-ink-soft">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
