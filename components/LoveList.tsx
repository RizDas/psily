"use client";

import { loveList } from "@/lib/loveList";
import { useState } from "react";

export default function LoveList() {
  const [currentNote, setCurrentNote] = useState<{
    id: number;
    text: string;
  } | null>(null);
  const [isSealed, setIsSealed] = useState(true);
  const [isShaking, setIsShaking] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const pickRandomNote = () => {
    setIsShaking(true);
    setIsAnimating(true);

    // Shake effect
    setTimeout(() => {
      setIsShaking(false);
    }, 200);

    // Pick and show sealed envelope after dramatic pause
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * loveList.length);
      setCurrentNote(loveList[randomIndex]);
      setIsSealed(true);
      setIsAnimating(false);
    }, 600);
  };

  const openEnvelope = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsSealed(false);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="min-h-screen px-6 py-24 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl cozy-text text-center mb-4"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            A Jar of Little Reasons
          </h2>
          <p className="cozy-text text-lg opacity-90">
            Shake the note, open the paper, and read one small reason I love
            you.
          </p>
        </div>

        {/* Note Display Area */}
        <div className="mb-16 perspective flex items-center justify-center min-h-0">
          {currentNote === null ? (
            // Empty State - Nothing shown
            <div />
          ) : isSealed ? (
            // Sealed Envelope State
            <div
              onClick={openEnvelope}
              className={`relative cursor-pointer transition-all duration-300 ${
                isShaking ? "animate-shake" : ""
              } ${isAnimating ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}
            >
              {/* Folded Paper Note */}
              <div className="relative bg-yellow-50 rounded-sm shadow-lg overflow-hidden border border-yellow-200/30 hover:shadow-xl transition-all duration-300">
                {/* Fold line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-1/2 pointer-events-none" />

                {/* Content */}
                <div className="px-8 md:px-10 py-5 text-center flex flex-col items-center justify-center relative">
                  {/* Wax seal effect */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400/40 to-red-600/30 border-2 border-red-400/50 flex items-center justify-center shadow-lg animate-pulse mb-2">
                    <span className="text-lg">❤️</span>
                  </div>

                  <p className="text-amber-900/60 text-xs font-serif">
                    Click to open
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Open Letter State
            <div
              className={`relative transition-all duration-500 ${
                isAnimating
                  ? "opacity-0 scale-75 -rotate-45"
                  : "opacity-100 scale-100 rotate-0"
              }`}
              style={{
                transformOrigin: "center",
              }}
            >
              {/* Old Paper */}
              <div
                id="parchment-note"
                className="relative bg-yellow-50 rounded-sm shadow-lg px-12 md:px-16 py-6 flex items-center justify-center"
              >
                {/* Main text only */}
                <p className="text-base md:text-lg text-amber-950 font-serif leading-relaxed tracking-wide whitespace-nowrap">
                  {currentNote.text}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Button with shake animation */}
        <div className="text-center">
          {currentNote === null || !isSealed ? (
            <button
              onClick={pickRandomNote}
              disabled={isAnimating}
              className={`px-8 py-4 bg-gradient-to-r from-white/15 to-white/10 hover:from-white/20 hover:to-white/15 disabled:from-white/5 disabled:to-white/5 border border-white/30 hover:border-white/50 cozy-text rounded-full font-serif text-lg transition-all duration-300 backdrop-blur-sm hover:shadow-xl active:scale-95 disabled:cursor-wait ${
                isShaking ? "animate-shake" : ""
              }`}
            >
              {isAnimating ? "Shaking..." : "Shake & Pick"}
            </button>
          ) : (
            <p className="text-white/50 text-sm font-serif">
              Click the envelope to open
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes animate-shake {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          25% {
            transform: translateX(-8px) rotate(-1deg);
          }
          50% {
            transform: translateX(8px) rotate(1deg);
          }
          75% {
            transform: translateX(-8px) rotate(-1deg);
          }
        }
        .animate-shake {
          animation: animate-shake 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
}
