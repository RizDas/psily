import { timeline } from "@/lib/timeline";

export default function TimelinePage() {
  return (
    <main className="relative text-white min-h-screen">
      <div className="fixed inset-0 -z-10 bg-layer">
        <div className="peacock-overlay" />
      </div>

      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif">Our Timeline</h1>
          <p className="mt-4 text-white/70">
            Every moment that slowly turned into us.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white/10 -translate-x-1/2" />

          <div className="space-y-16">
            {timeline.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div className="w-1/2 px-4">
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
                    <p className="text-sm text-white/50 mb-2">{event.date}</p>
                    <h3 className="text-xl font-semibold mb-2">
                      {event.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-300 rounded-full shadow-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
