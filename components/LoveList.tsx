import { loveList } from "@/lib/loveList";

export default function LoveList() {
  return (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">
          Little Things About You That Mean Everything To Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loveList.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition"
            >
              <p className="text-white/80">
                <span className="text-white/40 mr-2">{item.id}.</span>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
