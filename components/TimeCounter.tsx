// components/TimeCounter.tsx
"use client";

import { useEffect, useState } from "react";

export default function TimeCounter() {
  const startDate = new Date("2026-03-24T13:30:00+05:30");

  const [time, setTime] = useState({ months: 0, days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let years   = now.getFullYear() - startDate.getFullYear();
      let months  = now.getMonth()    - startDate.getMonth();
      let days    = now.getDate()     - startDate.getDate();
      let hours   = now.getHours()    - startDate.getHours();
      let minutes = now.getMinutes()  - startDate.getMinutes();

      if (minutes < 0) { minutes += 60; hours--; }
      if (hours   < 0) { hours   += 24; days--;  }
      if (days    < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months  < 0) { months += 12; years--; }

      setTime({ months: years * 12 + months, days, hours, minutes });
    };
    updateTime();
    const id = setInterval(updateTime, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ maxWidth: "540px", width: "100%", textAlign: "center" }}>
      {/* Heading — only this uses Dancing Script */}
      <p
        style={{
          fontFamily: "var(--font-dancing)",
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          color: "#3c2010",
          marginBottom: "8px",
          lineHeight: 1.2,
        }}
      >
        every moment with you
      </p>
      <p
        style={{
          fontFamily: "var(--font-lora)",
          fontStyle: "italic",
          fontSize: "clamp(0.85rem, 1.6vw, 0.98rem)",
          color: "#7a4828",
          opacity: 0.65,
          marginBottom: "52px",
        }}
      >
        has slowly turned into something I never want to lose.
      </p>

      {/* Numbers — large, typographic, no tiles */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0 8px",
          alignItems: "end",
          marginBottom: "48px",
        }}
      >
        {[
          { v: time.months,  u: "months"  },
          { v: time.days,    u: "days"    },
          { v: time.hours,   u: "hours"   },
          { v: time.minutes, u: "minutes" },
        ].map(({ v, u }) => (
          <div key={u} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-lora)",
                fontSize: "clamp(3rem, 8vw, 5.5rem)",
                color: "#3c2010",
                lineHeight: 1,
                fontWeight: 400,
                display: "block",
              }}
            >
              {String(v).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#8a5538",
                opacity: 0.6,
                marginTop: "6px",
              }}
            >
              {u}
            </span>
          </div>
        ))}
      </div>

      <span className="thin-rule" />

      <p
        style={{
          fontFamily: "var(--font-lora)",
          fontStyle: "italic",
          fontSize: "0.82rem",
          color: "#7a4828",
          opacity: 0.5,
          marginTop: "20px",
        }}
      >
        and every single one of them was worth it
      </p>
    </div>
  );
}
