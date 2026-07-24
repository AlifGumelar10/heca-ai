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
 * Deck Presentasi Sidang Skripsi.
 * Pop-up saat logo diklik (event "open-heca-deck").
 *
 * Disusun mengikuti edaran pemaparan sidang (empat bagian):
 *   1. Masalah, tujuan, dan batasan penelitian.
 *   2. Metode, rancangan, implementasi, dan model.
 *   3. Hasil pengujian, temuan utama, dan interpretasi.
 *   4. Kontribusi, keterbatasan, dan saran pengembangan.
 *
 * Sekaligus menjawab poin yang sering gagal dijawab: mengapa metode dipilih,
 * pembeda dari penelitian sebelumnya, bagaimana validasi dilakukan, dan makna
 * hasil (bukan sekadar angka).
 *
 * Total 15 slide, rasio 16:9, font Poppins.
 * Seluruh isi bersumber dari skripsi Alif Gumelar Syah Moeslim.
 */

const TOTAL = 15;
const FONT = "'Poppins', ui-sans-serif, system-ui, sans-serif";

/* ================================ VISUAL ================================== */

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/80 sm:text-base">
            {s}
          </span>
          {i < steps.length - 1 && <span className="text-glass-green">→</span>}
        </div>
      ))}
    </div>
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

function RankBar({
  label,
  value,
  pct,
}: {
  label: string;
  value: string;
  pct: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-40 shrink-0 truncate text-base text-white/75 sm:text-lg">
        {label}
      </span>
      <div className="h-6 flex-1 overflow-hidden rounded-md bg-white/10">
        <div
          className="h-full rounded-md bg-gradient-to-r from-glass-green to-glass-blue"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-14 shrink-0 text-right text-base font-bold tabular-nums text-white sm:text-lg">
        {value}
      </span>
    </div>
  );
}

/* ================================ SHELL =================================== */

