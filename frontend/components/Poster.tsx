"use client";

import { useCallback, useEffect, useState } from "react";

const POSTER_URL =
  "https://qktrbkbvszqyxexuzump.supabase.co/storage/v1/object/public/posters/poster_3000.webp";

export default function Poster() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  // Buka pop-up saat event "open-heca-poster" dipicu (navbar / footer)
  useEffect(() => {
    const openPoster = () => {
      setOpen(true);
    };
    window.addEventListener("open-heca-poster", openPoster);
    return () => window.removeEventListener("open-heca-poster", openPoster);
  }, []);

  // Esc untuk tutup + kunci scroll body saat pop-up terbuka
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="animate-fadeIn fixed inset-0 z-[100] flex flex-col bg-black/50 backdrop-blur-xl"
      onClick={close}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-4 text-white">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="HeCa AI"
            className="h-8 w-8 rounded-lg object-contain"
          />
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight">HeCa AI</div>
            <div className="text-[11px] text-white/60">
              Poster Penelitian · Sidang Skripsi
            </div>
          </div>
        </div>
        <button
          onClick={close}
          aria-label="Tutup"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg text-white transition-colors hover:bg-white/20"
        >
          ✕
        </button>
      </div>

      {/* Area gambar poster (scroll manual untuk melihat detail) */}
      <div className="flex-1 overflow-auto px-4 pb-10" onClick={close}>
        <img
          src={POSTER_URL}
          alt="Poster Penelitian HeCa AI — Alif Gumelar Syah Moeslim"
          onClick={(e) => e.stopPropagation()}
          className="mx-auto w-full max-w-4xl rounded-2xl shadow-2xl"
        />
        <p className="mt-4 text-center text-xs text-white/50">
          Tekan Esc atau klik area gelap untuk menutup
        </p>
      </div>
    </div>
  );
}
