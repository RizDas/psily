import { loveLetter } from "@/lib/loveLetter";

export default function LoveLetter() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-2xl">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-10">
          A Few Words I Could Never Say Enough
        </h2>

        <p
          className="whitespace-pre-line text-lg leading-relaxed text-white/90"
          style={{ fontFamily: "'Cedarville Cursive', cursive" }}
        >
          {loveLetter}
        </p>
      </div>
    </section>
  );
}
