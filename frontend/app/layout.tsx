import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HeCa AI — Health Category AI",
  description:
    "Klasifikasi keluhan kesehatan berbahasa Indonesia dengan LMPNN k=9 + Conformal Prediction. by Alyst.",
};

// Set tema sebelum paint untuk menghindari kedip (FOUC) saat mode malam aktif.
const themeInit = {
  __html:
    "(function(){try{var s=localStorage.getItem('heca-theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark');}}catch(e){}})();",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={themeInit} />
      </head>
      <body className="font-sans antialiased text-ink">{children}</body>
    </html>
  );
}
