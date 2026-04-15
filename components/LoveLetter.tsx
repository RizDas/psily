import { loveLetter } from "@/lib/loveLetter";

export default function LoveLetter() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-3xl w-full">
        <div className="cozy-box p-10 relative overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-pink-300/50 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-pink-300/50 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-pink-300/50 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-pink-300/50 rounded-br-lg"></div>

          <h2
            className="text-3xl md:text-4xl cozy-text text-center mb-8"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            A Few Words I Could Never Say Enough
          </h2>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <p
              className="whitespace-pre-line text-base leading-relaxed cozy-text"
              style={{ fontFamily: "var(--font-cedarville)" }}
            >
              {loveLetter}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
