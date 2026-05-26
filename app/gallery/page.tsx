"use client";

import { useEffect, useState } from "react";

const IMAGES = [
  {
    src: "/gallery/saraswati puja.jpg",
    caption: "Our first picture together, at the Saraswati Puja",
    date: "23 Jan 2026",
  },
  {
    src: "/gallery/acropolis 1month anniv.jpg",
    caption: "One month of endless memories",
    date: "24 Apr 2026",
  },
  {
    src: "/gallery/end of bday week.png",
    caption: "The sweetness of my special week",
    date: "16 May 2026",
  },
  {
    src: "/gallery/near home mon meetup.png",
    caption: "A quiet evening close to home",
    date: "18 May 2026",
  },
  {
    src: "/gallery/cove1.png",
    caption: "Cove, and just us",
    date: "21 May 2026",
  },
];

export default function GalleryPage() {
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function updateDevice() {
      setIsMobile(window.innerWidth < 1024);
    }
    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => window.removeEventListener("resize", updateDevice);
  }, []);

  const handleImageClick = (index: number) => {
    if (isMobile) {
      setExpandedMobile(expandedMobile === index ? null : index);
    }
  };

  return (
    <section
      className="bg-layer"
      style={{ padding: "60px clamp(18px, 6vw, 80px)" }}
    >
      <div style={{ maxWidth: isMobile ? "100%" : "66.67%", margin: "0 auto" }}>
        {/* Header */}
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

        {/* Gallery Grid */}
        {isMobile ? (
          // Mobile Layout: One image per row, stacked, description on click
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {IMAGES.map((image, index) => (
              <figure
                key={index}
                className="gallery-item-mobile"
                style={{
                  margin: 0,
                  padding: 0,
                  cursor: "pointer",
                }}
                onClick={() => handleImageClick(index)}
              >
                <div
                  style={{
                    padding: "4px",
                    background: "rgba(254, 249, 239, 0.55)",
                    borderRadius: "12px",
                    border: "1px solid rgba(160, 115, 85, 0.06)",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.caption}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      borderRadius: 12,
                      boxShadow: "0 12px 36px rgba(80,40,30,0.12)",
                    }}
                  />
                </div>
                {expandedMobile === index && (
                  <figcaption
                    style={{
                      marginTop: "12px",
                      textAlign: "center",
                      color: "#6e2f3a",
                      fontFamily: "var(--font-lora)",
                      fontStyle: "italic",
                      fontSize: "0.95rem",
                      padding: "8px",
                      animation: "fadeIn 0.3s ease-in",
                    }}
                  >
                    <div>{image.caption}</div>
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: "0.85rem",
                        opacity: 0.8,
                      }}
                    >
                      {image.date}
                    </div>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        ) : (
          // Desktop Layout: One image per row, alternating left/right with details
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            {IMAGES.map((image, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "40px",
                    alignItems: "center",
                  }}
                >
                  {isEven ? (
                    <>
                      {/* Image on left */}
                      <figure
                        style={{
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <div
                          style={{
                            padding: "4px",
                            background: "rgba(254, 249, 239, 0.55)",
                            borderRadius: "12px",
                            border: "1px solid rgba(160, 115, 85, 0.06)",
                          }}
                        >
                          <img
                            src={image.src}
                            alt={image.caption}
                            style={{
                              display: "block",
                              width: "100%",
                              height: "auto",
                              borderRadius: 12,
                              boxShadow: "0 12px 36px rgba(80,40,30,0.12)",
                            }}
                          />
                        </div>
                      </figure>
                      {/* Details on right */}
                      <figcaption
                        style={{
                          color: "#6e2f3a",
                          fontFamily: "var(--font-lora)",
                          fontStyle: "italic",
                          fontSize: "1.1rem",
                          lineHeight: 1.6,
                          padding: "20px",
                        }}
                      >
                        <div>{image.caption}</div>
                        <div
                          style={{
                            marginTop: 10,
                            fontSize: "0.95rem",
                            opacity: 0.8,
                          }}
                        >
                          {image.date}
                        </div>
                      </figcaption>
                    </>
                  ) : (
                    <>
                      {/* Details on left */}
                      <figcaption
                        style={{
                          color: "#6e2f3a",
                          fontFamily: "var(--font-lora)",
                          fontStyle: "italic",
                          fontSize: "1.1rem",
                          lineHeight: 1.6,
                          padding: "20px",
                        }}
                      >
                        <div>{image.caption}</div>
                        <div
                          style={{
                            marginTop: 10,
                            fontSize: "0.95rem",
                            opacity: 0.8,
                          }}
                        >
                          {image.date}
                        </div>
                      </figcaption>
                      {/* Image on right */}
                      <figure
                        style={{
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <div
                          style={{
                            padding: "4px",
                            background: "rgba(254, 249, 239, 0.55)",
                            borderRadius: "12px",
                            border: "1px solid rgba(160, 115, 85, 0.06)",
                          }}
                        >
                          <img
                            src={image.src}
                            alt={image.caption}
                            style={{
                              display: "block",
                              width: "100%",
                              height: "auto",
                              borderRadius: 12,
                              boxShadow: "0 12px 36px rgba(80,40,30,0.12)",
                            }}
                          />
                        </div>
                      </figure>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gallery-item-mobile img {
          display: block;
        }

        @media (max-width: 1023px) {
          /* Adjust padding for smaller devices */
        }
      `}</style>
    </section>
  );
}
