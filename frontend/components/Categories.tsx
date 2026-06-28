"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchClasses } from "@/lib/api";

/**
 * "107 Kategori Medis" — laci ketiga bergaya POSTER + TABEL.
 * Mengambil daftar 107 kelas secara live dari API (/classes) lalu
 * menampilkannya dalam tabel ber-nomor dengan kotak pencarian.
 * Pop-up TENGAH layar bergaya UI Khas (sudut membulat, kaca buram, animasi pop).
 */

// Ubah label mentah (mis. "gangguan-tidur") menjadi rapi ("Gangguan Tidur").
function prettify(label: string): string {
  return label
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function PosterTable() {
  const [classes, setClasses] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchClasses()
      .then((res) => {
        if (!alive) return;
        setClasses(res.classes ?? []);
        setTotal(res.total ?? (res.classes ? res.classes.length : 0));
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const rows = classes.map((c, i) => ({ raw: c, nice: prettify(c), idx: i + 1 }));
    if (!term) return rows;
    return rows.filter(
      (r) =>
        r.nice.toLowerCase().includes(term) ||
        r.raw.toLowerCase().includes(term)
    );
  }, [classes, q]);

  return (
    <div className="space-y-5">
      {/* HERO poster */}
      <div className="doc-card relative overflow-hidden rounded-3xl p-7">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-glass-green/15 blur-3xl" />
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
          Cakupan Klasifikasi
        </div>
        <h2 className="mt-3 flex items-baseline gap-3">
          <span className="bg-gradient-to-r from-glass-green to-glass-blue bg-clip-text text-6xl font-black tracking-tighter text-transparent">
            {total || 107}
          </span>
          <span className="text-2xl font-bold tracking-tight text-ink">
            Kategori Medis
          </span>
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
          Inilah seluruh kelas yang dapat dikenali HeCa AI. Setiap keluhan yang
          Anda tulis akan dipetakan ke salah satu kategori di bawah ini
          menggunakan LMPNN (k=9) dan diperkuat Conformal Prediction.
        </p>
      </div>

      {/* Kotak pencarian */}
      <div className="doc-card rounded-3xl p-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari kategori, mis. demam, diabetes, jantung..."
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

      {/* Status */}
      {loading && (
        <div className="doc-card rounded-3xl p-7 text-center text-sm text-ink-soft">
          Memuat daftar kategori dari server...
        </div>
      )}

      {!loading && classes.length === 0 && (
        <div className="doc-card rounded-3xl p-7 text-center">
          <div className="text-3xl">⚠️</div>
          <p className="mt-2 text-sm text-ink-soft">
            Daftar kategori belum bisa dimuat. Pastikan backend (port 8000) dan
            ML Service (port 8001) sedang berjalan, lalu buka laci ini lagi.
          </p>
        </div>
      )}

      {/* Tabel poster */}
      {!loading && classes.length > 0 && (
        <div className="doc-card overflow-hidden rounded-3xl p-0">
          <div className="flex items-center justify-between px-5 py-3">
            <div className="text-sm font-semibold text-ink">
              Daftar Kategori
            </div>
            <div className="text-xs text-ink-soft">
              Menampilkan {filtered.length} dari {classes.length}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/5 text-xs uppercase tracking-wider text-ink-soft">
                <tr>
                  <th className="w-16 px-5 py-3 font-semibold">No</th>
                  <th className="px-5 py-3 font-semibold">Kategori</th>
                  <th className="px-5 py-3 font-semibold">Label Sistem</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.raw}
                    className="border-t border-black/5 transition-colors hover:bg-black/5"
                  >
                    <td className="px-5 py-2.5">
                      <span className="bg-gradient-to-br from-glass-green to-glass-blue bg-clip-text font-bold tabular-nums text-transparent">
                        {String(r.idx).padStart(3, "0")}
                      </span>
                    </td>
                    <td className="px-5 py-2.5 font-medium text-ink">
                      {r.nice}
                    </td>
                    <td className="px-5 py-2.5">
                      <code className="rounded-md bg-black/5 px-2 py-0.5 text-xs text-ink-soft">
                        {r.raw}
                      </code>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-5 py-8 text-center text-sm text-ink-soft"
                    >
                      Tidak ada kategori yang cocok dengan “{q}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="pt-1 text-center text-xs text-ink-soft">
        Daftar diambil langsung dari model LMPNN k=9 — 107 kategori medis hasil
        skripsi Alif Gumelar Syah Moeslim (Alyst).
      </p>
    </div>
  );
}

export default function Categories() {
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
    <section id="kategori" className="mx-auto max-w-5xl px-4 pb-5">
      {/* Kartu pemicu pop-up */}
      <button
        onClick={() => setOpen(true)}
        className="glass-strong group mx-auto flex w-full max-w-2xl items-center gap-4 rounded-4xl p-5 text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-glass-green to-glass-blue text-2xl text-white">
          🏷️
        </div>
        <div className="flex-1">
          <div className="font-semibold text-ink">
            Buka: 107 Kategori Medis
          </div>
          <div className="mt-0.5 text-sm text-ink-soft">
            Lihat seluruh tag/kelas yang dikenali, lengkap dengan pencarian.
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
                  Kategori
                </div>
                <div className="text-lg font-semibold tracking-tight text-ink">
                  107 Kategori Medis HeCa AI
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
              <PosterTable />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
