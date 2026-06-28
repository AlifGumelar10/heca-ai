"use client";

import { useEffect, useState } from "react";

/**
 * "Semua tentang HeCa AI" — pop-up TENGAH layar bergaya UI Khas
 * (sudut membulat, kaca buram, animasi pop). Berisi kisah perjalanan
 * penelitian hingga lahirnya HeCa AI, metode, dataset, dan hasil evaluasi.
 * Kartu "Arsitektur Sistem" dihapus; "Cara Membaca Hasil" pindah ke sisi
 * Analisis Teks. Semua kartu memakai gaya solid (.doc-card) agar tulisan
 * selalu jelas di mode terang maupun gelap.
 */

const overall = [
  { k: "Accuracy", v: "44,75%" },
  { k: "F1 Macro", v: "45,48%" },
  { k: "F1 Weighted", v: "44,83%" },
  { k: "Precision Macro", v: "45,69%" },
  { k: "Recall Macro", v: "48,63%" },
  { k: "F1 CV (k=9)", v: "45,74%" },
];

const coverage = [
  { eps: "0,05", target: "95%", real: "94,9%", region: "lebih besar" },
  { eps: "0,10", target: "90%", real: "89,6%", region: "9,51 kelas" },
  { eps: "0,20", target: "80%", real: "79,0%", region: "lebih kecil" },
];

const dataset = [
  { k: "Data latih (proper training)", v: "64.851 sampel" },
  { k: "Data kalibrasi (calibration)", v: "19.456 sampel" },
  { k: "Data uji (test)", v: "16.213 sampel" },
  { k: "Jumlah kelas", v: "107 kategori medis" },
  { k: "Fitur TF-IDF", v: "5.000 (n-gram 1 sampai 2)" },
  { k: "Stemmer", v: "Sastrawi ECS" },
];

const journey = [
  {
    n: "01",
    title: "Latar Belakang",
    desc: "Banyak orang awam kesulitan memahami keluhan kesehatannya sendiri dan bingung harus mencari informasi ke mana. Di sisi lain, sistem AI medis sering kali bekerja seperti kotak hitam: memberi jawaban tanpa alasan yang bisa dipercaya.",
  },
  {
    n: "02",
    title: "Rumusan Masalah",
    desc: "Bagaimana mengklasifikasikan teks keluhan kesehatan berbahasa Indonesia ke dalam 107 kategori, sekaligus memberikan ukuran keyakinan yang jujur dan dapat dipertanggungjawabkan secara statistik?",
  },
  {
    n: "03",
    title: "Ide & Pendekatan",
    desc: "Daripada model kotak hitam, dipilih LMPNN (Local Mean Pseudo Nearest Neighbor) yang transparan karena berbasis kedekatan ke contoh nyata, lalu dibungkus Conformal Prediction agar setiap hasil punya jaminan cakupan. Inilah inti Explainable AI di bidang kesehatan.",
  },
  {
    n: "04",
    title: "Eksperimen",
    desc: "Teks dibersihkan (case folding, stopword, stemming Sastrawi), diubah jadi fitur TF-IDF 5.000 dimensi, lalu nilai k diuji lewat 5-fold cross validation. Nilai k=9 memberi F1 macro terbaik.",
  },
  {
    n: "05",
    title: "Hasil & Validasi",
    desc: "Coverage Conformal Prediction terbukti sangat dekat dengan target (mis. 89,6% untuk target 90%). Artinya jaminan statistiknya valid pada data uji, dan prediction set menjaga keandalan saat kelas saling tumpang tindih.",
  },
  {
    n: "06",
    title: "Lahirnya HeCa AI",
    desc: "Hasil penelitian diwujudkan menjadi produk web tiga layanan (Next.js, Laravel, FastAPI) yang ramah pengguna, lengkap dengan visualisasi tetangga KNN dan meter keyakinan yang transparan.",
  },
];

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="doc-card rounded-3xl p-6">
      <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
      <div className="mt-3 text-sm text-ink-soft">{children}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-black/5 py-2 last:border-0">
      <span className="text-ink-soft">{k}</span>
      <span className="font-semibold text-ink tabular-nums">{v}</span>
    </div>
  );
}

