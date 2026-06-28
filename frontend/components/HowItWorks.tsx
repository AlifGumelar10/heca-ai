"use client";

const steps = [
  {
    n: "01",
    title: "Preprocessing Bahasa Indonesia",
    desc: "Case folding, cleaning, stopword removal & stemming Sastrawi (ECS), lalu TF-IDF 5000 fitur.",
  },
  {
    n: "02",
    title: "Klasifikasi LMPNN (k=9)",
    desc: "Local Mean Pseudo Nearest Neighbor menghitung kedekatan cosine ke pusat tiap kelas medis.",
  },
  {
    n: "03",
    title: "Conformal Prediction",
    desc: "Menghasilkan p-value, credibility, confidence, dan prediction set dengan jaminan statistik.",
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <div className="text-sm font-medium text-ink-soft">Cara Kerja</div>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight">
          Tiga langkah, transparan sepenuhnya
        </h2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="glass rounded-4xl p-6">
            <div className="text-3xl font-semibold text-ink-soft/40">{s.n}</div>
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
