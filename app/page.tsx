// app/page.tsx

import TimeCounter from "@/components/TimeCounter";
import LoveList from "@/components/LoveList";
import LoveLetter from "@/components/LoveLetter";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative" style={{ color: "#3e1c2a" }}>
      {/* fixed warm background */}
      <div className="fixed inset-0 -z-10 bg-layer">
        <div
          className="petal"
          style={{
            left: "10%",
            width: "13px",
            height: "8px",
            background: "rgba(200, 125, 135, 0.28)",
            animationDuration: "30s",
            animationDelay: "0s",
          }}
        />
        <div
          className="petal"
          style={{
            left: "55%",
            width: "9px",
            height: "6px",
            background: "rgba(190, 115, 125, 0.22)",
            animationDuration: "38s",
            animationDelay: "14s",
          }}
        />
        <div
          className="petal"
          style={{
            left: "82%",
            width: "11px",
            height: "7px",
            background: "rgba(195, 120, 130, 0.2)",
            animationDuration: "34s",
            animationDelay: "24s",
          }}
        />
        <div
          className="soft-heart"
          style={{ left: "28%", animationDelay: "6s" }}
        />
        <div
          className="soft-heart"
          style={{ left: "70%", animationDelay: "19s" }}
        />
      </div>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center text-center"
        style={{ padding: "0 clamp(24px, 6vw, 80px)" }}
      >
        <h1
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(3.2rem, 9vw, 7rem)",
            color: "#3e1c2a",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            marginBottom: "28px",
          }}
        >
          Our Story
        </h1>

        <span className="thin-rule" style={{ marginBottom: "28px" }} />

        <p
          style={{
            fontFamily: "var(--font-lora)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
            color: "#6a2840",
            opacity: 0.8,
            maxWidth: "380px",
            lineHeight: 1.7,
          }}
        >
          somehow, somewhere — it all became you.
        </p>

        <p
          style={{
            marginTop: "64px",
            fontFamily: "var(--font-geist-sans), sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8a3858",
            opacity: 0.4,
          }}
        >
          scroll
        </p>
      </section>

      {/* ── TIME COUNTER ───────────────────────────────────── */}
      <section
        className="min-h-screen flex items-center justify-center"
        style={{ padding: "60px clamp(24px, 6vw, 80px)" }}
      >
        <TimeCounter />
      </section>

      {/* ── LOVE LIST ──────────────────────────────────────── */}
      <LoveList />

      {/* ── HER COLOUR ─────────────────────────────────────── */}
      <section
        className="her-section"
        style={{ padding: "80px clamp(24px, 6vw, 80px)" }}
      >
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(200, 238, 232, 0.7)",
              marginBottom: "20px",
            }}
          >
            your favourite colour
          </p>

          <p
            style={{
              fontFamily: "var(--font-dancing)",
              fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)",
              color: "#e6f7f4",
              lineHeight: 1.35,
              marginBottom: "20px",
            }}
          >
            I tried to remake it —
          </p>

          <p
            style={{
              fontFamily: "var(--font-lora)",
              fontStyle: "italic",
              fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
              color: "rgba(210, 245, 240, 0.8)",
              lineHeight: 1.8,
              maxWidth: "420px",
            }}
          >
            the exact shade of green you love to see. That particular teal. I
            know it. I look for it everywhere. It feels like you.
          </p>
        </div>
      </section>

      {/* ── LOVE LETTER ────────────────────────────────────── */}
      <LoveLetter />

      {/* ── CLOSING ────────────────────────────────────────── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center text-center"
        style={{ padding: "0 clamp(24px, 6vw, 80px)" }}
      >
        <span className="thin-rule" style={{ marginBottom: "40px" }} />

        <p
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            color: "#3e1c2a",
            lineHeight: 1.4,
            marginBottom: "16px",
          }}
        >
          and still —
        </p>

        <p
          style={{
            fontFamily: "var(--font-lora)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#6a2840",
            opacity: 0.7,
            maxWidth: "340px",
            lineHeight: 1.75,
          }}
        >
          this is only the beginning of everything I want to give you.
        </p>
        <Link
          href="/timeline"
          style={{
            fontFamily: "var(--font-lora)",
            fontStyle: "italic",
            fontSize: "6px",
            color: "#6a2840",
            opacity: 0.7,
            maxWidth: "340px",
            lineHeight: 5,
          }}
        >
          P.S. click here once
        </Link>

        <span className="thin-rule" style={{ marginTop: "30px" }} />
      </section>
    </main>
  );
}
