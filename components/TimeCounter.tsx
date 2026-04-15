// components/TimeCounter.tsx

"use client";

import { useEffect, useState } from "react";

export default function TimeCounter() {
  // ✅ Set your exact start date & time (IST)
  // Format: YYYY-MM-DDTHH:mm:ss+05:30
  const startDate = new Date("2026-03-24T13:30:00+05:30");

  const [time, setTime] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

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

      const totalMonths = years * 12 + months;

      setTime({
        months: totalMonths,
        days,
        hours,
        minutes,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-6">
      <div className="cozy-box p-8 max-w-lg mx-auto">
        <h2
          className="text-3xl md:text-4xl cozy-text mb-4"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          every moment with you
        </h2>
        <p className="cozy-text text-sm leading-relaxed mb-6">
          has slowly turned into something I never want to lose.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <p className="text-2xl cozy-text font-light">{time.months}</p>
            <p className="cozy-text text-xs opacity-80">months</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <p className="text-2xl cozy-text font-light">{time.days}</p>
            <p className="cozy-text text-xs opacity-80">days</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <p className="text-2xl cozy-text font-light">{time.hours}</p>
            <p className="cozy-text text-xs opacity-80">hours</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <p className="text-2xl cozy-text font-light">{time.minutes}</p>
            <p className="cozy-text text-xs opacity-80">minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
