"use client";

import { starNotes } from "@/lib/starNotes";
import { useState, useCallback } from "react";
import type { StarNote } from "@/lib/starNotes";

/* ── tiny helpers ────────────────────────────────────── */

/** Deterministic pseudo-random from seed — gives each star a unique but stable personality */
function seeded(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** Format a day number to an ordinal — 1st, 2nd, 3rd … */
function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/* ── colour palette for stars ────────────────────────── */
const STAR_HUES: Record<string, { fill: string; stroke: string }> = {
  blush: { fill: "#e8c4b8", stroke: "#c8947e" },
  sand: { fill: "#d4b8a0", stroke: "#b8937a" },
  lavender: { fill: "#c9b8d0", stroke: "#a890b0" },
  sage: { fill: "#b8ccc4", stroke: "#90a89c" },
  gold: { fill: "#e0c8a8", stroke: "#c0a480" },
  rose: { fill: "#d0b0b8", stroke: "#b08890" },
  grey: { fill: "#c8c0b0", stroke: "#a89880" },
  mauve: { fill: "#d8c0c8", stroke: "#b89ca8" },
};
const PRESET_KEYS = Object.keys(STAR_HUES);

function darkenColor(hex: string, percent: number) {
  try {
    const cleanHex = hex.replace("#", "");
    let num = parseInt(cleanHex, 16);
    if (isNaN(num)) return hex;
    const amt = Math.round(2.55 * percent);
    let R = (num >> 16) - amt;
    let G = (num >> 8 & 0x00FF) - amt;
    let B = (num & 0x0000FF) - amt;
    R = Math.max(0, Math.min(255, R));
    G = Math.max(0, Math.min(255, G));
    B = Math.max(0, Math.min(255, B));
    return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  } catch (e) {
    return hex;
  }
}

function getStarColor(star: StarNote) {
  if (star.color) {
    const norm = star.color.trim().toLowerCase();
    if (STAR_HUES[norm]) {
      return STAR_HUES[norm];
    }
    if (norm.startsWith("#")) {
      return { fill: star.color, stroke: darkenColor(star.color, 12) };
    }
    return { fill: star.color, stroke: star.color };
  }
  const key = PRESET_KEYS[star.day % PRESET_KEYS.length];
  return STAR_HUES[key];
}

export default function StarsPage() {
  const [openStar, setOpenStar] = useState<StarNote | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const close = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenStar(null);
      setIsClosing(false);
    }, 380);
  }, []);

  return (
    <main className="relative min-h-screen" style={{ color: "#3e1c2a" }}>
      {/* shared warm background */}
      <div className="fixed inset-0 -z-10 bg-layer" />

      {/* ── HEADER ──────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(72px, 12vw, 120px) clamp(24px, 6vw, 80px) 20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-sans), sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#8a3858",
            opacity: 0.5,
            marginBottom: "18px",
          }}
        >
          30 stars · 30 days · each one hers
        </p>

        <h1
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            color: "#3e1c2a",
            lineHeight: 1.1,
            marginBottom: "18px",
          }}
        >
          The Box of Stars
        </h1>

        <span className="thin-rule" style={{ marginBottom: "20px" }} />

        <p
          style={{
            fontFamily: "var(--font-lora)",
            fontStyle: "italic",
            fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
            color: "#6a2840",
            opacity: 0.7,
            maxWidth: "440px",
            margin: "0 auto",
            lineHeight: 1.75,
          }}
        >
          She folded thirty paper stars, each holding a tiny secret.
          One for every day, from the 25th of April to the 24th of May.
          Every star has been unfolded. Every word, kept.
        </p>
      </section>

      {/* ── STARS GRID ──────────────────────────────────── */}
      <section
        style={{
          padding: "20px clamp(16px, 4vw, 60px) 80px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "8px",
            justifyItems: "center",
          }}
        >
          {starNotes.map((star) => {
            const hue = getStarColor(star);
            const rot = (seeded(star.day) - 0.5) * 28;       // -14° to +14°
            const scale = 0.92 + seeded(star.day + 50) * 0.16; // 0.92–1.08

            return (
              <button
                key={star.day}
                onClick={() => setOpenStar(star)}
                aria-label={`Open star for ${star.date}`}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "12px",
                  transform: `rotate(${rot}deg) scale(${scale})`,
                  transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease",
                  filter: "drop-shadow(0 2px 6px rgba(120, 60, 40, 0.12))",
                  position: "relative",
                }}
                className="star-btn"
              >
                {/* SVG five-point star */}
                <svg
                  width="72"
                  height="72"
                  viewBox="0 0 100 100"
                  style={{ display: "block" }}
                >
                  {/* fold crease lines — subtle, like real origami */}
                  <defs>
                    <linearGradient id={`sg-${star.day}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={hue.fill} />
                      <stop offset="100%" stopColor={hue.stroke} stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="50,6 61,38 95,38 67,58 78,91 50,72 22,91 33,58 5,38 39,38"
                    fill={hue.fill}
                    stroke={hue.stroke}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  {/* origami fold lines */}
                  <line x1="50" y1="6" x2="50" y2="72" stroke={hue.stroke} strokeWidth="0.4" opacity="0.25" />
                  <line x1="22" y1="91" x2="78" y2="91" stroke={hue.stroke} strokeWidth="0.3" opacity="0.15" />
                  <line x1="50" y1="72" x2="22" y2="91" stroke={hue.stroke} strokeWidth="0.3" opacity="0.18" />
                  <line x1="50" y1="72" x2="78" y2="91" stroke={hue.stroke} strokeWidth="0.3" opacity="0.18" />
                  <line x1="50" y1="72" x2="5" y2="38" stroke={hue.stroke} strokeWidth="0.3" opacity="0.12" />
                  <line x1="50" y1="72" x2="95" y2="38" stroke={hue.stroke} strokeWidth="0.3" opacity="0.12" />
                  {/* day number marked on the star */}
                  <text
                    x="50"
                    y="55"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="#000000"
                    fontSize="20"
                    fontWeight="bold"
                    fontFamily="var(--font-dancing), var(--font-cedarville), cursive"
                    style={{
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {star.day}
                  </text>
                </svg>

                {/* day number — small, beneath the star */}
                <span
                  style={{
                    display: "block",
                    marginTop: "4px",
                    fontFamily: "var(--font-geist-sans), sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.08em",
                    color: "#8a5060",
                    opacity: 0.55,
                    textAlign: "center",
                  }}
                >
                  {star.date}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <section style={{ textAlign: "center", padding: "20px 24px 60px" }}>
        <span className="thin-rule" style={{ marginBottom: "20px" }} />
        <p
          style={{
            fontFamily: "var(--font-lora)",
            fontStyle: "italic",
            fontSize: "0.85rem",
            color: "#8a3858",
            opacity: 0.45,
          }}
        >
          every star she folded, I kept.
        </p>
      </section>

      {/* ── MODAL OVERLAY — the unfolded star ──────────── */}
      {openStar && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(62, 28, 42, 0.25)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            animation: isClosing
              ? "fadeOut 0.38s ease forwards"
              : "fadeIn 0.35s ease forwards",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "420px",
              width: "calc(100% - 48px)",
              animation: isClosing
                ? "noteClose 0.38s ease forwards"
                : "noteOpen 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
          >
            {/* The unfolded note — parchment paper */}
            <div
              className="note-paper"
              style={{
                padding: "40px 36px 36px",
                borderRadius: "8px",
                position: "relative",
              }}
            >
              {/* small star icon top-center */}
              <div
                style={{
                  position: "absolute",
                  top: "-18px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="30" height="30" viewBox="0 0 100 100">
                  <polygon
                    points="50,6 61,38 95,38 67,58 78,91 50,72 22,91 33,58 5,38 39,38"
                    fill={getStarColor(openStar).fill}
                    stroke={getStarColor(openStar).stroke}
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* date & day label */}
              <p
                style={{
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#9a6850",
                  opacity: 0.6,
                  marginBottom: "6px",
                  textAlign: "center",
                }}
              >
                {openStar.date} — {ordinal(openStar.day)} star
              </p>

              {/* decorative thin rule */}
              <span
                className="thin-rule"
                style={{ marginBottom: "22px", width: "28px" }}
              />

              {/* the actual note content */}
              {openStar.note ? (
                <p
                  style={{
                    fontFamily: "var(--font-lora)",
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
                    color: "#3e1c2a",
                    lineHeight: 1.85,
                    textAlign: "center",
                    whiteSpace: "pre-line",
                  }}
                >
                  {openStar.note}
                </p>
              ) : (
                <p
                  style={{
                    fontFamily: "var(--font-lora)",
                    fontStyle: "italic",
                    fontSize: "0.9rem",
                    color: "#8a5060",
                    opacity: 0.4,
                    textAlign: "center",
                    lineHeight: 1.8,
                  }}
                >
                  this star hasn&apos;t been written yet…
                </p>
              )}

              {/* close hint */}
              <p
                style={{
                  marginTop: "28px",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  color: "#8a5060",
                  opacity: 0.35,
                  textAlign: "center",
                }}
              >
                tap anywhere to fold back
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── SCOPED STYLES ──────────────────────────────── */}
      <style jsx>{`
        .star-btn:hover {
          transform: scale(1.12) rotate(0deg) !important;
          filter: drop-shadow(0 6px 18px rgba(180, 80, 100, 0.22)) !important;
        }
        .star-btn:active {
          transform: scale(0.95) rotate(0deg) !important;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        @keyframes noteOpen {
          from {
            opacity: 0;
            transform: scale(0.4) rotate(-12deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes noteClose {
          from {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          to {
            opacity: 0;
            transform: scale(0.4) rotate(12deg);
          }
        }
      `}</style>
    </main>
  );
}
