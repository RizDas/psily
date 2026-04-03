import { loveList } from "@/lib/loveList";
import { loveLetter } from "@/lib/loveLetter";

export default function Home() {
  return (
    <main className="relative text-white">
      {/* GLOBAL BACKGROUND LAYER */}
      <div className="fixed inset-0 -z-10 bg-layer">
        <div className="peacock-overlay" />
      </div>

      <div className="flex flex-col">
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl md:text-7xl font-serif drop-shadow-xl">
            Our Story
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-xl">
            Love, seen through your colors.
          </p>
        </section>

        {/* THINGS I LOVE ABOUT YOU */}
        <section className="min-h-screen px-6 py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">
              100 Things I Love About You
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loveList.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition duration-300"
                >
                  <p className="text-white/80 leading-relaxed">
                    <span className="text-white/50 mr-2">{item.id}.</span>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOVE LETTER */}
        <section className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-serif text-center mb-10">
              A Letter For You
            </h2>

            <p
              className="whitespace-pre-line text-lg leading-relaxed text-white/90"
              style={{ fontFamily: "'Cedarville Cursive', cursive" }}
            >
              {loveLetter}
            </p>
          </div>
        </section>

        {/* END */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <h2 className="text-5xl font-serif">Forever</h2>
        </section>
      </div>
    </main>
  );
}
