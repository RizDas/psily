import { loveLetter } from "@/lib/loveLetter";

export default function LoveLetter() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24">
      <div className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl w-full">
        <div className="cozy-box p-6 sm:p-8 md:p-10 relative overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-t-2 border-pink-300/50 rounded-tl-lg"></div>
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-t-2 border-pink-300/50 rounded-tr-lg"></div>
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-b-2 border-pink-300/50 rounded-bl-lg"></div>
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-b-2 border-pink-300/50 rounded-br-lg"></div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl cozy-text text-center mb-6 sm:mb-8"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            A Few Words I Could Never Say Enough
          </h2>

          <div className="bg-white/60 rounded-xl p-4 sm:p-6 border border-white/10">
            <p
              className="whitespace-pre-line text-base sm:text-lg leading-7 text-black"
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
