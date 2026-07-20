"use client";

import { useMemo, useState } from "react";
import { glossary, glossaryCategories } from "@/lib/glossary";

export default function Glossary() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("Semua");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossary.filter((t) => {
      const matchCat = activeCat === "Semua" || t.category === activeCat;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.english.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
      );
    });
  }, [query, activeCat]);

  return (
    <section id="glosarium" className="mx-auto max-w-3xl px-4 pt-16">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="glass flex w-full items-center justify-between rounded-4xl px-6 py-5 text-left transition hover:opacity-90"
      >
        <span>
          <span className="block text-lg font-semibold tracking-tight">
            Buka: Glosarium Istilah
          </span>
          <span className="mt-0.5 block text-sm text-ink-soft">
            122 istilah teknis skripsi, lengkap dengan definisi &amp; sumber.
          </span>
        </span>
        <span
          className="ml-4 shrink-0 text-2xl text-ink-soft"
          style={{ transform: open ? "rotate(90deg)" : "none" }}
        >
          →
        </span>
      </button>

      {open && (
        <div className="glass mt-3 rounded-4xl px-5 py-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari istilah, singkatan, atau definisi…"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-ink-soft/60 focus:border-white/25"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {["Semua", ...glossaryCategories].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCat(cat)}
                className={
                  "rounded-full px-3 py-1.5 text-xs font-medium transition " +
                  (activeCat === cat
                    ? "bg-white text-black"
                    : "bg-white/5 text-ink-soft hover:bg-white/10")
                }
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-4 text-xs text-ink-soft">
            Menampilkan {filtered.length} dari {glossary.length} istilah
          </div>

          <div className="mt-3 space-y-3">
            {filtered.map((t) => (
              <details
                key={t.name + t.english}
                className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                  <span>
                    <span className="font-semibold">{t.name}</span>
                    {t.english && t.english !== t.name && (
                      <span className="ml-2 text-sm text-ink-soft">
                        ({t.english})
                      </span>
                    )}
                    <span className="mt-1 block text-xs text-ink-soft/70">
                      {t.category}
                    </span>
                  </span>
                  <span className="mt-0.5 shrink-0 text-ink-soft transition-transform group-open:rotate-90">
                    ›
                  </span>
                </summary>
                <div className="mt-3 space-y-2 text-sm leading-relaxed">
                  <p>{t.definition}</p>
                  {t.source && (
                    <p className="text-xs text-ink-soft">
                      <span className="font-medium">Sumber:</span> {t.source}
                    </p>
                  )}
                  {t.seealso && (
                    <p className="text-xs text-ink-soft">
                      <span className="font-medium">Lihat juga:</span>{" "}
                      {t.seealso}
                    </p>
                  )}
                </div>
              </details>
            ))}
            {filtered.length === 0 && (
              <p className="py-6 text-center text-sm text-ink-soft">
                Tidak ada istilah yang cocok dengan pencarianmu.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
