"use client";

/**
 * Latar belakang bertema Explainable AI di bidang kesehatan.
 * Motif: kepala "AI" yang separuh sirkuit (robot) dan separuh denyut/medis
 * (dokter), dikelilingi simpul penjelas (explainability) dan palang kesehatan.
 * Tampil sebagai watermark beropasitas rendah di belakang seluruh konten.
 */
export default function HealthBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <svg
        className="absolute left-1/2 top-1/2 h-[125vmin] w-[125vmin] -translate-x-1/2 -translate-y-1/2 text-ink opacity-[0.045] dark:opacity-[0.09]"
        viewBox="0 0 600 600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Orbit penjelas (explainability) */}
        <circle cx="300" cy="300" r="250" strokeDasharray="3 10" opacity="0.6" />
        <circle cx="300" cy="300" r="200" strokeDasharray="2 12" opacity="0.5" />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const a = (deg * Math.PI) / 180;
          const x = 300 + 250 * Math.cos(a);
          const y = 300 + 250 * Math.sin(a);
          return <circle key={deg} cx={x} cy={y} r="5" fill="currentColor" stroke="none" />;
        })}

        {/* Kepala / pikiran */}
        <circle cx="300" cy="300" r="150" />
        <line x1="300" y1="150" x2="300" y2="450" opacity="0.4" />

        {/* Sisi kiri: sirkuit robot */}
        <g opacity="0.9">
          <path d="M300 230 H225 V200" />
          <circle cx="225" cy="196" r="6" fill="currentColor" stroke="none" />
          <path d="M300 270 H205" />
          <circle cx="201" cy="270" r="6" fill="currentColor" stroke="none" />
          <path d="M300 310 H230 V350" />
          <circle cx="230" cy="354" r="6" fill="currentColor" stroke="none" />
          <path d="M300 350 H250" />
          <circle cx="246" cy="350" r="6" fill="currentColor" stroke="none" />
          <path d="M260 230 V260 H290" />
        </g>

        {/* Sisi kanan: denyut jantung / medis (dokter) */}
        <g opacity="0.9">
          <path d="M310 300 H330 L342 268 L360 332 L372 300 H392" />
          {/* Palang kesehatan besar */}
          <g transform="translate(350 230)">
            <rect x="-8" y="-22" width="16" height="44" rx="5" fill="currentColor" stroke="none" />
            <rect x="-22" y="-8" width="44" height="16" rx="5" fill="currentColor" stroke="none" />
          </g>
        </g>

        {/* Stetoskop melingkar di bawah */}
        <g opacity="0.85">
          <path d="M250 360 C250 420 350 420 350 360" />
          <path d="M300 405 V440" />
          <circle cx="300" cy="452" r="14" />
          <circle cx="250" cy="356" r="5" fill="currentColor" stroke="none" />
          <circle cx="350" cy="356" r="5" fill="currentColor" stroke="none" />
        </g>

        {/* Palang kesehatan kecil bertebaran */}
        {[
          { x: 110, y: 120, s: 1 },
          { x: 500, y: 140, s: 0.8 },
          { x: 95, y: 470, s: 0.9 },
          { x: 505, y: 460, s: 1.1 },
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y}) scale(${c.s})`}>
            <rect x="-5" y="-15" width="10" height="30" rx="3" fill="currentColor" stroke="none" />
            <rect x="-15" y="-5" width="30" height="10" rx="3" fill="currentColor" stroke="none" />
          </g>
        ))}
      </svg>
    </div>
  );
}
