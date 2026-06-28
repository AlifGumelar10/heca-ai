"use client";

import { useEffect, useState } from "react";

/**
 * "Keilmuan Algoritma" — laci kedua bergaya POSTER.
 * Menjelaskan dua pilar ilmiah HeCa AI secara mendalam namun tetap mudah
 * dipahami orang awam:
 *   1. LMPNN (Local Mean Pseudo Nearest Neighbor) — mesin klasifikasi.
 *   2. Split Conformal Prediction — jaminan statistik kepercayaan.
 * Pop-up TENGAH layar ala Apple UI (sudut membulat, kaca buram, animasi pop).
 * Typography besar bergaya poster: eyebrow, display title, gradien, badge.
 */

const lmpnnSteps = [
  {
    n: "1",
    title: "Cari Tetangga per Kelas",
    desc: "Untuk setiap kategori penyakit, sistem mengambil k contoh nyata yang paling mirip dengan keluhan yang Anda tulis (di sini k = 9).",
  },
  {
    n: "2",
    title: "Hitung Local Mean",
    desc: "Alih-alih melihat satu tetangga, LMPNN merata-ratakan tetangga itu menjadi sebuah titik wakil (local mean vector) per kelas. Ini meredam noise dan data pencilan.",
  },
  {
    n: "3",
    title: "Bangun Pseudo Neighbor",
    desc: "Titik wakil tadi diperlakukan sebagai tetangga semu (pseudo nearest neighbor) yang mewakili karakter khas tiap kelas.",
  },
  {
    n: "4",
    title: "Ukur Jarak & Putuskan",
    desc: "Keluhan Anda dibandingkan ke setiap pseudo neighbor. Kelas dengan jarak terdekat menjadi prediksi utama.",
  },
];

const cpConcepts = [
  {
    tag: "Nonconformity",
    color: "text-glass-blue",
    title: "Skor Keanehan",
    desc: "Mengukur seberapa 'asing' sebuah teks bila dimasukkan ke suatu kelas. Makin kecil skornya, makin pas teks itu untuk kelas tersebut.",
  },
  {
    tag: "p-value",
    color: "text-glass-green",
    title: "Seberapa Wajar",
    desc: "Membandingkan skor keanehan teks Anda dengan ribuan contoh kalibrasi. Nilai tinggi berarti tebakan itu sangat wajar secara statistik.",
  },
  {
    tag: "Credibility",
    color: "text-glass-orange",
    title: "Kredibilitas",
    desc: "p-value tertinggi di antara semua kelas. Menjawab: 'seberapa layak dipercaya prediksi terbaik ini?'",
  },
  {
    tag: "Confidence",
    color: "text-glass-blue",
    title: "Keyakinan",
    desc: "1 dikurangi p-value tertinggi kedua. Menjawab: 'seberapa jauh juara mengungguli pesaing terdekatnya?'",
  },
  {
    tag: "Prediction Set",
    color: "text-glass-orange",
    title: "Himpunan Prediksi",
    desc: "Bukan satu jawaban paksa, melainkan kumpulan kelas yang masih masuk akal pada tingkat error epsilon yang Anda pilih.",
  },
  {
    tag: "Coverage",
    color: "text-glass-green",
    title: "Jaminan Cakupan",
    desc: "Janji matematis: pada epsilon 0,10, jawaban benar akan berada di dalam himpunan sekitar 90% kasus. Terbukti tercapai 89,6% pada data uji.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
      {children}
    </div>
  );
}

