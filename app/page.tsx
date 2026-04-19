// app/page.tsx

import TimeCounter from "@/components/TimeCounter";
import LoveList from "@/components/LoveList";
import LoveLetter from "@/components/LoveLetter";

export default function Home() {
  return (
    <main className="relative text-white">
      <div className="fixed inset-0 -z-10 bg-layer">
        <div className="peacock-overlay" />
        {/* SOFT FLOATING ELEMENTS */}
        <div
          className="soft-heart"
          style={{ left: "15%", animationDelay: "0s" }}
        />
        <div
          className="soft-flower"
          style={{ left: "35%", animationDelay: "5s" }}
        />
        <div
          className="soft-heart"
          style={{ left: "65%", animationDelay: "10s" }}
        />
        <div
          className="soft-flower"
          style={{ left: "85%", animationDelay: "15s" }}
        />
      </div>

      <div className="flex flex-col">
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 relative">
          <div className="cozy-box p-6 sm:p-8 md:p-12 max-w-xs sm:max-w-md md:max-w-2xl w-full">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl cozy-text mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              Our Story
            </h1>
            <p className="text-base sm:text-lg cozy-text max-w-xs sm:max-w-md md:max-w-xl leading-relaxed">
              somehow, somewhere… it all became you.
            </p>
          </div>
        </section>

        {/* TIME COUNTER */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6">
          <TimeCounter />
        </section>

        {/* LOVE LIST */}
        <LoveList />

        {/* LOVE LETTER */}
        <LoveLetter />

        {/* END */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6">
          <div className="cozy-box p-6 sm:p-8 text-center">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl cozy-text"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              and still… this is just the beginning.
            </h2>
          </div>
        </section>
      </div>
    </main>
  );
}
