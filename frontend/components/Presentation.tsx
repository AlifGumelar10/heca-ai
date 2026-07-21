"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

/**
 * Deck presentasi Sidang Skripsi — pop-up saat logo HeCa AI diklik.
 * Slide 16:9 (layaknya PPT), desain selaras web HeCa AI.
 *
 * Memicu dari mana pun:
 *   onClick={() => window.dispatchEvent(new CustomEvent("open-heca-deck"))}
 *
 * Isi: PEMBUKAAN (4) + BAGIAN 1 LATAR BELAKANG (5) + BAGIAN 2 METODE (6) = 15.
 */

const TOTAL = 15;

function SlideShell({ children, n }: { children: ReactNode; n: number }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a1020] px-7 py-5 sm:px-11 sm:py-8">
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
      <div className="relative z-10 flex flex-1 flex-col justify-center py-2">
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

function Card({
  title,
  children,
  accent,
}: {
  title: ReactNode;
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
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 text-xs leading-relaxed text-white/65">
        {children}
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
        <Card title="Pembimbing 1">
          <div className="text-base font-semibold text-white">
            Esa Firmansyah, S.T., M.Kom.
          </div>
          <div className="mt-1 text-xs text-white/50">
            NUPTK 6458757658130102
          </div>
        </Card>
        <Card title="Pembimbing 2">
          <div className="text-base font-semibold text-white">
            Beben Sutara, S.Kom., M.T.
          </div>
          <div className="mt-1 text-xs text-white/50">
            NUPTK 8549767668130232
          </div>
        </Card>
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
        <Card title="Ledakan Data Kesehatan Digital">
          <div className="flex items-baseline gap-2">
            <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
              288.105
            </span>
            <span className="text-xs text-white/60">data mentah</span>
          </div>
          <p className="mt-2">
            Indonesia QnA Health Dataset (Alodokter). Pertanyaan kesehatan di
            platform digital terus meningkat setiap hari.
          </p>
        </Card>
        <Card title={"Permasalahan Utama: “Black Box”"}>
          <p>Model AI berperforma tinggi, namun sering jadi kotak hitam:</p>
          <ul className="mt-2 space-y-1 text-white/70">
            <li>✗ Keputusan tidak transparan</li>
            <li>✗ Sulit dipahami pengguna</li>
            <li>✗ Risiko salah rekomendasi di domain kesehatan</li>
          </ul>
        </Card>
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
          <Card key={c.t} title={c.t}>
            {c.d}
          </Card>
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

  // 10 — Divider Bagian 2 + Alur Metodologi (6 tahap)
  <SlideShell n={10} key="bab2-alur">
    <div>
      <div className="flex items-baseline gap-3">
        <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-4xl font-black tracking-tighter text-transparent sm:text-5xl">
          02
        </span>
        <h2 className="text-xl font-black tracking-tight text-white sm:text-3xl">
          Metode Penelitian
        </h2>
      </div>
      <p className="mt-1 text-xs text-white/50">Alur Metodologi Penelitian</p>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {[
          {
            n: "1",
            t: "Data Collection",
            d: "Indonesia QnA Health Dataset (Alodokter), 288.105 data mentah.",
          },
          {
            n: "2",
            t: "Data Preprocessing",
            d: "Case folding, cleaning, tokenisasi, stopword removal, stemming.",
          },
          {
            n: "3",
            t: "Feature Extraction",
            d: "TF-IDF, max_features 5.000, n-gram (1,2) — vektor sparse.",
          },
          {
            n: "4",
            t: "Split Data",
            d: "Training 64% · Calibration 16% · Testing 20% (stratified).",
          },
          {
            n: "5",
            t: "Training & Tuning",
            d: "LMPNN + Grid Search k=1..51, 5-Fold CV, F1-Macro → k=9.",
          },
          {
            n: "6",
            t: "Model Evaluation",
            d: "Uji pada 16.213 sampel: Accuracy, Precision, Recall, F1.",
          },
        ].map((s) => (
          <div
            key={s.n}
            className="rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-glass-green to-glass-blue text-[10px] font-bold text-white">
                {s.n}
              </span>
              <span className="text-xs font-semibold text-white">{s.t}</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-white/60">
              {s.d}
            </p>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>,

  // 11 — Dataset + Preprocessing
  <SlideShell n={11} key="bab2-data">
    <div>
      <Kicker>Metode · Dataset &amp; Preprocessing</Kicker>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Card title="1 · Dataset">
          <div>Indonesia QnA Health Dataset (Alodokter).</div>
          <div className="mt-1 text-white/50">
            Sumber: Kaggle (user: gufranakasamudra)
          </div>
          <div className="mt-3 space-y-1">
            <div>
              Total data mentah:{" "}
              <span className="font-semibold text-white">288.105</span> sampel
            </div>
            <div>
              Setelah filtering (min. 300/kelas):{" "}
              <span className="font-semibold text-white">81.064</span> sampel
              dalam <span className="font-semibold text-white">107</span> kelas
              medis
            </div>
          </div>
        </Card>
        <Card title="2 · Preprocessing Pipeline">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-white/75">
            {[
              "Case Folding",
              "Cleaning",
              "Tokenization",
              "Stopword Removal",
              "Stemming",
            ].map((step, idx, arr) => (
              <span key={step} className="flex items-center gap-1.5">
                <span className="rounded-md bg-white/10 px-2 py-1 font-medium">
                  {step}
                </span>
                {idx < arr.length - 1 && (
                  <span className="text-white/30">→</span>
                )}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-2xl font-black text-transparent">
              54,4%
            </span>
            <span className="text-[11px] text-white/60">
              reduksi rata-rata token per dokumen
            </span>
          </div>
        </Card>
      </div>
    </div>
  </SlideShell>,

  // 12 — Feature Extraction + Split
  <SlideShell n={12} key="bab2-fitur">
    <div>
      <Kicker>Metode · Ekstraksi Fitur &amp; Pembagian Data</Kicker>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Card title="3 · Feature Extraction — TF-IDF">
          <ul className="space-y-1">
            <li>• max_features = 5.000</li>
            <li>• ngram_range = (1, 2) — unigram &amp; bigram</li>
            <li>• lowercase = True · min_df = 2</li>
          </ul>
          <div className="mt-3 rounded-lg bg-white/5 px-3 py-2 text-[11px] text-white/70">
            Representasi: Sparse Matrix{" "}
            <span className="font-semibold text-white">81.064 × 5.000</span>
            <div className="mt-1 font-mono text-white/50">
              TF-IDF(t,d) = TF(t,d) × IDF(t)
            </div>
          </div>
        </Card>
        <Card title="4 · Split Data (Stratified)">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span>Training</span>
              <span className="font-semibold text-white">64%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Calibration</span>
              <span className="font-semibold text-white">16%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Testing</span>
              <span className="font-semibold text-white">
                20% (16.213 sampel)
              </span>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-white/50">
            Stratified split, reproducible (random_state) agar hasil konsisten.
          </div>
        </Card>
      </div>
    </div>
  </SlideShell>,

  // 13 — Modeling: LMPNN + Grid Search
  <SlideShell n={13} key="bab2-model">
    <div>
      <Kicker>Metode · Modeling (LMPNN + Grid Search)</Kicker>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Card title="5a · Algoritma LMPNN">
          <ol className="list-decimal space-y-1 pl-4">
            <li>
              Hitung mean lokal (centroid μᴄ) dari k tetangga terdekat tiap
              kelas.
            </li>
            <li>Hitung jarak cosine antara query xₒ dan centroid μᴄ.</li>
            <li>Prediksi kelas dengan centroid terdekat (jarak minimum).</li>
          </ol>
          <div className="mt-3 rounded-lg bg-white/5 px-3 py-2 text-center font-mono text-[11px] text-white/70">
            Prediksi = argminᴄ d(xₒ, μᴄ)
          </div>
        </Card>
        <Card title="5b · Hyperparameter Tuning">
          <ul className="space-y-1">
            <li>• Grid Search k = 1 s.d. 51 (step 2)</li>
            <li>• 5-Fold Cross Validation</li>
            <li>• Metrik optimasi: F1-Macro</li>
          </ul>
          <div className="mt-3 rounded-lg border border-glass-green/30 bg-gradient-to-br from-glass-green/15 to-glass-blue/15 px-3 py-2">
            <span className="text-sm font-bold text-white">k optimal = 9</span>
            <span className="ml-2 text-[11px] text-white/70">
              (F1-macro CP = 0.4548)
            </span>
          </div>
        </Card>
      </div>
    </div>
  </SlideShell>,

  // 14 — Explainability: Conformal Prediction
  <SlideShell n={14} key="bab2-cp">
    <div>
      <Kicker>Metode · Explainability: Conformal Prediction</Kicker>
      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-5">
        {[
          { t: "Query Baru", d: "Pertanyaan kesehatan dari pengguna." },
          { t: "Model LMPNN", d: "Hitung jarak ke centroid tiap kelas." },
          {
            t: "Nonconformity Score",
            d: "αᵢ = d(xᵢ, yᵢ) — seberapa ‘tidak sesuai’.",
          },
          {
            t: "P-value (Conformal)",
            d: "pᵧ = (|{αᵢ ≥ αₒ}| + 1) / (n + 1)",
          },
          {
            t: "Prediction Set",
            d: "Masukkan kelas jika pᵧ > ε.",
          },
        ].map((s, idx) => (
          <div
            key={s.t}
            className="rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <div className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-xs font-black text-transparent">
              {idx + 1}
            </div>
            <div className="mt-1 text-xs font-semibold text-white">{s.t}</div>
            <p className="mt-1 text-[11px] leading-snug text-white/60">{s.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[11px] text-white/60">
        Credibility = 1 − ε · Confidence = max(pᵧ) — memberi ukuran keyakinan
        pada tiap prediksi.
      </p>
    </div>
  </SlideShell>,

  // 15 — Evaluation
  <SlideShell n={15} key="bab2-evaluasi">
    <div>
      <Kicker>Metode · Evaluasi</Kicker>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Card title="Metrik Klasifikasi">
          <ul className="space-y-1">
            <li>• Accuracy</li>
            <li>• Precision</li>
            <li>• Recall</li>
            <li>• F1-Score (Macro &amp; Weighted)</li>
            <li>• Confusion Matrix</li>
          </ul>
        </Card>
        <Card title="Evaluasi Explainability">
          <ul className="space-y-1">
            <li>• Coverage (target 1 − ε)</li>
            <li>• Credibility Analysis (distribusi &amp; korelasi)</li>
            <li>• Confidence Analysis (distribusi skor keyakinan)</li>
            <li>• Prediction Set Size (ukuran wilayah prediksi)</li>
            <li>• Reliability Diagram (kalibrasi model)</li>
          </ul>
        </Card>
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