function PosterContent() {
  return (
    <div className="space-y-5">
      {/* ===== HERO LMPNN ===== */}
      <div className="doc-card relative overflow-hidden rounded-3xl p-7">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-glass-blue/15 blur-3xl" />
        <Eyebrow>Pilar 1 — Mesin Klasifikasi</Eyebrow>
        <h2 className="mt-3 bg-gradient-to-r from-glass-blue to-glass-green bg-clip-text text-5xl font-black tracking-tighter text-transparent sm:text-6xl">
          LMPNN
        </h2>
        <p className="mt-1 text-base font-semibold tracking-tight text-ink">
          Local Mean Pseudo Nearest Neighbor
        </p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
          Bayangkan mencari tahu penyakit dengan bertanya pada sekelompok
          tetangga yang pernah mengalami keluhan serupa. LMPNN melakukan hal itu
          secara cerdas: ia tidak asal meniru satu tetangga, tapi merata-ratakan
          contoh-contoh terdekat menjadi wakil yang stabil untuk tiap kelas.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-ink">
            k = 9 tetangga
          </span>
          <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-ink">
            Transparan
          </span>
          <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-ink">
            Tahan noise
          </span>
          <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-ink">
            Berbasis contoh nyata
          </span>
        </div>
      </div>

      {/* Langkah kerja LMPNN — poster bernomor besar */}
      <div className="doc-card rounded-3xl p-7">
        <Eyebrow>Cara Kerja</Eyebrow>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">
          Empat langkah dari teks menjadi tebakan
        </h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {lmpnnSteps.map((s) => (
            <div key={s.n} className="flex gap-4">
              <div className="bg-gradient-to-br from-glass-blue to-glass-green bg-clip-text text-4xl font-black leading-none tracking-tighter text-transparent">
                {s.n}
              </div>
              <div>
                <div className="font-semibold text-ink">{s.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mengapa LMPNN */}
      <div className="doc-card rounded-3xl p-7">
        <Eyebrow>Mengapa Bukan Kotak Hitam?</Eyebrow>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">
          Bisa ditelusuri, bukan ditebak buta
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-black/5 p-4">
            <div className="text-glass-green text-2xl">👁️</div>
            <div className="mt-2 text-sm font-semibold text-ink">
              Dapat Dijelaskan
            </div>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Setiap keputusan bisa ditelusuri ke contoh nyata terdekat —
              inilah inti Explainable AI.
            </p>
          </div>
          <div className="rounded-2xl bg-black/5 p-4">
            <div className="text-glass-blue text-2xl">🛡️</div>
            <div className="mt-2 text-sm font-semibold text-ink">
              Stabil
            </div>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Local mean meredam satu data aneh agar tidak menyesatkan
              prediksi.
            </p>
          </div>
          <div className="rounded-2xl bg-black/5 p-4">
            <div className="text-glass-orange text-2xl">⚖️</div>
            <div className="mt-2 text-sm font-semibold text-ink">
              Adil Antar Kelas
            </div>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Tiap kelas diwakili setara, membantu saat 107 kategori saling
              tumpang tindih.
            </p>
          </div>
        </div>
      </div>

      {/* Pemisah dramatis */}
      <div className="flex items-center gap-4 py-1">
        <div className="h-px flex-1 bg-black/10" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
          lalu dijaga oleh
        </span>
        <div className="h-px flex-1 bg-black/10" />
      </div>

      {/* ===== HERO CONFORMAL PREDICTION ===== */}
      <div className="doc-card relative overflow-hidden rounded-3xl p-7">
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-glass-orange/15 blur-3xl" />
        <Eyebrow>Pilar 2 — Jaminan Statistik</Eyebrow>
        <h2 className="mt-3 bg-gradient-to-r from-glass-orange to-glass-red bg-clip-text text-4xl font-black tracking-tighter text-transparent sm:text-5xl">
          Conformal Prediction
        </h2>
        <p className="mt-1 text-base font-semibold tracking-tight text-ink">
          Split Conformal Prediction
        </p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
          AI biasa berani berkata 'ini pasti X' walau ragu. Conformal Prediction
          mengubah itu: ia menambahkan kejujuran statistik. Alih-alih satu
          jawaban paksa, ia memberi himpunan kemungkinan beserta jaminan
          seberapa sering jawaban benar ada di dalamnya.
        </p>
        <div className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-black/5 px-4 py-3">
          <span className="text-2xl">🎯</span>
          <span className="text-sm font-medium text-ink">
            Pilih epsilon ={" "}
            <span className="font-bold">0,10</span> &rarr; jaminan cakupan{" "}
            <span className="font-bold">90%</span>
          </span>
        </div>
      </div>

      {/* Konsep CP — kartu poster */}
      <div className="grid gap-4 sm:grid-cols-2">
        {cpConcepts.map((c) => (
          <div key={c.tag} className="doc-card rounded-3xl p-5">
            <div
              className={`text-xs font-bold uppercase tracking-[0.15em] ${c.color}`}
            >
              {c.tag}
            </div>
            <div className="mt-1 text-lg font-bold tracking-tight text-ink">
              {c.title}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {c.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Analogi epsilon */}
      <div className="doc-card rounded-3xl p-7">
        <Eyebrow>Memahami Epsilon</Eyebrow>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">
          Tombol antara presisi & keamanan
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Epsilon (&epsilon;) adalah batas error yang Anda izinkan. Mengecilkan
          epsilon membuat himpunan prediksi lebih lebar tapi lebih aman;
          membesarkannya membuat himpunan lebih ringkas tapi sedikit lebih
          berisiko.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-black/5 p-4 text-center">
            <div className="bg-gradient-to-br from-glass-green to-glass-blue bg-clip-text text-3xl font-black tracking-tighter text-transparent">
              0,05
            </div>
            <div className="mt-1 text-xs font-semibold text-ink">
              Sangat aman
            </div>
            <p className="mt-1 text-xs text-ink-soft">Cakupan ~95%, set lebih lebar</p>
          </div>
          <div className="rounded-2xl bg-black/5 p-4 text-center">
            <div className="bg-gradient-to-br from-glass-blue to-glass-orange bg-clip-text text-3xl font-black tracking-tighter text-transparent">
              0,10
            </div>
            <div className="mt-1 text-xs font-semibold text-ink">Seimbang</div>
            <p className="mt-1 text-xs text-ink-soft">Cakupan ~90%, pilihan default</p>
          </div>
          <div className="rounded-2xl bg-black/5 p-4 text-center">
            <div className="bg-gradient-to-br from-glass-orange to-glass-red bg-clip-text text-3xl font-black tracking-tighter text-transparent">
              0,20
            </div>
            <div className="mt-1 text-xs font-semibold text-ink">Ringkas</div>
            <p className="mt-1 text-xs text-ink-soft">Cakupan ~80%, set lebih kecil</p>
          </div>
        </div>
      </div>

      {/* Penutup */}
      <div className="doc-card rounded-3xl bg-gradient-to-br from-glass-blue/10 to-glass-green/10 p-7 text-center">
        <div className="text-3xl">🤖🩺</div>
        <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">
          LMPNN + Conformal = AI Kesehatan yang Jujur
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
          LMPNN memberi tebakan yang dapat dijelaskan, Conformal Prediction
          memberi jaminan seberapa layak tebakan itu dipercaya. Gabungan
          keduanya menjadikan HeCa AI contoh nyata Explainable AI di bidang
          kesehatan.
        </p>
      </div>

      <p className="pt-1 text-center text-xs text-ink-soft">
        Berbasis skripsi Alif Gumelar Syah Moeslim (Alyst) — model LMPNN k=9 &
        Split Conformal Prediction pada 107 kategori medis.
      </p>
    </div>
  );
}

export default function Science() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="keilmuan" className="mx-auto max-w-5xl px-4 pb-5">
      {/* Kartu pemicu pop-up */}
      <button
        onClick={() => setOpen(true)}
        className="glass-strong group mx-auto flex w-full max-w-2xl items-center gap-4 rounded-4xl p-5 text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-glass-blue to-glass-orange text-2xl text-white">
          🧠
        </div>
        <div className="flex-1">
          <div className="font-semibold text-ink">
            Buka: Keilmuan Algoritma
          </div>
          <div className="mt-0.5 text-sm text-ink-soft">
            LMPNN &amp; Conformal Prediction dijelaskan bergaya poster.
          </div>
        </div>
        <span className="text-2xl text-ink-soft transition-transform group-hover:translate-x-1">
          &rarr;
        </span>
      </button>

      {/* Pop-up tengah ala Apple */}
      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6">
          <div
            onClick={() => setOpen(false)}
            className="animate-fadeIn absolute inset-0 bg-black/50 backdrop-blur-md"
          />
          <div className="doc-panel animate-popIn relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] shadow-glass-lg">
            <div className="doc-panel-head sticky top-0 z-10 flex items-center justify-between px-6 py-4 backdrop-blur-xl">
              <div>
                <div className="text-xs font-medium text-ink-soft">
                  Keilmuan
                </div>
                <div className="text-lg font-semibold tracking-tight text-ink">
                  Algoritma di Balik HeCa AI
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Tutup"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/5 text-ink transition-all hover:scale-105 active:scale-95"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <PosterContent />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
