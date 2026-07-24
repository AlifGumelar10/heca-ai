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
import slide1 from "./slide-1.webp";
import slide2 from "./slide-2.webp";
import slide3 from "./slide-3.webp";
import slide4 from "./slide-4.webp";
import slide5 from "./slide-5.webp";
import slide6 from "./slide-6.webp";
import slide7 from "./slide-7.webp";
import slide8 from "./slide-8.webp";

/**
 * Deck Presentasi Sidang Skripsi (versi 10 slide).
 * Pop-up saat logo diklik (event "open-heca-deck").
 *
 * Susunan:
 *   Slide 01       : Cover (dibuat dari deck, gaya kaca gelap).
 *   Slide 02 - 09  : Delapan slide isi hasil desain sendiri (gambar webp).
 *   Slide 10       : Penutup + QR dokumentasi kode.
 *
 * Rasio 16:9, font Poppins. Slide isi ditampilkan penuh (object-cover)
 * di atas latar pop-up gelap yang di-blur.
 */

const TOTAL = 10;
const FONT = "'Poppins', ui-sans-serif, system-ui, sans-serif";

const CONTENT_SLIDES = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
  slide7,
  slide8,
];

/* ================================ VISUAL ================================== */

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

function Panel({
  title,
  children,
}: {
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5">
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

function ImageSlide({ src, n }: { src: string; n: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0a1020]">
      <img
        src={src}
        alt={`Slide ${n}`}
        className="h-full w-full object-cover"
        draggable={false}
      />
    </div>
  );
}

/* =============================== SLIDES =================================== */

const SLIDES: ReactNode[] = [
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

  ...CONTENT_SLIDES.map((img, idx) => (
    <ImageSlide key={`isi-${idx + 1}`} src={img.src} n={idx + 2} />
  )),

  <SlideShell n={10} key="penutup-qr" section="Penutup">
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

/* ================================ DECK ==================================== */

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
