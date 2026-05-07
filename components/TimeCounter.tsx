// components/TimeCounter.tsx
"use client";

import { useEffect, useState } from "react";

export default function TimeCounter() {
  const startDate = new Date("2026-03-24T13:30:00+05:30");

  const [time, setTime] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();

      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTime({ months: years * 12 + months, days, hours, minutes });

      // Calculate total days countup
      const msPerDay = 1000 * 60 * 60 * 24;
      // Ignore time part for total days (count full days since startDate)
      const startOfDay = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
      );
      const nowStartOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );
      const diff = nowStartOfDay.getTime() - startOfDay.getTime();
      setTotalDays(Math.floor(diff / msPerDay) + 1); // +1 to include today
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
          marginBottom: "32px",
        }}
      >
        has slowly turned into something I never want to lose.
      </p>

      {/* Time countup in single line */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "18px",
          marginBottom: "18px",
        }}
      >
        {/* Months */}
        <span style={{ display: "flex", alignItems: "flex-end" }}>
          <span
            style={{
              fontFamily: "var(--font-lora)",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              color: "#3c2010",
              fontWeight: 400,
              lineHeight: 1,
              display: "block",
            }}
          >
            {String(time.months).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mona-sans), sans-serif",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              color: "#7a3539",
              opacity: 0.7,
              marginLeft: "3px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
              lineHeight: 1,
              display: "block",
            }}
          >
            M
          </span>
        </span>
        {/* Days */}
        <span style={{ display: "flex", alignItems: "flex-end" }}>
          <span
            style={{
              fontFamily: "var(--font-lora)",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              color: "#3c2010",
              fontWeight: 400,
              lineHeight: 1,
              display: "block",
            }}
          >
            {String(time.days).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mona-sans), sans-serif",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              color: "#7a3539",
              opacity: 0.7,
              marginLeft: "6px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
              lineHeight: 1,
              display: "block",
            }}
          >
            D
          </span>
        </span>
        {/* Hours */}
        <span style={{ display: "flex", alignItems: "flex-end" }}>
          <span
            style={{
              fontFamily: "var(--font-lora)",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              color: "#3c2010",
              fontWeight: 400,
              lineHeight: 1,
              display: "block",
            }}
          >
            {String(time.hours).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mona-sans), sans-serif",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              color: "#7a3539",
              opacity: 0.7,
              marginLeft: "6px",
              letterSpacing: "0.12em",
              textTransform: "lowercase",
              fontWeight: 500,
              lineHeight: 1,
              display: "block",
            }}
          >
            h
          </span>
        </span>
        {/* Minutes */}
        <span style={{ display: "flex", alignItems: "flex-end" }}>
          <span
            style={{
              fontFamily: "var(--font-lora)",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              color: "#3c2010",
              fontWeight: 400,
              lineHeight: 1,
              display: "block",
            }}
          >
            {String(time.minutes).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mona-sans), sans-serif",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              color: "#7a3539", //color between 6a2840 and 8a4738 7a3539
              opacity: 0.7,
              marginLeft: "6px",
              letterSpacing: "0.12em",
              textTransform: "lowercase",
              fontWeight: 500,
              lineHeight: 1,
              display: "block",
            }}
          >
            m
          </span>
        </span>
      </div>

      {/* Total days countup, styled to fit below */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mona-sans), sans-serif",
            fontSize: "1.8rem",
            color: "#3c2010",
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
        >
          {totalDays - 1}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mona-sans), sans-serif",
            fontSize: "1.5rem",
            color: "#793527",
            opacity: 0.7,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          days in love
        </span>
      </div>

      <span className="thin-rule" />

      <p
        style={{
          fontFamily: "var(--font-lora)",
          fontStyle: "italic",
          fontSize: "1rem",
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
