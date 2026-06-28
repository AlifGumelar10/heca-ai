"use client";

import { useState } from "react";

/**
 * Panduan "Cara Membaca Hasil" yang ditempatkan di sisi Analisis Teks,
 * dibuat sangat ramah untuk orang awam: tiap istilah diberi analogi
 * sehari-hari, arti sederhana, dan contoh membacanya.
 */

type Item = {
  icon: string;
  term: string;
  short: string;
  analogy: string;
  example: string;
  bg: string;
};

const ITEMS: Item[] = [
  {
    icon: "✓",
    term: "Credibility (Tingkat Kepercayaan)",
    short:
      "Seberapa wajar keluhan Anda masuk ke kategori utama yang diprediksi. Makin tinggi, makin yakin.",
    analogy:
      "Ibarat mencocokkan anak kunci dengan gemboknya. Credibility tinggi berarti kuncinya pas dan mudah diputar.",
    example:
      "Credibility 89% berarti keluhan Anda sangat cocok dengan kategori utama. Di bawah 30% artinya kurang meyakinkan.",
    bg: "bg-glass-green",
  },
  {
    icon: "⚖",
    term: "Confidence (Tingkat Keyakinan)",
    short:
      "Seberapa jauh kategori juara satu mengungguli juara dua. Makin tinggi, makin tegas pemenangnya.",
    analogy:
      "Ibarat lomba lari. Confidence tinggi berarti juara satu menang jauh. Confidence rendah berarti finis nyaris bersamaan, jadi masih ada saingan kuat.",
    example:
      "Confidence 80% berarti kategori utama menang telak. Confidence 13% berarti ada kategori lain yang hampir sama kuatnya.",
    bg: "bg-glass-blue",
  },
  {
    icon: "◎",
    term: "Prediction Set (Daftar Kemungkinan)",
    short:
      "Kumpulan kategori yang masih masuk akal untuk keluhan Anda, bukan cuma satu tebakan.",
    analogy:
      "Ibarat jaring pengaman dokter: daripada menebak satu penyakit, sistem menyodorkan beberapa kemungkinan yang tidak boleh diabaikan.",
    example:
      "Daftar berisi 1 kategori berarti sistem sangat yakin. Berisi 9 kategori berarti keluhan Anda ambigu dan butuh penjelasan lebih detail.",
    bg: "bg-glass-orange",
  },
  {
    icon: "%",
    term: "p-value",
    short:
      "Skor kecocokan statistik antara keluhan Anda dan sebuah kategori (rentang 0 sampai 1).",
    analogy:
      "Ibarat nilai kemiripan wajah. Makin tinggi p-value, makin mirip keluhan Anda dengan contoh-contoh di kategori itu.",
    example:
      "p=0.890 jauh lebih meyakinkan dibanding p=0.150 untuk kategori yang sama.",
    bg: "bg-glass-green",
  },
  {
    icon: "◉",
    term: "Kemiripan KNN (Cosine Similarity)",
    short:
      "Seberapa mirip kata-kata keluhan Anda dengan kelompok keluhan pada tiap kategori tetangga.",
    analogy:
      "Ibarat mencari teman dengan selera musik paling mirip. Node yang lebih dekat ke pusat berarti paling mirip dengan keluhan Anda.",
    example:
      "Pada grafik radial, lingkaran biru di dekat pusat adalah kategori yang paling mirip dengan cerita Anda.",
    bg: "bg-glass-blue",
  },
  {
    icon: "ε",
    term: "Jaminan / Epsilon",
    short:
      "Tingkat keamanan yang Anda pilih. 90% berarti kategori yang benar diharapkan ada di dalam daftar 90% dari waktu.",
    analogy:
      "Ibarat ukuran payung. Jaminan 95% berarti payung besar (daftar lebih panjang, lebih aman). Jaminan 80% berarti payung kecil (daftar pendek, lebih ringkas).",
    example:
      "Pilih 95% jika ingin lebih hati-hati, atau 80% jika ingin hasil yang lebih ringkas.",
    bg: "bg-glass-red",
  },
];

export default function ReadingGuide() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="glass mt-5 rounded-5xl p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-2xl" aria-hidden>
          📖
        </span>
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            Cara Membaca Hasil
          </h3>
          <p className="mt-1 text-sm text-ink-soft">
            Baru pertama kali? Tenang. Ini arti tiap angka pada hasil analisis,
            dijelaskan dengan bahasa sehari-hari. Ketuk tiap istilah untuk
            penjelasan lengkapnya.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {ITEMS.map((it, i) => {
          const isOpen = open === i;
          const badgeClass =
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white " +
            it.bg;
          const chevronClass =
            "text-ink-soft transition-transform " + (isOpen ? "rotate-180" : "");
          return (
            <div
              key={it.term}
              className="glass-soft overflow-hidden rounded-3xl transition-all"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
              >
                <span className={badgeClass}>{it.icon}</span>
                <span className="flex-1 text-sm font-semibold text-ink">
                  {it.term}
                </span>
                <span className={chevronClass}>▾</span>
              </button>
              {isOpen && (
                <div className="animate-fadeIn space-y-2.5 px-4 pb-4 text-sm sm:pl-16">
                  <p className="text-ink-soft">{it.short}</p>
                  <div className="rounded-2xl bg-white/40 px-3 py-2">
                    <span className="font-semibold text-ink">Analogi: </span>
                    <span className="text-ink-soft">{it.analogy}</span>
                  </div>
                  <div className="rounded-2xl bg-white/40 px-3 py-2">
                    <span className="font-semibold text-ink">Contoh: </span>
                    <span className="text-ink-soft">{it.example}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-ink-soft/80">
        Catatan: HeCa AI mengklasifikasikan teks, bukan mendiagnosis. Untuk
        keluhan serius, tetap konsultasi dengan dokter.
      </p>
    </div>
  );
}
