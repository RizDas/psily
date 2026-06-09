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
  ylw: { fill: "#e7e751", stroke: "#e7e751" },
  pnk: { fill: "#de9aa4", stroke: "#de9aa4" },
  blu: { fill: "#84b6d3", stroke: "#84b6d3" },
  org: { fill: "#f8b946", stroke: "#f8b946" },
  grn: { fill: "#65d66d", stroke: "#65d66d" },
};
const PRESET_KEYS = Object.keys(STAR_HUES);

function darkenColor(hex: string, percent: number) {
  try {
    const cleanHex = hex.replace("#", "");
    let num = parseInt(cleanHex, 16);
    if (isNaN(num)) return hex;
    const amt = Math.round(2.55 * percent);
    let R = (num >> 16) - amt;
    let G = ((num >> 8) & 0x00ff) - amt;
    let B = (num & 0x0000ff) - amt;
    R = Math.max(0, Math.min(255, R));
    G = Math.max(0, Math.min(255, G));
    B = Math.max(0, Math.min(255, B));
    return (
      "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)
    );
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
      <div
        className="fixed inset-0 -z-10 bg-layer"
        style={{
          background:
            "radial-gradient(ellipse at 18% 20%, rgba(210, 148, 148, 0.22), transparent 46%)," +
            "radial-gradient(ellipse at 80% 16%, rgba(200, 138, 140, 0.18), transparent 40%)," +
            "radial-gradient(ellipse at 45% 82%, rgba(190, 128, 132, 0.13), transparent 50%)," +
            "linear-gradient(158deg, #f7efec 0%, #f1e4e0 38%, #ecd8d3 68%, #e6ccc7 100%)",
        }}
      />

      {/* ── HEADER ──────────────────────────────────────── */}
      <section
        className="stars-header"
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
          30 stars · 30 days
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
          className="stars-description"
          style={{
            fontFamily: "var(--font-lora)",
            fontStyle: "italic",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: "#5b253f",
            opacity: 0.78,
            maxWidth: "560px",
            margin: "0 auto",
            lineHeight: 1.9,
            letterSpacing: "0.01em",
          }}
        >
          Thirty folded paper stars, each holding a tiny note. One for every
          day, from the 25th of April to the 24th of May. I know how much time
          and energy you spent to make these for me, and I really appreciate it.
          Thanks for loving me like the way you do. I love you sooooooooooo
          much!
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
          className="stars-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(96px, 1fr))",
            gap: "clamp(10px, 1.6vw, 18px)",
            justifyItems: "center",
          }}
        >
          {starNotes.map((star) => {
            const hue = getStarColor(star);
            const rot = (seeded(star.day) - 0.5) * 28; // -14° to +14°
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
                  padding: "clamp(8px, 1.2vw, 14px)",
                  transform: `rotate(${rot}deg) scale(${scale})`,
                  transition:
                    "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease",
                  filter: "drop-shadow(0 2px 6px rgba(120, 60, 40, 0.12))",
                  position: "relative",
                }}
                className="star-btn"
              >
                {/* SVG five-point star */}
                <svg
                  viewBox="0 0 100 100"
                  style={{
                    display: "block",
                    width: "min(72px, 12vw)",
                    height: "min(72px, 12vw)",
                  }}
                >
                  {/* fold crease lines — subtle, like real origami */}
                  <defs>
                    <linearGradient
                      id={`sg-${star.day}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={hue.fill} />
                      <stop
                        offset="100%"
                        stopColor={hue.stroke}
                        stopOpacity="0.6"
                      />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="50,14 62,40 94,45 70,64 76,94 50,78 24,94 30,64 6,45 38,40"
                    fill={hue.fill}
                    stroke={hue.stroke}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  {/* origami fold lines */}
                  <line
                    x1="50"
                    y1="6"
                    x2="50"
                    y2="72"
                    stroke={hue.stroke}
                    strokeWidth="0.4"
                    opacity="0.25"
                  />
                  <line
                    x1="22"
                    y1="91"
                    x2="78"
                    y2="91"
                    stroke={hue.stroke}
                    strokeWidth="0.3"
                    opacity="0.15"
                  />
                  <line
                    x1="50"
                    y1="72"
                    x2="22"
                    y2="91"
                    stroke={hue.stroke}
                    strokeWidth="0.3"
                    opacity="0.18"
                  />
                  <line
                    x1="50"
                    y1="72"
                    x2="78"
                    y2="91"
                    stroke={hue.stroke}
                    strokeWidth="0.3"
                    opacity="0.18"
                  />
                  <line
                    x1="50"
                    y1="72"
                    x2="5"
                    y2="38"
                    stroke={hue.stroke}
                    strokeWidth="0.3"
                    opacity="0.12"
                  />
                  <line
                    x1="50"
                    y1="72"
                    x2="95"
                    y2="38"
                    stroke={hue.stroke}
                    strokeWidth="0.3"
                    opacity="0.12"
                  />
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
                    fontSize: "clamp(0.56rem, 0.95vw, 0.72rem)",
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
      <section
        className="stars-footer"
        style={{ textAlign: "center", padding: "20px 24px 60px" }}
      >
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
          thank you so much. every star means the world to me.
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
            className="note-modal-wrapper"
            style={{
              position: "relative",
              maxWidth: "420px",
              width: "min(100%, 420px)",
              margin: "0 12px",
              animation: isClosing
                ? "noteClose 0.38s ease forwards"
                : "noteOpen 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
          >
            {/* The unfolded note — star-colored background */}
            <div
              className="note-content"
              style={{
                padding:
                  "clamp(24px, 6vw, 40px) clamp(22px, 5.5vw, 36px) clamp(22px, 5.5vw, 36px)",
                borderRadius: "8px",
                position: "relative",
                background: getStarColor(openStar).fill,
                opacity: 0.92,
                boxShadow:
                  "0 10px 40px rgba(90, 50, 10, 0.18)," +
                  "0 2px 8px rgba(90, 50, 10, 0.12)," +
                  "inset 0 1px 0 rgba(255, 255, 255, 0.4)",
              }}
            >
              {/* small star icon top-center */}
              <div
                className="note-star-icon"
                style={{
                  position: "absolute",
                  top: "clamp(-14px, -3vw, -18px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "clamp(32px, 8vw, 50px)",
                  height: "clamp(32px, 8vw, 50px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <polygon
                    points="50,14 62,40 94,45 70,64 76,94 50,78 24,94 30,64 6,45 38,40"
                    fill="#ffffff"
                    stroke={getStarColor(openStar).stroke}
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <text
                    x="50"
                    y="55"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="#000000"
                    fontSize="clamp(18, 4vw, 26)"
                    fontWeight="bold"
                    fontFamily="var(--font-dancing), var(--font-cedarville), cursive"
                    style={{
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {openStar.day}
                  </text>
                </svg>
              </div>

              {/* the actual note content */}
              {openStar.note ? (
                <p
                  style={{
                    fontFamily: "var(--font-lora)",
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
                    color: "#2a1620",
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
                    color: "#3d1f28",
                    opacity: 0.55,
                    textAlign: "center",
                    lineHeight: 1.8,
                  }}
                >
                  this star hasn&apos;t been written yet…
                </p>
              )}

              {/* close hint */}
              <p
                className="note-close-hint"
                style={{
                  marginTop: "clamp(18px, 4vw, 28px)",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  fontSize: "clamp(0.55rem, 0.8vw, 0.65rem)",
                  letterSpacing: "0.12em",
                  color: "#3d1f28",
                  opacity: 0.5,
                  textAlign: "center",
                }}
              >
                tap outside to fold back
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

        .stars-grid {
          gap: clamp(10px, 1.6vw, 18px);
        }

        .stars-header {
          max-width: 960px;
          margin: 0 auto;
        }

        .stars-description {
          width: min(100%, 560px);
        }

        .stars-footer {
          max-width: 860px;
          margin: 0 auto;
        }

        @media (max-width: 920px) {
          .stars-header {
            padding: clamp(42px, 9vw, 76px) clamp(16px, 6vw, 72px) 18px;
          }
          .stars-description {
            font-size: clamp(0.9rem, 2vw, 1rem);
            line-height: 1.92;
          }
          .stars-footer {
            padding: 18px 18px 52px;
          }
        }

        @media (max-width: 720px) {
          .stars-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          }
          .star-btn {
            min-width: 88px;
            padding: 10px;
          }
          .star-btn:hover {
            transform: scale(1.08) rotate(0deg) !important;
          }
          .stars-description {
            padding: 0 8px;
          }
          .stars-header h1 {
            font-size: clamp(2.2rem, 10vw, 4.2rem);
          }
        }

        @media (max-width: 540px) {
          .stars-grid {
            grid-template-columns: repeat(auto-fit, minmax(84px, 1fr));
          }
          .star-btn {
            min-width: 80px;
            padding: 8px;
            filter: drop-shadow(0 2px 6px rgba(120, 60, 40, 0.14));
          }
          .stars-description {
            font-size: clamp(0.86rem, 3.4vw, 0.96rem);
            line-height: 1.95;
            max-width: 100%;
          }
          .stars-header {
            padding: 24px 16px 16px;
          }
          .stars-footer {
            padding: 16px 16px 48px;
          }
          .note-paper {
            padding: 28px 22px 26px !important;
          }
          .thin-rule {
            margin-bottom: 14px !important;
          }
          .star-btn:hover {
            transform: scale(1.05) rotate(0deg) !important;
          }
        }

        @media (max-width: 720px) {
          .note-modal-wrapper {
            max-width: 90vw;
          }
          .note-content {
            border-radius: 6px;
          }
        }

        @media (max-width: 540px) {
          .note-modal-wrapper {
            max-width: 95vw;
            margin: 0 8px;
          }
          .note-content p {
            line-height: 1.75;
          }
          .note-close-hint {
            margin-top: clamp(16px, 3vw, 20px) !important;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
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
