"use client";

import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChatPanel from "@/components/ChatPanel";
import ReadingGuide from "@/components/ReadingGuide";
import HowItWorks from "@/components/HowItWorks";
import Documentation from "@/components/Documentation";
import Science from "@/components/Science";
import Categories from "@/components/Categories";
import CursorTrail from "@/components/CursorTrail";
import HealthBackground from "@/components/HealthBackground";

export default function Home() {
  const appRef = useRef<HTMLDivElement>(null);
  const scrollToApp = () =>
    appRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="relative pb-20">
      <HealthBackground />
      <CursorTrail />
      <Navbar onCta={scrollToApp} />
      <Hero onStart={scrollToApp} />

      <section
        id="analisis"
        ref={appRef}
        className="mx-auto max-w-3xl px-4 pt-6"
      >
        <div className="mb-5 text-center">
          <div className="text-sm font-medium text-ink-soft">Analisis Teks</div>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight">
            Coba HeCa AI
          </h2>
        </div>
        <ChatPanel />
        <ReadingGuide />
      </section>

      <HowItWorks />
      <Documentation />
      <Science />
      <Categories />

      {/* Poster penelitian - full resolution */}
      <section style= width: "100%", padding: "2rem 0", background: "#0a0a0a" >
        <h2 style= textAlign: "center", color: "#fff", marginBottom: "1rem" >
          Poster Penelitian
        </h2>
        <img
          src="https://qktrbkbvszqyxexuzump.supabase.co/storage/v1/object/public/posters/poster_lossless.png"
          alt="Poster Skripsi HeCa AI - Alif Gumelar Syah Moeslim"
          style=
            width: "100%",
            maxWidth: "900px",
            height: "auto",
            display: "block",
            margin: "0 auto",
          
          loading="lazy"
        />
      </section>

      <footer id="tentang" className="mx-auto max-w-5xl px-4 pt-4">
        <div className="glass rounded-4xl px-6 py-8 text-center">
          {/* Logo di footer */}
          <div className="mb-3 flex justify-center">
            <img
              src="/logo.png"
              alt="HeCa AI"
              className="h-14 w-14 rounded-2xl object-contain shadow-md"
            />
          </div>
          <div className="text-lg font-semibold tracking-tight">HeCa AI</div>
          <div className="mt-0.5 text-xs text-ink-soft">Health Category AI</div>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-soft">
            Klasifikasi keluhan kesehatan berbahasa Indonesia menggunakan LMPNN
            (k=9) dan Split Conformal Prediction. Skripsi oleh Alif Gumelar Syah
            Moeslim (Alyst).
          </p>
          <p className="mt-4 text-xs text-ink-soft/60">
            ⚠️ Bukan pengganti diagnosis medis profesional.
          </p>
        </div>
      </footer>
    </main>
  );
}