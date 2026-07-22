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
import Glossary from "@/components/Glossary";
import Presentation from "@/components/Presentation";
import Poster from "@/components/Poster";
import CursorTrail from "@/components/CursorTrail";
import HealthBackground from "@/components/HealthBackground";

export default function Home() {
  const appRef = useRef<HTMLDivElement>(null);
  const scrollToApp = () =>
    appRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const openDeck = () =>
    window.dispatchEvent(new CustomEvent("open-heca-deck"));

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

      {/* Glosarium - laci di bawah 107 Kategori Medis */}
      <Glossary />

      <footer id="tentang" className="mx-auto max-w-5xl px-4 pt-16">
        <div className="glass rounded-4xl px-6 py-8 text-center">
          {/* Logo di footer - klik untuk buka presentasi */}
          <div className="mb-3 flex justify-center">
            <button
              onClick={openDeck}
              aria-label="Buka presentasi sidang"
              className="transition-transform hover:scale-105 active:scale-95"
            >
              <img
                src="/logo.png"
                alt="HeCa AI"
                className="h-14 w-14 rounded-2xl object-contain shadow-md"
              />
            </button>
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

      {/* Deck presentasi sidang - muncul saat logo diklik */}
      <Presentation />
      {/* Poster penelitian - muncul sebagai pop-up */}
      <Poster />
    </main>
  );
}
