import type { ConsultationResponse } from "./types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

// session id sederhana per-browser untuk mengelompokkan riwayat
export function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  let sid = localStorage.getItem("hea_session");
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("hea_session", sid);
  }
  return sid;
}

export async function predict(
  text: string,
  epsilon: number
): Promise<ConsultationResponse> {
  const res = await fetch(`${API_URL}/consultations`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ text, epsilon, session_id: getSessionId() }),
  });

  if (!res.ok) {
    let msg = "Terjadi kesalahan saat menganalisis.";
    try {
      const j = await res.json();
      msg = j.message ?? msg;
    } catch {}
    throw new Error(msg);
  }

  return res.json();
}

export async function fetchClasses(): Promise<{ classes: string[]; total: number }> {
  try {
    const res = await fetch(`${API_URL}/classes`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return { classes: [], total: 0 };
    return res.json();
  } catch {
    return { classes: [], total: 0 };
  }
}
