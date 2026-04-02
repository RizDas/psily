export default function Home() {
  return (
    <main className="relative text-white">
      {/* GLOBAL BACKGROUND LAYER */}
      <div className="fixed inset-0 -z-10 bg-layer">
        <div className="peacock-overlay" />
      </div>

      {/* SCROLL CONTAINER */}
      <div className="flex flex-col">
        {/* SECTION 1 - HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl md:text-7xl font-serif drop-shadow-xl">
            Our Story
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-xl">
            Love, seen through your colors.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-2xl text-center space-y-4">
            <h2 className="text-4xl font-serif">The Beginning</h2>
            <p className="text-white/70">
              A simple moment that quietly changed everything.
            </p>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-2xl text-center space-y-4">
            <h2 className="text-4xl font-serif">Moments</h2>
            <p className="text-white/70">
              Little memories stitched into something beautiful.
            </p>
          </div>
        </section>

        {/* SECTION 4 */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-2xl text-center space-y-4">
            <h2 className="text-4xl font-serif">You</h2>
            <p className="text-white/70">
              The color, the calm, the chaos, the magic.
            </p>
          </div>
        </section>

        {/* SECTION 5 */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-2xl text-center space-y-4">
            <h2 className="text-4xl font-serif">Us</h2>
            <p className="text-white/70">
              And everything we are still becoming.
            </p>
          </div>
        </section>

        {/* SECTION 6 - END */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-2xl text-center space-y-6">
            <h2 className="text-5xl font-serif">Forever</h2>
            <button className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition">
              Continue
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
