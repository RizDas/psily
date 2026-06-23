// app/rules/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/rules";

export const metadata: Metadata = {
  title: "Our Constitution — P.S. I Love You",
  description: "The rules and promises of us.",
};

const CLAUSE_LETTERS = ["a", "b", "c", "d", "e"];

const STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes sealReveal {
    from { opacity: 0; transform: scale(0.88) rotate(-5deg); }
    to   { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; }
  }

  .rules-page {
    position: relative;
    color: #2c1810;
    min-height: 100vh;
  }

  /* ── BACKGROUND: warm parchment with soft vignette only ── */
  .rules-bg {
    position: fixed;
    inset: 0;
    z-index: -1;
    background: #f5eacf;
  }
  .rules-bg::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 100% 55% at 50% 0%,   rgba(160,100,20,0.13) 0%, transparent 100%),
      radial-gradient(ellipse 80%  45% at 50% 100%,  rgba(120,75,10,0.10) 0%, transparent 100%),
      radial-gradient(ellipse 50%  80% at 0%   50%,  rgba(120,75,10,0.07) 0%, transparent 100%),
      radial-gradient(ellipse 50%  80% at 100% 50%,  rgba(120,75,10,0.07) 0%, transparent 100%);
  }

  .rules-container {
    max-width: 920px;
    margin: 0 auto;
    padding: 0 clamp(24px, 5vw, 64px) clamp(60px, 8vw, 100px);
  }

  /* ── BACK LINK ── */
  .back-link {
    display: inline-block;
    padding: clamp(20px, 3.5vw, 32px) 0 0;
    font-family: var(--font-cinzel), Georgia, serif;
    font-size: 0.6rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #8b6914;
    opacity: 0.55;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .back-link:hover { opacity: 0.9; }

  /* ── HEADER: light parchment, grandeur through type ── */
  .rules-header {
    text-align: center;
    padding: clamp(48px, 8vw, 88px) 0 clamp(36px, 5.5vw, 56px);
    animation: fadeUp 1s 0.1s ease both;
  }

  .overline {
    font-family: var(--font-cinzel), Georgia, serif;
    font-weight: 400;
    font-size: 0.58rem;
    letter-spacing: 0.38em;
    text-transform: uppercase;
    color: #8b6914;
    opacity: 0.52;
    margin: 0 0 clamp(26px, 4.5vw, 40px);
  }

  /* Decorative flourish above title */
  .title-flourish {
    display: block;
    margin: 0 auto clamp(18px, 3vw, 26px);
  }

  .rules-title {
    font-family: var(--font-cinzel-deco), Georgia, serif;
    font-weight: 700;
    font-size: clamp(2.2rem, 5.5vw, 3.6rem);
    letter-spacing: 0.06em;
    color: #2a1608;
    line-height: 1.12;
    margin: 0 0 clamp(20px, 3.5vw, 30px);
    text-shadow:
      0  1px 0 rgba(255,245,220,0.6),
      0 -1px 0 rgba(80,40,0,0.08);
  }

  /* Horizontal rule beneath title */
  .title-divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin: 0 auto clamp(22px, 3.5vw, 32px);
  }
  .title-divider-thick {
    width: clamp(100px, 22vw, 160px);
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139,105,20,0.55), transparent);
  }
  .title-divider-thin {
    width: clamp(56px, 12vw, 90px);
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139,105,20,0.32), transparent);
  }

  .subtitle {
    font-family: var(--font-garamond), Georgia, serif;
    font-style: italic;
    font-size: clamp(1.02rem, 2.1vw, 1.2rem);
    color: #5c3810;
    opacity: 0.78;
    line-height: 1.88;
    max-width: 580px;
    margin: 0 auto;
  }

  /* ── PREAMBLE ZONE ── */
  .preamble-zone {
    text-align: center;
    padding: clamp(24px, 4vw, 40px) 0 clamp(28px, 4.5vw, 44px);
    animation: fadeUp 1s 0.3s ease both;
  }

  .rule-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 280px;
    margin: 0 auto clamp(20px, 3.2vw, 28px);
  }
  .rule-divider::before,
  .rule-divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139,105,20,0.4), transparent);
  }
  .divider-ornament {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .divider-ornament span {
    display: block;
    background: #8b6914;
    transform: rotate(45deg);
  }
  .divider-ornament span:nth-child(1),
  .divider-ornament span:nth-child(3) { width: 4px; height: 4px; opacity: 0.42; }
  .divider-ornament span:nth-child(2) { width: 6px; height: 6px; opacity: 0.65; }

  .preamble {
    font-family: var(--font-garamond), Georgia, serif;
    font-size: clamp(0.97rem, 1.8vw, 1.1rem);
    color: #4e3008;
    opacity: 0.82;
    line-height: 2;
    max-width: 640px;
    margin: 0 auto;
  }

  /* ── ARTICLES ── */
  .articles {
    border-top: 1px solid rgba(139,105,20,0.22);
    animation: fadeUp 1s 0.5s ease both;
  }

  .article {
    position: relative;
    border-bottom: 1px solid rgba(139,105,20,0.2);
    padding: clamp(24px, 4.5vw, 40px) 0;
    overflow: hidden;
  }

  /* Ghost numeral watermark — elegant, not distracting */
  .article::before {
    content: attr(data-numeral);
    position: absolute;
    right: -0.04em;
    top: 50%;
    transform: translateY(-52%);
    font-family: var(--font-cinzel-deco), Georgia, serif;
    font-size: clamp(7rem, 19vw, 14rem);
    font-weight: 700;
    line-height: 1;
    color: #8b6914;
    opacity: 0.045;
    pointer-events: none;
    letter-spacing: -0.02em;
    user-select: none;
  }

  .article summary {
    list-style: none;
    cursor: pointer;
    position: relative;
    z-index: 1;
  }
  .article summary::-webkit-details-marker { display: none; }
  .article summary::marker { content: ""; }

  .article-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  }

  .article-label {
    font-family: var(--font-cinzel), Georgia, serif;
    font-weight: 600;
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #8b6914;
    opacity: 0.7;
    margin: 0 0 7px;
  }

  .article-title {
    font-family: var(--font-cinzel), Georgia, serif;
    font-weight: 700;
    font-size: clamp(1.1rem, 2.8vw, 1.4rem);
    color: #2e1c0a;
    letter-spacing: 0.02em;
    margin: 0;
    line-height: 1.28;
  }

  /* CSS-only toggle — cross/minus */
  .toggle {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border: 1px solid rgba(139,105,20,0.35);
    border-radius: 50%;
    margin-top: 3px;
    transition: border-color 0.25s, background 0.25s;
    position: relative;
  }
  .toggle::before,
  .toggle::after {
    content: "";
    position: absolute;
    top: 50%; left: 50%;
    background: #8b6914;
    opacity: 0.65;
    border-radius: 1px;
    transform-origin: center;
    transition: transform 0.25s ease, opacity 0.25s ease;
  }
  .toggle::before {
    width: 10px; height: 1.5px;
    transform: translate(-50%, -50%);
  }
  .toggle::after {
    width: 1.5px; height: 10px;
    transform: translate(-50%, -50%);
  }
  details[open] .toggle {
    background: rgba(139,105,20,0.08);
    border-color: rgba(139,105,20,0.55);
  }
  details[open] .toggle::after {
    transform: translate(-50%, -50%) scaleY(0);
    opacity: 0;
  }

  .provision {
    font-family: var(--font-garamond), Georgia, serif;
    font-style: italic;
    font-size: clamp(1rem, 1.85vw, 1.12rem);
    color: #3e2205;
    opacity: 0.87;
    line-height: 1.9;
    margin: clamp(12px, 2vw, 18px) 0 0;
    padding-right: 44px;
    position: relative;
    z-index: 1;
  }

  .provision::first-letter {
    font-family: var(--font-cinzel), Georgia, serif;
    font-style: normal;
    font-weight: 700;
    font-size: 2.1em;
    line-height: 0.72;
    float: left;
    margin: 0.06em 0.1em 0 0;
    color: #a07820;
  }

  .extended {
    margin-top: clamp(18px, 3vw, 26px);
    padding-top: clamp(16px, 2.8vw, 22px);
    padding-left: clamp(14px, 3vw, 26px);
    border-top: 1px solid rgba(139,105,20,0.18);
    border-left: 2px solid rgba(200,165,90,0.38);
    display: flex;
    flex-direction: column;
    gap: clamp(14px, 2.5vw, 22px);
    position: relative;
    z-index: 1;
  }

  .clause h3 {
    font-family: var(--font-cinzel), Georgia, serif;
    font-weight: 700;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #7a5210;
    margin: 0 0 7px;
    display: flex;
    align-items: baseline;
    gap: 9px;
  }

  .clause-letter {
    font-family: var(--font-garamond), Georgia, serif;
    font-style: italic;
    font-weight: 500;
    font-size: 1.15em;
    text-transform: none;
    letter-spacing: 0;
    color: #a07820;
    opacity: 0.88;
  }

  .clause p {
    font-family: var(--font-garamond), Georgia, serif;
    font-size: clamp(0.9rem, 1.58vw, 1rem);
    color: #4a2e0c;
    opacity: 0.86;
    line-height: 1.85;
    margin: 0;
  }

  /* ── SIGNATURES ── */
  .signature-section {
    margin-top: clamp(44px, 7vw, 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(20px, 3.5vw, 30px);
    animation: fadeUp 1s 0.7s ease both;
  }

  .wax-seal {
    width: clamp(86px, 15vw, 108px);
    height: clamp(86px, 15vw, 108px);
    filter: drop-shadow(0 6px 18px rgba(60,10,10,0.32));
    animation: sealReveal 0.9s 0.85s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  .sig-row {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: clamp(12px, 3.5vw, 28px);
    width: 100%;
    max-width: 480px;
  }

  .sig-name { text-align: center; }
  .sig-name .name {
    font-family: var(--font-tangerine), cursive;
    font-weight: 700;
    font-size: clamp(2.5rem, 7.5vw, 3.8rem);
    color: #3a1f08;
    opacity: 0.86;
    line-height: 0.85;
    margin-bottom: 6px;
    text-shadow: 0 1px 0 rgba(255,245,220,0.5);
  }
  .sig-name .line {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(100,65,10,0.35), transparent);
    margin-bottom: 7px;
  }
  .sig-name .label {
    font-family: var(--font-cinzel), Georgia, serif;
    font-size: 0.55rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #8b6914;
    opacity: 0.48;
  }

  .sig-amp {
    font-family: var(--font-tangerine), cursive;
    font-weight: 700;
    font-size: clamp(2rem, 5.5vw, 3rem);
    color: #a07820;
    opacity: 0.4;
  }

  .footnote {
    font-family: var(--font-garamond), Georgia, serif;
    font-style: italic;
    font-size: clamp(0.75rem, 1.3vw, 0.84rem);
    color: #6b4c10;
    opacity: 0.48;
    text-align: center;
    line-height: 1.82;
    max-width: 320px;
  }

  .rules-footer {
    text-align: center;
    margin-top: clamp(38px, 5.5vw, 52px);
    color: #8b6914;
    opacity: 0.28;
    font-size: 0.88rem;
    letter-spacing: 0.12em;
  }

  @media (max-width: 600px) {
    .extended { padding-left: 12px; }
    .provision { padding-right: 0; }
  }
`;

export default function RulesPage() {
  return (
    <main className="rules-page">
      <div className="rules-bg" aria-hidden="true" />
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="rules-container">
        <Link href="/" className="back-link">
          ← Back home
        </Link>

        {/* ── HEADER ── */}
        <header className="rules-header">
          <p className="overline">
            Rishabh &amp; Manushree · A living document
          </p>

          {/* Flourish SVG — fine pen strokes, not a crown icon */}
          <svg
            className="title-flourish"
            width="200"
            height="20"
            viewBox="0 0 400 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0,20 Q40,4 80,20 Q120,36 160,20 Q200,4 240,20 Q280,36 320,20 Q360,4 400,20"
              stroke="#8b6914"
              strokeWidth="0.8"
              opacity="0.35"
              fill="none"
            />
            <path
              d="M60,20 Q100,10 140,20 Q180,30 220,20 Q260,10 300,20 Q340,30 380,20"
              stroke="#8b6914"
              strokeWidth="0.5"
              opacity="0.2"
              fill="none"
            />
            <circle cx="200" cy="20" r="2.5" fill="#8b6914" opacity="0.45" />
            <circle cx="60" cy="20" r="1.5" fill="#8b6914" opacity="0.28" />
            <circle cx="340" cy="20" r="1.5" fill="#8b6914" opacity="0.28" />
          </svg>

          <h1 className="rules-title">Our Constitution</h1>

          <div className="title-divider" aria-hidden="true">
            <div className="title-divider-thick" />
            <div className="title-divider-thin" />
          </div>

          <p className="subtitle">
            A solemn and tender declaration of the promises, principles, and
            sacred rules by which we, henceforth, agree to love one another.
          </p>
        </header>

        {/* ── PREAMBLE ── */}
        <div className="preamble-zone">
          <div className="rule-divider">
            <div className="divider-ornament">
              <span />
              <span />
              <span />
            </div>
          </div>
          <p className="preamble">
            <em>
              We, two people who found each other against all odds, do hereby
              set forth the following articles — not as law, but as love — to
              guide us through the ordinary and the extraordinary alike. Each
              article carries its own quiet weight; open it to read it in full.
            </em>
          </p>
        </div>

        {/* ── ARTICLES ── */}
        <section className="articles" aria-label="Articles of the constitution">
          {ARTICLES.map((article) => (
            <details
              key={article.numeral}
              name="rules-accordion"
              className="article"
              data-numeral={article.numeral}
            >
              <summary>
                <div className="article-head">
                  <div>
                    <p className="article-label">Article {article.numeral}</p>
                    <h2 className="article-title">{article.title}</h2>
                  </div>
                  <span className="toggle" aria-hidden="true" />
                </div>
                <p className="provision">{article.provision}</p>
              </summary>

              <div className="extended">
                {article.sections.map((section, i) => (
                  <div className="clause" key={section.title}>
                    <h3>
                      <span className="clause-letter">
                        ({CLAUSE_LETTERS[i]})
                      </span>
                      {section.title}
                    </h3>
                    <p>{section.text}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </section>

        {/* ── CLOSING DIVIDER ── */}
        <div style={{ marginTop: "clamp(40px, 6vw, 56px)" }}>
          <div className="rule-divider">
            <div className="divider-ornament">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        {/* ── SIGNATURES ── */}
        <div className="signature-section">
          <div className="wax-seal" aria-hidden="true">
            <svg viewBox="0 0 120 120" width="100%" height="100%">
              <defs>
                <radialGradient id="waxOuterGrad" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#d34040" />
                  <stop offset="50%" stopColor="#9c1c1c" />
                  <stop offset="85%" stopColor="#751212" />
                  <stop offset="100%" stopColor="#4f0a0a" />
                </radialGradient>
                <radialGradient id="waxInnerGrad" cx="30%" cy="25%" r="55%">
                  <stop offset="0%" stopColor="#801414" />
                  <stop offset="70%" stopColor="#5a0b0b" />
                  <stop offset="100%" stopColor="#3d0505" />
                </radialGradient>
                <linearGradient
                  id="heartGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#e87070" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#b52626" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#540b0b" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <path
                d="M 58,114 C 24,115 6,95 8,62 C 10,29 27,8 61,10 C 95,12 113,31 111,63 C 109,95 92,113 58,114 Z"
                fill="url(#waxOuterGrad)"
              />
              <path
                d="M 60,98 C 39,98 22,81 22,60 C 22,39 39,22 60,22 C 81,22 98,39 98,60 C 98,81 81,98 60,98 Z"
                fill="none"
                stroke="#610a0a"
                strokeWidth="1.5"
                opacity="0.35"
              />
              <circle cx="60" cy="60" r="37" fill="url(#waxInnerGrad)" />
              <circle
                cx="60"
                cy="60"
                r="37"
                fill="none"
                stroke="#420808"
                strokeWidth="2.5"
                opacity="0.65"
              />
              <g filter="drop-shadow(0px 1.5px 1.5px rgba(0,0,0,0.5))">
                <path
                  d="M 60,78 C 60,78 35,63 35,48 C 35,40 42,34 51,39 C 55.5,41.5 60,46.5 60,46.5 C 60,46.5 64.5,41.5 69,39 C 78,34 85,40 85,48 C 85,63 60,78 60,78 Z"
                  fill="url(#heartGrad)"
                />
              </g>
              <ellipse
                cx="42"
                cy="38"
                rx="14"
                ry="7"
                fill="#ffffff"
                opacity="0.08"
                transform="rotate(-30 42 38)"
              />
            </svg>
          </div>

          <div className="sig-row">
            <div className="sig-name">
              <div className="name">Rishabh</div>
              <div className="line" />
              <p className="label">His mark</p>
            </div>
            <div className="sig-amp">&amp;</div>
            <div className="sig-name">
              <div className="name">Manushree</div>
              <div className="line" />
              <p className="label">Her mark</p>
            </div>
          </div>

          <p className="footnote">
            This document, once felt, is binding upon the soul. It requires no
            witnesses — only us.
          </p>
        </div>

        <p className="rules-footer">🪶 ❖ 🪶</p>
      </div>
    </main>
  );
}
