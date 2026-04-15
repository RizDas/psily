import { timeline } from "@/lib/timeline";

export default function TimelinePage() {
  return (
    <main className="relative text-white min-h-screen">
      <div className="fixed inset-0 -z-10 bg-layer">
        <div className="peacock-overlay" />
      </div>

      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="cozy-box p-6 max-w-md mx-auto">
            <h1
              className="text-4xl md:text-5xl cozy-text mb-4"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              Our Timeline
            </h1>
            <p className="cozy-text text-sm leading-relaxed">
              Every moment that slowly turned into us.
            </p>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-pink-300/50 via-white/30 to-pink-300/50 -translate-x-1/2 rounded-full" />

          <div className="space-y-12">
            {timeline.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div className="w-1/2 px-4">
                  <div className="cozy-box p-6 hover:scale-105 transition-transform duration-300">
                    <p
                      className="cozy-text text-xs opacity-70 mb-2"
                      style={{ fontFamily: "var(--font-dancing)" }}
                    >
                      {event.date}
                    </p>
                    <h3
                      className="text-lg cozy-text mb-2"
                      style={{ fontFamily: "var(--font-dancing)" }}
                    >
                      {event.title}
                    </h3>
                    <p className="cozy-text text-sm leading-relaxed opacity-90">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full shadow-lg border-2 border-white/50 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
