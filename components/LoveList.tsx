"use client";

import { loveList } from "@/lib/loveList";
import { useState } from "react";

export default function LoveList() {
  const [currentNote, setCurrentNote] = useState<{ id: number; text: string } | null>(null);
  const [isSealed, setIsSealed]       = useState(true);
  const [isShaking, setIsShaking]     = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const pickRandomNote = () => {
    setIsShaking(true);
    setIsAnimating(true);
    setTimeout(() => setIsShaking(false), 220);
    setTimeout(() => {
      const i = Math.floor(Math.random() * loveList.length);
      setCurrentNote(loveList[i]);
      setIsSealed(true);
      setIsAnimating(false);
    }, 600);
  };

  const openEnvelope = () => {
    setIsAnimating(true);
    setTimeout(() => { setIsSealed(false); setIsAnimating(false); }, 450);
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px clamp(24px, 6vw, 80px)",
      }}
    >
      <div style={{ maxWidth: "480px", width: "100%", margin: "0 auto", textAlign: "center" }}>

        <h2
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "#3e1c2a",
            lineHeight: 1.2,
            marginBottom: "10px",
          }}
        >
          A Jar of Little Reasons
        </h2>
        <p
          style={{
            fontFamily: "var(--font-lora)",
            fontStyle: "italic",
            fontSize: "clamp(0.88rem, 1.6vw, 0.98rem)",
            color: "#7a3848",
            opacity: 0.7,
            marginBottom: "52px",
            lineHeight: 1.7,
          }}
        >
          Shake it, open it, read one small reason I love you.
        </p>

        {/* Note area */}
        <div style={{ minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "36px" }}>
          {currentNote === null ? null : isSealed ? (
            /* sealed slip */
            <div
              onClick={openEnvelope}
              className={isShaking ? "shake" : ""}
              style={{
                cursor: "pointer",
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? "scale(0.9)" : "scale(1)",
                transition: "all 0.3s ease",
              }}
            >
              <div
                className="note-paper"
                style={{
                  padding: "22px 36px",
                  borderRadius: "6px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  minWidth: "180px",
                }}
              >
                {/* simple wax blob */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 38% 36%, #d46050, #a03828)",
                    border: "2px solid rgba(255,200,185,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,230,220,0.9)",
                    fontSize: "12px",
                  }}
                >
                  ♥
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans), sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    color: "#8a4050",
                    opacity: 0.6,
                  }}
                >
                  tap to open
                </p>
              </div>
            </div>
          ) : (
            /* open note — slight tilt, feels found */
            <div
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? "scale(0.9) rotate(-4deg)" : "rotate(-1.5deg)",
                transition: "all 0.45s ease",
              }}
            >
              <div
                className="note-paper"
                style={{
                  padding: "28px 36px",
                  borderRadius: "5px",
                  maxWidth: "380px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-lora)",
                    fontStyle: "italic",
                    fontSize: "clamp(0.95rem, 2vw, 1.08rem)",
                    color: "#3e1c2a",
                    lineHeight: 1.9,
                    letterSpacing: "0.01em",
                  }}
                >
                  {currentNote.text}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Button */}
        {currentNote === null || !isSealed ? (
          <button
            onClick={pickRandomNote}
            disabled={isAnimating}
            className={`ghost-btn ${isShaking ? "shake" : ""}`}
          >
            {isAnimating ? "picking one…" : "shake & pick"}
          </button>
        ) : (
          <p
            style={{
              fontFamily: "var(--font-lora)",
              fontStyle: "italic",
              fontSize: "0.82rem",
              color: "#8a3858",
              opacity: 0.5,
            }}
          >
            tap the note to open it
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25%       { transform: translateX(-7px) rotate(-1.5deg); }
          50%       { transform: translateX(7px) rotate(1.5deg); }
          75%       { transform: translateX(-5px) rotate(-0.8deg); }
        }
        .shake { animation: shake 0.28s ease-in-out; }
      `}</style>
    </section>
  );
}
