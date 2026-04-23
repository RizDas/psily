import { loveLetter } from "@/lib/loveLetter";

export default function LoveLetter() {
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
      <div style={{ maxWidth: "680px", width: "100%" }}>

        {/* Heading — outside the paper, on the warm background */}
        <h2
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)",
            color: "#3c2010",
            lineHeight: 1.25,
            marginBottom: "32px",
          }}
        >
          A Few Words I Could Never Say Enough
        </h2>

        {/* The letter paper — clearly distinct, slightly tilted */}
        <div
          className="letter-paper"
          style={{
            borderRadius: "8px",
            transform: "rotate(0.5deg)",
          }}
        >
          {/* Aged ruled lines */}
          <div className="letter-ruled" />
          {/* Left margin line */}
          <div className="letter-margin" />

          {/* Content */}
          <div
            style={{
              padding: "clamp(32px, 5vw, 52px) clamp(28px, 5vw, 72px)",
              position: "relative",
            }}
          >
            <p
              className="whitespace-pre-line"
              style={{
                fontFamily: "var(--font-cedarville)",
                fontSize: "clamp(0.88rem, 1.8vw, 1.02rem)",
                color: "#4a2c10",
                lineHeight: 2.1,
                letterSpacing: "0.03em",
              }}
            >
              {loveLetter}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
