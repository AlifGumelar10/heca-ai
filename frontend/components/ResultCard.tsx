"use client";

import type { PredictionResult } from "@/lib/types";
import CredibilityMeter from "./CredibilityMeter";
import KnnChart from "./KnnChart";

const BADGE: Record<string, string> = {
  green: "bg-glass-green/15 text-green-700 border-glass-green/30",
  orange: "bg-glass-orange/15 text-orange-700 border-glass-orange/30",
  red: "bg-glass-red/15 text-red-700 border-glass-red/30",
};

export default function ResultCard({ result }: { result: PredictionResult }) {
  const badge = BADGE[result.credibility_color] ?? BADGE.orange;
  const coveragePct = Math.round((1 - result.epsilon) * 100);

  return (
    <div className="animate-riseIn space-y-4">
      {/* Prediksi utama */}
      <div className="glass rounded-4xl p-5">
        <div className="text-xs uppercase tracking-wide text-ink-soft">
          Kemungkinan kategori
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-semibold tracking-tight">
            {result.prediction}
          </h3>
          <span
            className={
              "rounded-full border px-3 py-1 text-xs font-medium " + badge
            }
          >
            {result.credibility_level}
          </span>
        </div>
      </div>

      {/* Meter CP */}
      <div className="grid gap-4 sm:grid-cols-2">
        <CredibilityMeter
          label="Credibility (max p-value)"
          value={result.credibility}
          color={result.credibility_color}
          caption="Keyakinan terhadap prediksi terbaik."
        />
        <CredibilityMeter
          label="Confidence (1 - p-value ke-2)"
          value={result.confidence}
          color="blue"
          caption="Margin terhadap kelas pesaing."
        />
      </div>

      {/* Visualisasi tetangga KNN */}
      <KnnChart result={result} />

      {/* Prediction set */}
      <div className="glass-soft rounded-4xl p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            Prediction Set ({result.prediction_set_size})
          </div>
          <div className="text-xs text-ink-soft">
            Jaminan {coveragePct}% (ε={result.epsilon})
          </div>
        </div>
        <p className="mb-3 mt-1 text-xs text-ink-soft">
          Kumpulan kelas yang secara statistik tidak dapat dikesampingkan pada
          tingkat jaminan ini.
        </p>
        <div className="flex flex-wrap gap-2">
          {result.prediction_set.map((c, i) => (
            <span
              key={c}
              className={
                "pill border " +
                (i === 0
                  ? "bg-glass-blue/15 border-glass-blue/30 text-blue-700"
                  : "bg-white/50 border-white/60 text-ink-soft")
              }
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="glass-soft flex gap-3 rounded-4xl p-4 text-xs text-ink-soft">
        <span className="text-base">⚠️</span>
        <p>
          HeCa AI bukan pengganti diagnosis medis profesional. Hasil ini adalah
          klasifikasi teks dengan estimasi statistik. Untuk keluhan serius,
          silakan berkonsultasi langsung dengan dokter.
        </p>
      </div>
    </div>
  );
}
