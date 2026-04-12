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
    <div className="text-center space-y-4">
      <h2 className="text-4xl md:text-5xl font-serif">every moment with you</h2>
      <p className="text-white/70">
        has slowly turned into something I never want to lose.
      </p>

      <div className="flex justify-center gap-6 mt-6 text-lg flex-wrap">
        <div>
          <p className="text-3xl font-semibold">{time.months}</p>
          <p className="text-white/60">months</p>
        </div>
        <div>
          <p className="text-3xl font-semibold">{time.days}</p>
          <p className="text-white/60">days</p>
        </div>
        <div>
          <p className="text-3xl font-semibold">{time.hours}</p>
          <p className="text-white/60">hours</p>
        </div>
        <div>
          <p className="text-3xl font-semibold">{time.minutes}</p>
          <p className="text-white/60">minutes</p>
        </div>
      </div>
    </div>
  );
}
