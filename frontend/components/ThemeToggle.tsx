"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ambil kondisi sebenarnya yang sudah di-set skrip anti-kedip di <head>.
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("heca-theme", next ? "dark" : "light");
    } catch (e) {
      // abaikan jika localStorage tidak tersedia
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Mode terang" : "Mode malam"}
      title={dark ? "Mode terang" : "Mode malam"}
      className="glass-soft flex h-9 w-9 items-center justify-center rounded-full text-ink transition-all hover:scale-105 active:scale-95"
    >
      {/* Hindari mismatch hydrasi: render ikon hanya setelah mounted */}
      {mounted && dark ? (
        // Matahari
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        // Bulan
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
