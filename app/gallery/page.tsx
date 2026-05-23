"use client";

import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "/gallery/saraswati puja.jpg",
  "/gallery/acropolis 1month anniv.jpg",
  "/gallery/end of bday week.png",
  "/gallery/near home mon meetup.png",
  "/gallery/cove1.png",
];

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [colWidth, setColWidth] = useState(320);

  useEffect(() => {
    function updateCol() {
      const w = window.innerWidth;
      if (w < 520) setColWidth(Math.min(520, Math.floor(w - 48)));
      else if (w < 880) setColWidth(300);
      else if (w < 1200) setColWidth(340);
      else setColWidth(380);
    }
    updateCol();
    window.addEventListener("resize", updateCol);
    return () => window.removeEventListener("resize", updateCol);
  }, []);

  return (
    <section
      className="bg-layer"
      style={{ padding: "60px clamp(18px, 6vw, 80px)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          className="cozy-box"
          style={{ padding: "26px 30px", marginBottom: 22 }}
        >
          <h2
            style={{
              fontFamily: "var(--font-dancing)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "#3c2010",
              margin: 0,
              textAlign: "center",
            }}
          >
            A Little Gallery of Us
          </h2>
          <span
            className="thin-rule"
            style={{ margin: "12px auto 8px", display: "block" }}
          />
          <p
            style={{
              margin: 0,
              marginTop: 4,
              color: "#6e2f3a",
              opacity: 0.95,
              textAlign: "center",
              fontFamily: "var(--font-lora)",
              fontStyle: "italic",
            }}
          >
            Soft light, warm tones, and the quiet moments we keep forever.
          </p>
        </div>

        <div
          ref={containerRef}
          className="masonry"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${colWidth}px, 1fr))`,
            gap: "20px",
            width: "100%",
          }}
        >
          {IMAGES.map((src) => (
            <figure className="masonry-item" key={src}>
              <img
                src={src}
                alt="gallery"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  borderRadius: 12,
                  boxShadow: "0 12px 36px rgba(80,40,30,0.12)",
                }}
              />
            </figure>
          ))}
        </div>
      </div>

      <style jsx>{`
        .masonry {
          break-inside: avoid;
        }
        .masonry-item {
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          margin: 0 0 18px;
          padding: 4px;
          background: rgba(254, 249, 239, 0.55);
          border-radius: 12px;
          border: 1px solid rgba(160, 115, 85, 0.06);
        }
        .masonry-item img {
          display: block;
        }

        @media (max-width: 520px) {
          .masonry-item {
            padding: 6px;
          }
        }
      `}</style>
    </section>
  );
}