function DrawerContent() {
  return (
    <div className="space-y-4">
      {/* Narasi perjalanan penelitian */}
      <div className="doc-card rounded-3xl p-6">
        <h3 className="text-lg font-semibold tracking-tight text-ink">
          Perjalanan Penelitian menjadi HeCa AI
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          Kisah ringkas bagaimana sebuah pertanyaan penelitian berkembang
          menjadi produk HeCa AI yang Anda gunakan sekarang.
        </p>
        <ol className="mt-5 space-y-5">
          {journey.map((j) => (
            <li key={j.n} className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                {j.n}
              </div>
              <div>
                <div className="font-semibold text-ink">{j.title}</div>
                <p className="mt-1 text-sm text-ink-soft">{j.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Cakupan Sistem">
          <p>
            HeCa AI bekerja pada ranah klasifikasi teks medis berbahasa
            Indonesia. Sistem menerima narasi keluhan pengguna lalu memetakannya
            ke salah satu dari 107 kategori kesehatan, misalnya demam, diabetes,
            hipertensi, kehamilan, dan kesehatan mental.
          </p>
          <ul className="mt-3 space-y-1.5">
            <li className="flex gap-2">
              <span className="text-glass-green">✓</span> Mengenali topik atau
              kategori dari keluhan teks.
            </li>
            <li className="flex gap-2">
              <span className="text-glass-green">✓</span> Memberi tingkat
              keyakinan berbasis Conformal Prediction.
            </li>
            <li className="flex gap-2">
              <span className="text-glass-green">✓</span> Menampilkan kelas
              tetangga terdekat secara visual.
            </li>
          </ul>
        </Card>

        <Card title="Batasan Sistem">
          <p>
            Penting dipahami bahwa cakupan HeCa AI berhenti pada kategorisasi
            teks, bukan pelayanan medis. Sistem ini tidak melakukan hal berikut:
          </p>
          <ul className="mt-3 space-y-1.5">
            <li className="flex gap-2">
              <span className="text-glass-red">✗</span> Bukan alat diagnosis
              penyakit.
            </li>
            <li className="flex gap-2">
              <span className="text-glass-red">✗</span> Tidak memberi resep atau
              saran pengobatan.
            </li>
            <li className="flex gap-2">
              <span className="text-glass-red">✗</span> Tidak menggantikan
              pemeriksaan dokter.
            </li>
            <li className="flex gap-2">
              <span className="text-glass-red">✗</span> Tidak menangani input
              non teks seperti gambar atau hasil lab.
            </li>
          </ul>
          <p className="mt-3">
            Untuk keluhan serius, pengguna tetap harus berkonsultasi dengan
            tenaga medis profesional.
          </p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Metodologi">
          <ol className="space-y-2.5">
            <li>
              <span className="font-semibold text-ink">1. Preprocessing.</span>{" "}
              Case folding, pembersihan teks, penghapusan stopword, dan stemming
              Sastrawi (ECS).
            </li>
            <li>
              <span className="font-semibold text-ink">
                2. Ekstraksi fitur.
              </span>{" "}
              TF-IDF dengan 5.000 fitur dan rentang n-gram 1 sampai 2.
            </li>
            <li>
              <span className="font-semibold text-ink">3. Klasifikasi.</span>{" "}
              Local Mean Pseudo Nearest Neighbor (LMPNN) dengan k=9, dipilih
              lewat 5 fold cross validation pada metrik F1 macro.
            </li>
            <li>
              <span className="font-semibold text-ink">
                4. Conformal Prediction.
              </span>{" "}
              Split Conformal menghasilkan p-value, credibility, confidence, dan
              prediction set dengan jaminan cakupan.
            </li>
          </ol>
        </Card>

        <Card title="Dataset & Konfigurasi">
          {dataset.map((d) => (
            <Row key={d.k} k={d.k} v={d.v} />
          ))}
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Hasil Evaluasi Keseluruhan">
          {overall.map((o) => (
            <Row key={o.k} k={o.k} v={o.v} />
          ))}
          <p className="mt-3 text-xs text-ink-soft">
            Akurasi terlihat moderat karena tugas ini sangat menantang, yaitu
            membedakan 107 kelas yang banyak di antaranya bertumpang tindih
            secara makna. Di sinilah Conformal Prediction berperan menjaga
            keandalan melalui prediction set.
          </p>
        </Card>

        <Card title="Coverage Conformal Prediction">
          <div className="overflow-hidden rounded-2xl border border-black/5">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/5 text-ink-soft">
                <tr>
                  <th className="px-3 py-2 font-medium">Epsilon</th>
                  <th className="px-3 py-2 font-medium">Target</th>
                  <th className="px-3 py-2 font-medium">Tercapai</th>
                  <th className="px-3 py-2 font-medium">Rata Region</th>
                </tr>
              </thead>
              <tbody>
                {coverage.map((c) => (
                  <tr key={c.eps} className="border-t border-black/5">
                    <td className="px-3 py-2 tabular-nums">{c.eps}</td>
                    <td className="px-3 py-2 tabular-nums">{c.target}</td>
                    <td className="px-3 py-2 font-semibold tabular-nums">
                      {c.real}
                    </td>
                    <td className="px-3 py-2 tabular-nums">{c.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 space-y-1">
            <Row k="Mean Credibility" v="60,93%" />
            <Row k="Mean Confidence" v="55,23%" />
            <Row k="Expected Calibration Error" v="0,221" />
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            Coverage yang tercapai sangat dekat dengan target. Artinya jaminan
            statistik Conformal Prediction terbukti valid pada data uji.
          </p>
        </Card>
      </div>

      <p className="pt-2 text-center text-xs text-ink-soft">
        Sumber angka: hasil eksekusi notebook penelitian pada Kaggle (GPU Tesla
        T4). Model LMPNN k=9, 107 kelas.
      </p>
    </div>
  );
}

export default function Documentation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // Tutup dengan tombol Escape
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
    <section id="dokumentasi" className="mx-auto max-w-5xl px-4 pt-16 pb-5">
      <div className="text-center">
        <div className="text-sm font-medium text-ink-soft">Dokumentasi</div>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight text-ink">
          Semua tentang HeCa AI
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-soft">
          Buka untuk membaca kisah lengkap perjalanan penelitian, metode,
          dataset, dan hasil evaluasi yang melahirkan HeCa AI.
        </p>
      </div>

      {/* Kartu pemicu pop-up */}
      <button
        onClick={() => setOpen(true)}
        className="glass-strong group mx-auto mt-8 flex w-full max-w-2xl items-center gap-4 rounded-4xl p-5 text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-2xl text-white">
          📚
        </div>
        <div className="flex-1">
          <div className="font-semibold text-ink">
            Buka: Semua tentang HeCa AI
          </div>
          <div className="mt-0.5 text-sm text-ink-soft">
            Perjalanan penelitian, metodologi, dataset, dan hasil evaluasi.
          </div>
        </div>
        <span className="text-2xl text-ink-soft transition-transform group-hover:translate-x-1">
          →
        </span>
      </button>

      {/* Pop-up tengah bergaya UI Khas */}
      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay */}
          <div
            onClick={() => setOpen(false)}
            className="animate-fadeIn absolute inset-0 bg-black/50 backdrop-blur-md"
          />
          {/* Panel */}
          <div className="doc-panel animate-popIn relative flex max-h-[86vh] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] shadow-glass-lg">
            <div className="doc-panel-head sticky top-0 z-10 flex items-center justify-between px-6 py-4 backdrop-blur-xl">
              <div>
                <div className="text-xs font-medium text-ink-soft">
                  Dokumentasi
                </div>
                <div className="text-lg font-semibold tracking-tight text-ink">
                  Semua tentang HeCa AI
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
              <DrawerContent />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
