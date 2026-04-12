// app/page.tsx

import TimeCounter from "@/components/TimeCounter";
import LoveList from "@/components/LoveList";
import LoveLetter from "@/components/LoveLetter";

export default function Home() {
  return (
    <main className="relative text-white">
      <div className="fixed inset-0 -z-10 bg-layer">
        <div className="peacock-overlay" />
      </div>

      <div className="flex flex-col">
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl md:text-7xl font-serif">Our Story</h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl">
            somehow, somewhere… it all became you.
          </p>
        </section>

        {/* TIME COUNTER */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <TimeCounter />
        </section>

        {/* LOVE LIST */}
        <LoveList />

        {/* LOVE LETTER */}
        <LoveLetter />

        {/* END */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <h2 className="text-5xl font-serif">
            and still… this is just the beginning.
          </h2>
        </section>
      </div>
    </main>
  );
}
