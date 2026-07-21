"use client";

import { useEffect, useMemo, useState } from "react";
import { glossary, glossaryCategories } from "@/lib/glossary";

/**
 * "Glosarium Istilah" — laci bergaya sama dengan "107 Kategori Medis".
 * Kartu pemicu glass-strong + pop-up tengah layar (doc-panel) berisi
 * 122 istilah dengan kotak pencarian dan filter kategori.
 */

function GlossaryPanel() {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string>("Semua");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return glossary.filter((t) => {
      const matchCat = activeCat === "Semua" || t.category === activeCat;
      if (!matchCat) return false;
      if (!term) return true;
      return (
        t.name.toLowerCase().includes(term) ||
        t.english.toLowerCase().includes(term) ||
        t.definition.toLowerCase().includes(term)
      );
    });
  }, [q, activeCat]);

  return (
    <div className="space-y-5">
      {/* HERO poster */}
      <div className="doc-card relative overflow-hidden rounded-3xl p-7">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-glass-green/15 blur-3xl" />
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
          Referensi Istilah
        </div>
        <h2 className="mt-3 flex items-baseline gap-3">
          <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-6xl font-black tracking-tighter text-transparent">
            {glossary.length}
          </span>
          <span className="text-2xl font-bold tracking-tight text-ink">
            Istilah Teknis
          </span>
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
          Seluruh istilah teknis yang muncul dalam skripsi, dijelaskan lengkap
          dengan definisi, sumber referensi, dan istilah terkait — disusun dalam
          10 kategori untuk mempermudah persiapan sidang.
        </p>
      </div>

      {/* Kotak pencarian */}
      <div className="doc-card rounded-3xl p-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari istilah, singkatan, atau definisi..."
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="shrink-0 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              Hapus
            </button>
          )}
        </div>
      </div>

      {/* Filter kategori */}
      <div className="doc-card rounded-3xl p-4">
        <div className="flex flex-wrap gap-2">
          {["Semua", ...glossaryCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors " +
                (activeCat === cat
                  ? "bg-gradient-to-br from-glass-green to-glass-blue text-white"
                  : "bg-black/5 text-ink-soft hover:bg-black/10 hover:text-ink")
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Daftar istilah */}
      <div className="doc-card overflow-hidden rounded-3xl p-0">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="text-sm font-semibold text-ink">Daftar Istilah</div>
          <div className="text-xs text-ink-soft">
            Menampilkan {filtered.length} dari {glossary.length}
          </div>
        </div>
        <div>
          {filtered.map((t) => (
            <details
              key={t.name + t.english}
              className="group border-t border-black/5"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-5 py-3 transition-colors hover:bg-black/5">
                <span>
                  <span className="font-medium text-ink">{t.name}</span>
                  {t.english && t.english !== t.name && (
                    <span className="ml-2 text-sm text-ink-soft">
                      ({t.english})
                    </span>
                  )}
                  <span className="mt-0.5 block text-xs text-ink-soft/70">
                    {t.category}
                  </span>
                </span>
                <span className="mt-1 shrink-0 text-ink-soft transition-transform group-open:rotate-90">
                  &rsaquo;
                </span>
              </summary>
              <div className="space-y-2 px-5 pb-4 text-sm leading-relaxed text-ink">
                <p>{t.definition}</p>
                {t.source && (
                  <p className="text-xs text-ink-soft">
                    <span className="font-medium">Sumber:</span> {t.source}
                  </p>
                )}
                {t.seealso && (
                  <p className="text-xs text-ink-soft">
                    <span className="font-medium">Lihat juga:</span> {t.seealso}
                  </p>
                )}
              </div>
            </details>
          ))}
          {filtered.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-ink-soft">
              Tidak ada istilah yang cocok dengan “{q}”.
            </div>
          )}
        </div>
      </div>

      <p className="pt-1 text-center text-xs text-ink-soft">
        122 istilah dari skripsi &amp; notebook — persiapan sidang skripsi Alif
        Gumelar Syah Moeslim (Alyst).
      </p>
    </div>
  );
}

export default function Glossary() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
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
    <section id="glosarium" className="mx-auto max-w-5xl px-4 pb-5">
      {/* Kartu pemicu pop-up */}
      <button
        onClick={() => setOpen(true)}
        className="glass-strong group mx-auto flex w-full max-w-2xl items-center gap-4 rounded-4xl p-5 text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-glass-green to-glass-blue text-2xl text-white">
          📖
        </div>
        <div className="flex-1">
          <div className="font-semibold text-ink">Buka: Glosarium Istilah</div>
          <div className="mt-0.5 text-sm text-ink-soft">
            122 istilah teknis skripsi, lengkap dengan definisi &amp; sumber.
          </div>
        </div>
        <span className="text-2xl text-ink-soft transition-transform group-hover:translate-x-1">
          &rarr;
        </span>
      </button>

      {/* Pop-up tengah bergaya UI Khas */}
      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6">
          <div
            onClick={() => setOpen(false)}
            className="animate-fadeIn absolute inset-0 bg-black/50 backdrop-blur-md"
          />
          <div className="doc-panel animate-popIn relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] shadow-glass-lg">
            <div className="doc-panel-head sticky top-0 z-10 flex items-center justify-between px-6 py-4 backdrop-blur-xl">
              <div>
                <div className="text-xs font-medium text-ink-soft">
                  Referensi
                </div>
                <div className="text-lg font-semibold tracking-tight text-ink">
                  Glosarium Istilah Skripsi
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
              <GlossaryPanel />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
