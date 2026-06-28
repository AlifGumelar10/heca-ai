"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/types";
import { predict } from "@/lib/api";
import ResultCard from "./ResultCard";

const EPS_OPTIONS = [
  { v: 0.05, label: "95% (ketat)" },
  { v: 0.1, label: "90% (standar)" },
  { v: 0.2, label: "80% (longgar)" },
];

const EXAMPLES = [
  "Dok, saya sering pusing berputar terutama saat bangun tidur sudah 5 hari.",
  "Saya batuk berdahak disertai demam dan sesak napas sejak 3 hari lalu.",
  "Perut bagian bawah terasa nyeri dan mual setelah makan pedas.",
];

let idCounter = 0;
const nextId = () => `m${Date.now()}-${idCounter++}`;

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [epsilon, setEpsilon] = useState(0.1);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(input?: string) {
    const q = (input ?? text).trim();
    if (!q || loading) return;

    setText("");
    setLoading(true);
    const userMsg: ChatMessage = { id: nextId(), role: "user", text: q };
    const loadingMsg: ChatMessage = { id: nextId(), role: "bot-loading" };
    setMessages((m) => [...m, userMsg, loadingMsg]);

    try {
      const res = await predict(q, epsilon);
      setMessages((m) =>
        m.map((msg) =>
          msg.id === loadingMsg.id
            ? { id: msg.id, role: "bot", result: res.data }
            : msg,
        ),
      );
    } catch (e) {
      const err = e instanceof Error ? e.message : "Gagal menganalisis.";
      setMessages((m) =>
        m.map((msg) =>
          msg.id === loadingMsg.id
            ? { id: msg.id, role: "bot-error", text: err }
            : msg,
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="glass-strong rounded-5xl p-4 sm:p-6">
      {/* Riwayat percakapan */}
      <div className="max-h-[60vh] min-h-[180px] space-y-5 overflow-y-auto px-1 py-2">
        {messages.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-ink-soft">
              Ceritakan keluhan kesehatan Anda dalam bahasa Indonesia.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => send(ex)}
                  className="glass-soft rounded-full px-3.5 py-2 text-left text-xs text-ink-soft transition-all hover:bg-white/70"
                >
                  {ex.length > 48 ? ex.slice(0, 46) + "…" : ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => {
          if (msg.role === "user") {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-4xl rounded-br-lg bg-ink px-4 py-3 text-sm text-white shadow-glass">
                  {msg.text}
                </div>
              </div>
            );
          }
          if (msg.role === "bot-loading") {
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="glass flex items-center gap-2 rounded-4xl rounded-bl-lg px-4 py-3">
                  <span className="h-2 w-2 animate-pulseDot rounded-full bg-glass-blue" />
                  <span className="text-sm text-ink-soft">
                    Menganalisis dengan LMPNN + Conformal Prediction…
                  </span>
                </div>
              </div>
            );
          }
          if (msg.role === "bot-error") {
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="rounded-4xl rounded-bl-lg border border-glass-red/30 bg-glass-red/10 px-4 py-3 text-sm text-red-700">
                  {msg.text}
                </div>
              </div>
            );
          }
          return (
            <div key={msg.id} className="flex justify-start">
              <div className="w-full max-w-[95%]">
                <ResultCard result={msg.result} />
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input bar */}
      <div className="mt-4 rounded-4xl border border-white/60 bg-white/60 p-3 backdrop-blur-xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          rows={2}
          placeholder="Contoh: Dok, saya sering pusing berputar saat bangun tidur sudah 5 hari…"
          className="w-full resize-none bg-transparent px-2 py-1 text-sm outline-none placeholder:text-ink-soft/70"
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-ink-soft">
            <span>Jaminan:</span>
            <select
              value={epsilon}
              onChange={(e) => setEpsilon(parseFloat(e.target.value))}
              className="rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs outline-none"
            >
              {EPS_OPTIONS.map((o) => (
                <option key={o.v} value={o.v}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => send()}
            disabled={loading || !text.trim()}
            className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-white transition-all hover:opacity-85 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Menganalisis…" : "Analisis"}
          </button>
        </div>
      </div>
    </div>
  );
}
