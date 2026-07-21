"use client";

import ThemeToggle from "./ThemeToggle";

type Props = { onCta: () => void };

export default function Navbar({ onCta }: Props) {
  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-5xl px-4">
      <div className="glass-strong flex items-center justify-between rounded-full px-5 py-3">
        {/* Logo + nama */}
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="HeCa AI"
            className="h-9 w-9 rounded-2xl object-contain shadow-md"
          />
          <div className="leading-none">
            <span className="text-base font-bold tracking-tight">HeCa AI</span>
            <div className="mt-0.5 hidden text-[10px] text-ink-soft sm:block">
              Health Category AI
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-7 text-sm text-ink-soft sm:flex">
          <a href="#analisis" className="transition-colors hover:text-ink">
            Analisis
          </a>
          <a href="#cara-kerja" className="transition-colors hover:text-ink">
            Cara Kerja
          </a>
          <a href="#dokumentasi" className="transition-colors hover:text-ink">
            Dokumentasi
          </a>
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-heca-poster"))
            }
            className="transition-colors hover:text-ink"
          >
            Bacaan
          </button>
          <a href="#tentang" className="transition-colors hover:text-ink">
            Tentang
          </a>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={onCta}
            className="pill bg-ink text-white hover:opacity-85 active:scale-95"
          >
            Mulai Analisis
          </button>
        </div>
      </div>
    </nav>
  );
}