const SECTION_TONE: Record<string, string> = {
  Pendahuluan: "border-sky-400/40 bg-sky-400/10 text-sky-200",
  Metode: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  Hasil: "border-cyan-400/40 bg-cyan-400/10 text-cyan-200",
  Pembahasan: "border-violet-400/40 bg-violet-400/10 text-violet-200",
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
        <span>Sidang Skripsi</span>
        <span className="tabular-nums">
          {String(n).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
      </div>
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

/* =============================== SLIDES =================================== */

const SLIDES: ReactNode[] = [
  // 1 — Cover
  <SlideShell n={1} key="cover">
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/70">
        Sidang Skripsi · Program Studi Informatika
      </div>
      <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
        Implementasi Explainable AI untuk Klasifikasi Tanya Jawab Kesehatan
        Bahasa Indonesia Menggunakan Metode KNN
      </h1>
      <div className="mt-7 grid w-full max-w-3xl grid-cols-2 gap-3 text-left">
        <Panel title="Peneliti">
          Alif Gumelar Syah Moeslim
          <br />
          <span className="text-white/45">NIM 220660121161</span>
        </Panel>
        <Panel title="Dosen Pembimbing">
          Esa Firmansyah, S.T., M.Kom.
          <br />
          Beben Sutara, S.Kom., M.T.
        </Panel>
      </div>
      <div className="mt-6 text-base text-white/50">
        Fakultas Teknologi Informasi · Universitas Sebelas April · 2026
      </div>
    </div>
  </SlideShell>,

  // 2 — Latar Belakang dan Masalah (Bagian 1)
  <SlideShell n={2} key="latar" section="Pendahuluan">
    <SectionHead title="Latar Belakang dan Masalah" note="Bagian 1" />
    <div className="mt-5 grid grid-cols-2 gap-4">
      <Panel title="Kebutuhan Nyata">
        Masyarakat makin bergantung pada informasi kesehatan digital. Volume
        tanya jawab medis sangat besar dan sulit dipilah secara manual.
      </Panel>
      <Panel title="Masalah Kotak Hitam" accent>
        Model berakurasi tinggi umumnya berupa kotak hitam. Pengguna tidak tahu
        seberapa yakin dan mengapa sebuah prediksi muncul, sehingga sulit
        dipercaya untuk domain kesehatan.
      </Panel>
    </div>
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center text-base text-white/75 sm:text-lg">
      Inti masalah: dibutuhkan klasifikasi yang tidak hanya akurat, tetapi juga
      transparan dan terukur keyakinannya.
    </div>
  </SlideShell>,

  // 3 — Tujuan dan Batasan (Bagian 1)
  <SlideShell n={3} key="tujuan" section="Pendahuluan">
    <SectionHead title="Tujuan dan Batasan" note="Bagian 1" />
    <div className="mt-5 grid grid-cols-2 gap-4">
      <Panel title="Tujuan Penelitian" accent>
        <Bullets
          items={[
            "Membangun klasifikasi tanya jawab kesehatan bahasa Indonesia dengan LMPNN.",
            "Mengintegrasikan Conformal Prediction agar tiap prediksi disertai ukuran keyakinan.",
            "Mengevaluasi performa sekaligus kualitas penjelasan model.",
          ]}
        />
      </Panel>
      <Panel title="Batasan Penelitian">
        <Bullets
          items={[
            "Dataset Indonesia QnA Health dari Alodokter.",
            "Representasi fitur TF IDF, bukan model bahasa besar.",
            "Explainability difokuskan pada Conformal Prediction: p value, credibility, dan confidence.",
          ]}
        />
      </Panel>
    </div>
  </SlideShell>,

  // 4 — Rancangan Penelitian dan Dataset (Bagian 2)
  <SlideShell n={4} key="metode-alur" section="Metode">
    <SectionHead title="Rancangan Penelitian dan Dataset" note="Bagian 2" />
    <div className="mt-5 grid grid-cols-5 gap-4">
      <div className="col-span-2">
        <Panel title="Indonesia QnA Health">
          Tanya jawab Alodokter. 288.105 baris data mentah disaring menjadi
          81.064 sampel pada 107 kelas medis, minimum 300 sampel per kelas.
        </Panel>
      </div>
      <div className="col-span-3 flex flex-col justify-center gap-3">
        <FunnelBar label="Data mentah" value="288.105" widthPct={100} />
        <FunnelBar
          label="Sampel bersih · 107 kelas"
          value="81.064"
          widthPct={42}
          strong
        />
      </div>
    </div>
    <div className="mt-6">
      <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/45">
        Alur penelitian
      </div>
      <Flow
        steps={[
          "Preprocessing",
          "TF IDF",
          "Pembagian data",
          "LMPNN",
          "Grid search k",
          "Evaluasi",
          "Explainability",
        ]}
      />
    </div>
  </SlideShell>,

  // 5 — Preprocessing dan Representasi Fitur (Bagian 2)
  <SlideShell n={5} key="metode-fitur" section="Metode">
    <SectionHead title="Preprocessing dan Representasi Fitur" note="Bagian 2" />
    <div className="mt-5 grid grid-cols-2 gap-4">
      <Panel title="Preprocessing Lima Tahap">
        Case folding, cleaning, tokenization, stopword removal, dan stemming.
        Rata rata token per dokumen turun dari 56,6 menjadi 25,8 (reduksi
        54,4%).
      </Panel>
      <Panel title="Ekstraksi TF IDF" accent>
        5.000 dimensi fitur dengan n gram (1,2), membentuk matriks sparse
        berukuran 81.064 kali 5.000. Kedekatan antar dokumen diukur dengan
        cosine similarity.
      </Panel>
    </div>
    <div className="mt-4 grid grid-cols-3 gap-3">
      <StatCard value="5" label="Tahap preprocessing" />
      <StatCard value="54,4%" label="Reduksi token" />
      <StatCard value="5.000" label="Dimensi fitur" />
    </div>
  </SlideShell>,

  // 6 — Model LMPNN + Mengapa metode dipilih (Bagian 2)
  <SlideShell n={6} key="metode-model" section="Metode">
    <SectionHead title="Model LMPNN" note="Mengapa metode ini dipilih" />
    <div className="mt-5 grid grid-cols-2 gap-4">
      <Panel title="Local Mean Pseudo Nearest Neighbor" accent>
        Pengembangan K Nearest Neighbors yang memakai local mean vector dari
        tetangga terdekat tiap kelas, sehingga lebih tahan terhadap noise dan
        kelas yang tidak seimbang.
      </Panel>
      <Panel title="Alasan Pemilihan">
        <Bullets
          items={[
            "Berbasis jarak sehingga keputusannya mudah ditelusuri, tidak seperti kotak hitam.",
            "Cocok untuk data teks sparse berdimensi tinggi hasil TF IDF.",
            "Menyediakan skor kesesuaian yang menjadi dasar Conformal Prediction.",
          ]}
        />
      </Panel>
    </div>
  </SlideShell>,

  // 7 — Conformal Prediction + Pembeda penelitian (Bagian 2)
  <SlideShell n={7} key="metode-xai" section="Metode">
    <SectionHead
      title="Explainable AI: Conformal Prediction"
      note="Pembeda dari penelitian sebelumnya"
    />
    <div className="mt-5 grid grid-cols-2 gap-4">
      <Panel title="Yang Ditambahkan" accent>
        Tiap prediksi menghasilkan p value, credibility, dan confidence, serta
        prediction set dengan jaminan cakupan (coverage) secara statistik.
      </Panel>
      <Panel title="Pembeda Penelitian">
        <Bullets
          items={[
            "Riset klasifikasi teks kesehatan Indonesia umumnya berhenti pada akurasi tunggal tanpa transparansi.",
            "Penelitian ini menyatukan LMPNN dan Conformal Prediction sebagai baseline XAI teks bahasa Indonesia.",
            "Model dapat menyatakan kapan yakin dan kapan ragu, sehingga kasus ambigu bisa direview manual.",
          ]}
        />
      </Panel>
    </div>
  </SlideShell>,

  // 8 — Rancangan Validasi + Bagaimana pengujian dilakukan (Bagian 2)
  <SlideShell n={8} key="metode-validasi" section="Metode">
    <SectionHead
      title="Rancangan Validasi dan Pengujian"
      note="Bagaimana pengujian dilakukan"
    />
    <div className="mt-5 grid grid-cols-3 gap-4">
      <Panel title="Pembagian Data">
        Training 64%, validasi 16%, dan testing 20%. Data testing berisi 16.213
        sampel yang tidak pernah dilihat model.
      </Panel>
      <Panel title="Pemilihan k" accent>
        Grid search k = 1 sampai 51 dengan 5 Fold Cross Validation. Nilai
        optimal k = 9 dengan mean F1 macro 45,74%.
      </Panel>
      <Panel title="Metrik Evaluasi">
        Accuracy, precision, recall, dan F1 score. F1 macro menjadi metrik utama
        karena adil untuk 107 kelas yang timpang.
      </Panel>
    </div>
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center text-base text-white/75 sm:text-lg">
      Validitas penjelasan diuji terpisah: prediction set dikalibrasi lalu
      cakupannya dibandingkan dengan target teoritis.
    </div>
  </SlideShell>,

  // 9 — Performa Model (Bagian 3)
  <SlideShell n={9} key="hasil-performa" section="Hasil">
    <SectionHead title="Performa Model" note="16.213 data uji" />
    <div className="mt-5 grid grid-cols-5 gap-3">
      <StatCard value="44,75%" label="Accuracy" />
      <StatCard value="45,48%" label="F1 Macro" />
      <StatCard value="45,68%" label="Precision Macro" />
      <StatCard value="48,63%" label="Recall Macro" />
      <StatCard value="44,82%" label="F1 Weighted" />
    </div>
    <div className="mt-4 grid grid-cols-2 gap-4">
      <Panel title="Interpretasi">
        Untuk 107 kelas, performa ini 48,1 kali lebih baik daripada baseline
        acak (0,93%). Wajar mengingat banyaknya kelas dan tumpang tindih topik
        medis.
      </Panel>
      <Panel title="Makna" accent>
        Fokusnya bukan sekadar akurasi tinggi, melainkan model yang stabil
        (selisih cross validation dan testing hanya 0,26%) dan dapat
        dipertanggungjawabkan.
      </Panel>
    </div>
  </SlideShell>,

  // 10 — Optimasi k dan Pola Kesalahan (Bagian 3)
  <SlideShell n={10} key="hasil-k" section="Hasil">
    <SectionHead title="Optimasi k dan Pola Kesalahan" note="Temuan utama" />
    <div className="mt-5 grid grid-cols-2 gap-4">
      <Panel title="Grid Search k = 1 sampai 51">
        F1 macro cross validation tertinggi pada k = 9 (45,74%). Nilai k terlalu
        kecil sensitif terhadap noise, sedangkan terlalu besar mengaburkan kelas
        minoritas.
      </Panel>
      <Panel title="Pola Kesalahan" accent>
        Kesalahan terbesar terjadi antar topik yang memang beririsan. Kelas
        menstruasi kontras menyerap kesalahan dari kehamilan (0,19) dan
        menstruasi. Model tertukar pada kelas yang mirip secara medis, bukan
        salah acak.
      </Panel>
    </div>
  </SlideShell>,

  // 11 — Performa per Kelas + Makna (Bagian 3)
  <SlideShell n={11} key="hasil-kelas" section="Hasil">
    <SectionHead title="Performa per Kelas" note="Makna di balik angka" />
    <div className="mt-5 grid grid-cols-2 gap-6">
      <div>
        <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/45">
          F1 score tertinggi
        </div>
        <div className="space-y-3">
          <RankBar label="cacar air" value="0,85" pct={85} />
          <RankBar label="hiv" value="0,83" pct={83} />
          <RankBar label="gigi" value="0,77" pct={77} />
        </div>
      </div>
      <Panel title="Interpretasi">
        Kelas dengan istilah khas dan spesifik mudah dikenali. Kelas berbahasa
        umum dan tumpang tindih jauh lebih sulit. Artinya performa sangat
        dipengaruhi kejelasan kosakata, bukan semata kelemahan model.
      </Panel>
    </div>
  </SlideShell>,

  // 12 — Kualitas Penjelasan (Bagian 3, menjawab makna hasil)
  <SlideShell n={12} key="hasil-xai" section="Hasil">
    <SectionHead title="Kualitas Penjelasan" note="Coverage dan kalibrasi" />
    <div className="mt-5 grid grid-cols-4 gap-3">
      <StatCard value="89,61%" label="Coverage (ε = 0,10)" />
      <StatCard value="0,6093" label="Credibility rata rata" />
      <StatCard value="0,5523" label="Confidence rata rata" />
      <StatCard value="0,2210" label="ECE" />
    </div>
    <div className="mt-4 grid grid-cols-2 gap-4">
      <Panel title="Cakupan Terjamin" accent>
        Coverage 89,61% hanya berselisih 0,39% dari target teoritis 90%. Jaminan
        statistik Conformal Prediction terbukti berlaku pada data nyata.
      </Panel>
      <Panel title="Keyakinan yang Bermakna">
        Prediksi benar memiliki credibility rata rata 0,6750, lebih tinggi
        daripada prediksi salah (0,5561). Skor keyakinan mencerminkan keandalan,
        sehingga kasus ragu dapat ditandai.
      </Panel>
    </div>
  </SlideShell>,

  // 13 — Kontribusi dan Keterbatasan (Bagian 4)
  <SlideShell n={13} key="kontribusi" section="Pembahasan">
    <SectionHead title="Kontribusi dan Keterbatasan" note="Bagian 4" />
    <div className="mt-5 grid grid-cols-2 gap-4">
      <Panel title="Kontribusi" accent>
        <Bullets
          items={[
            "Baseline XAI berbasis LMPNN dan Conformal Prediction untuk teks kesehatan bahasa Indonesia.",
            "Dataset besar (288.105 baris) yang dapat menjadi acuan atau benchmark.",
            "Prediksi yang menyatakan tingkat keyakinannya, menekan risiko asumsi menyesatkan.",
          ]}
        />
      </Panel>
      <Panel title="Keterbatasan">
        <Bullets
          items={[
            "Representasi TF IDF belum menangkap konteks selengkap model bahasa besar.",
            "Kalibrasi masih dapat diperbaiki (ECE 0,2210, MCE 0,4528).",
            "Kelas berbahasa umum dan tumpang tindih masih sulit dipisahkan.",
          ]}
        />
      </Panel>
    </div>
  </SlideShell>,

  // 14 — Kesimpulan dan Saran (Bagian 4)
  <SlideShell n={14} key="kesimpulan" section="Penutup">
    <SectionHead title="Kesimpulan dan Saran" note="Bagian 4" />
    <div className="mt-5 grid grid-cols-2 gap-4">
      <Panel title="Kesimpulan">
        Integrasi LMPNN dan Conformal Prediction berhasil membangun klasifikasi
        tanya jawab kesehatan yang akurat secara relatif sekaligus transparan,
        dengan cakupan prediksi terjamin dan skor keyakinan yang bermakna.
      </Panel>
      <Panel title="Saran Pengembangan" accent>
        <Bullets
          items={[
            "Mencoba representasi berbasis model bahasa seperti IndoBERT untuk konteks lebih kaya.",
            "Menyeimbangkan data pada kelas minoritas.",
            "Menambah teknik kalibrasi untuk menurunkan ECE.",
          ]}
        />
      </Panel>
    </div>
  </SlideShell>,

  // 15 — Penutup dan Terima Kasih (QR dokumentasi kode skripsi)
  <SlideShell n={15} key="penutup-qr" section="Penutup">
    <div className="flex h-full flex-col items-center justify-center text-center">
      <h2 className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
        Terima Kasih
      </h2>
      <p className="mt-3 max-w-xl text-base text-white/60 sm:text-lg">
        Saya siap menjawab pertanyaan dari dewan penguji.
      </p>
      <div className="mt-7 flex items-center gap-6">
        <div className="rounded-2xl bg-white p-3">
          <img
            src={qrCode.src}
            alt="QR dokumentasi kode skripsi"
            className="h-32 w-32 object-contain sm:h-40 sm:w-40"
          />
        </div>
        <div className="max-w-xs text-left">
          <div className="text-sm font-semibold uppercase tracking-wide text-white/45">
            Dokumentasi Kode Skripsi
          </div>
          <p className="mt-1 text-base text-white/70 sm:text-lg">
            Pindai QR untuk membuka dokumentasi kode program penelitian.
          </p>
        </div>
      </div>
    </div>
  </SlideShell>,
];

/* ============================= PRESENTATION =============================== */

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
      pdf.save("Presentasi_Sidang_Skripsi.pdf");
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
            Presentasi Sidang Skripsi
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
