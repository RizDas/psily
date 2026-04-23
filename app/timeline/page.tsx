import { timeline } from "@/lib/timeline";

export default function TimelinePage() {
  return (
    <main className="relative min-h-screen" style={{ color: "#3c2010" }}>
      {/* same warm background */}
      <div className="fixed inset-0 -z-10 bg-layer" />

      <section
        style={{ padding: "clamp(64px, 10vw, 100px) clamp(24px, 6vw, 80px)" }}
      >
        {/* Header — no box, just text */}
        <div style={{ maxWidth: "640px", margin: "0 auto 72px" }}>
          <h1
            style={{
              fontFamily: "var(--font-dancing)",
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              color: "#3c2010",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Our Timeline
          </h1>
          <span className="thin-rule" style={{ margin: "0 0 20px 0" }} />
          <p
            style={{
              fontFamily: "var(--font-lora)",
              fontStyle: "italic",
              fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
              color: "#7a4828",
              opacity: 0.7,
            }}
          >
            Every moment that slowly turned into us.
          </p>
        </div>

        {/* Journal-style entries — left margin spine */}
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            position: "relative",
            paddingLeft: "36px",
          }}
        >
          {/* left spine */}
          <div
            style={{
              position: "absolute",
              left: "7px",
              top: "8px",
              bottom: "8px",
              width: "1px",
              background:
                "linear-gradient(to bottom, transparent, rgba(160, 95, 65, 0.35) 6%, rgba(160, 95, 65, 0.35) 94%, transparent)",
            }}
          />

          <div
            style={{ display: "flex", flexDirection: "column", gap: "56px" }}
          >
            {timeline.map((event) => (
              <div
                key={event.id}
                style={{ position: "relative", display: "flex", gap: "0" }}
              >
                {/* dot on spine */}
                <div
                  style={{
                    position: "absolute",
                    left: "-33px",
                    top: "7px",
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: "#c07060",
                    border: "2px solid rgba(222, 205, 185, 0.9)",
                    flexShrink: 0,
                  }}
                />

                {/* Entry content */}
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans), sans-serif",
                      fontSize: "0.8rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#9a6040",
                      opacity: 0.65,
                      marginBottom: "6px",
                    }}
                  >
                    {event.date}
                  </p>

                  <h3
                    style={{
                      fontFamily: "var(--font-dancing)",
                      fontSize: "clamp(1.4rem, 3.2vw, 2rem)",
                      color: "#3c2010",
                      lineHeight: 1.2,
                      marginBottom: "10px",
                    }}
                  >
                    {event.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-lora)",
                      fontSize: "clamp(0.88rem, 1.6vw, 0.98rem)",
                      color: "#5c3418",
                      opacity: 0.8,
                      lineHeight: 1.8,
                      maxWidth: "480px",
                    }}
                  >
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* end flourish */}
          <div
            style={{
              marginTop: "64px",
              paddingLeft: "0",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <span className="thin-rule" style={{ margin: "0" }} />
            <p
              style={{
                fontFamily: "var(--font-lora)",
                fontStyle: "italic",
                fontSize: "0.85rem",
                color: "#9a6040",
                opacity: 0.55,
              }}
            >
              and counting.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
